require('dotenv').config({ path: require('path').resolve(__dirname, '.env'), override: true });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const slugify = require('slugify');
const { body, param, query } = require('express-validator');
const path = require('path');
const fs = require('fs');

const auth = require('./middleware/auth');
const validate = require('./middleware/validate');
const upload = require('./middleware/upload');
const errorMiddleware = require('./middleware/error');
const { sequelize, Admin, Company, Job, Application, Gallery, Article } = require('./models');

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: false }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Only public media is static; applicant documents are served through auth below.
app.use('/uploads/public/companies', express.static(path.resolve(__dirname, 'uploads', 'companies')));
app.use('/uploads/public/jobs', express.static(path.resolve(__dirname, 'uploads', 'jobs')));
app.use('/uploads/public/gallery', express.static(path.resolve(__dirname, 'uploads', 'gallery')));
app.use('/uploads/public/articles', express.static(path.resolve(__dirname, 'uploads', 'articles')));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { success: false, message: 'Terlalu banyak percobaan login. Silakan coba lagi nanti.' }
});

const ok = (res, data, message = 'Data berhasil diambil', status = 200) => res.status(status).json({ success: true, message, data });
const fail = (res, message, errors = {}, status = 400) => res.status(status).json({ success: false, message, errors });
const tokenFor = (admin) => jwt.sign({ sub: admin.id }, process.env.JWT_SECRET || 'secret-key', { expiresIn: process.env.JWT_EXPIRES_IN || '8h' });
const publicCompany = { attributes: { exclude: ['email', 'phone', 'address'] } };
const publicBaseUrl = (req) => process.env.PUBLIC_API_URL || `${req.protocol}://${req.get('host')}`;
const mediaUrl = (req, value, folder) => {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  const clean = String(value).replace(/^\/+/, '').replace(/^uploads\//, '');
  return `${publicBaseUrl(req)}/uploads/public/${folder}/${clean.replace(new RegExp(`^${folder}/`), '')}`;
};
const serializeMedia = (req, item, folder, field) => {
  const plain = item?.toJSON ? item.toJSON() : { ...item };
  if (plain[field]) plain[field] = mediaUrl(req, plain[field], folder);
  return plain;
};
const serializeJob = (req, item) => {
  const job = serializeMedia(req, item, 'jobs', 'image');
  if (job.company) job.company = serializeMedia(req, job.company, 'companies', 'logo');
  return job;
};

const appStatusMap = { baru: 'baru', pending: 'baru', ditinjau: 'ditinjau', reviewed: 'ditinjau', lolos: 'lolos', accepted: 'diterima', diterima: 'diterima', tidak_lolos: 'tidak_lolos', rejected: 'tidak_lolos' };

// Health Check
app.get('/api/health', async (req, res, next) => {
  try {
    await sequelize.authenticate();
    return res.status(200).json({
      success: true,
      server: 'running',
      database: 'connected',
      time: new Date().toISOString()
    });
  } catch (error) {
    console.error('DATABASE HEALTH CHECK FAILED:', error);
    return res.status(500).json({
      success: false,
      server: 'running',
      database: 'disconnected',
      message: 'Database MySQL tidak terhubung.'
    });
  }
});

// Auth Routes
app.post('/api/admin/login', loginLimiter, [
  body('email').trim().notEmpty().withMessage('Email atau username admin wajib diisi.'),
  body('password').isLength({ min: 6 }).withMessage('Password minimal 6 karakter.')
], validate, async (req, res, next) => {
  try {
    const input = req.body.email.toLowerCase().trim();
    const admin = await Admin.findOne({
      where: {
        [require('sequelize').Op.or]: [
          { email: input },
          { name: input }
        ]
      }
    });

    if (!admin || !(await bcrypt.compare(req.body.password, admin.password))) {
      return fail(res, 'Email atau password salah.', {}, 401);
    }

    ok(res, {
      token: tokenFor(admin),
      admin: { id: admin.id, name: admin.name, email: admin.email, role: 'Administrator BKK' }
    }, 'Login berhasil');
  } catch (e) {
    next(e);
  }
});

app.post('/api/admin/logout', auth, (req, res) => ok(res, null, 'Logout berhasil'));
app.get('/api/admin/me', auth, (req, res) => ok(res, req.admin));

app.put('/api/admin/me', auth, [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Nama admin minimal 2 karakter.'),
  body('email').optional().trim().isEmail().withMessage('Email tidak valid.')
], validate, async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name && !email) return fail(res, 'Tidak ada data yang diubah.', {}, 400);

    const payload = {};
    if (name) payload.name = name.trim();
    if (email) payload.email = email.trim().toLowerCase();

    const existing = await Admin.findOne({ where: { email: payload.email } });
    if (existing && existing.id !== req.admin.id) {
      return fail(res, 'Email sudah digunakan admin lain.', {}, 409);
    }

    await req.admin.update(payload);
    const updated = await Admin.findByPk(req.admin.id, { attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'] });
    ok(res, updated, 'Profil admin berhasil diperbarui');
  } catch (e) {
    next(e);
  }
});

app.put('/api/admin/me/password', auth, [
  body('currentPassword').notEmpty().withMessage('Password lama wajib diisi.'),
  body('newPassword').isLength({ min: 6 }).withMessage('Password baru minimal 6 karakter.')
], validate, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const isValid = await bcrypt.compare(currentPassword, req.admin.password || (await Admin.findByPk(req.admin.id)).password);
    if (!isValid) return fail(res, 'Password lama salah.', {}, 401);

    const admin = await Admin.findByPk(req.admin.id);
    admin.password = await bcrypt.hash(newPassword, 12);
    await admin.save();
    ok(res, null, 'Password berhasil diperbarui');
  } catch (e) {
    next(e);
  }
});

// Public Routes
const includeJob = [{ model: Company, as: 'company', attributes: ['id', 'name', 'logo'] }];

app.get('/api/jobs', async (req, res, next) => {
  try {
    const where = { status: 'published' };
    if (req.query.search) {
      where.title = { [require('sequelize').Op.like]: `%${req.query.search}%` };
    }
    const jobs = await Job.findAll({ where, include: includeJob, order: [['createdAt', 'DESC']] });
    ok(res, jobs.map((job) => serializeJob(req, job)));
  } catch (e) {
    next(e);
  }
});

app.get('/api/companies', async (req, res, next) => {
  try {
    const companies = await Company.findAll({ ...publicCompany, where: { status: 'active' }, order: [['createdAt', 'DESC']] });
    ok(res, companies.map((company) => serializeMedia(req, company, 'companies', 'logo')));
  } catch (e) {
    next(e);
  }
});

app.get('/api/gallery', async (req, res, next) => {
  try {
    const gallery = await Gallery.findAll({ where: { status: 'published' }, order: [['createdAt', 'DESC']] });
    ok(res, gallery.map((item) => serializeMedia(req, item, 'gallery', 'image')));
  } catch (e) {
    next(e);
  }
});

app.get('/api/articles', async (req, res, next) => {
  try {
    const articles = await Article.findAll({
      where: { status: 'published' },
      order: [['publishedAt', 'DESC'], ['createdAt', 'DESC']]
    });
    ok(res, articles.map((item) => serializeMedia(req, item, 'articles', 'thumbnail')));
  } catch (e) {
    next(e);
  }
});

app.get('/api/jobs/:id', async (req, res, next) => {
  try {
    const item = await Job.findOne({ where: { id: req.params.id, status: 'published' }, include: includeJob });
    if (!item) return fail(res, 'Lowongan tidak ditemukan.', {}, 404);
    ok(res, serializeJob(req, item));
  } catch (e) { next(e); }
});

app.get('/api/companies/:id', async (req, res, next) => {
  try {
    const item = await Company.findOne({ where: { id: req.params.id, status: 'active' }, ...publicCompany });
    if (!item) return fail(res, 'Perusahaan tidak ditemukan.', {}, 404);
    ok(res, serializeMedia(req, item, 'companies', 'logo'));
  } catch (e) { next(e); }
});

app.get('/api/galleries', async (req, res, next) => {
  try {
    const items = await Gallery.findAll({ where: { status: 'published' }, order: [['createdAt', 'DESC']] });
    ok(res, items.map((item) => serializeMedia(req, item, 'gallery', 'image')));
  } catch (e) { next(e); }
});

app.get('/api/galleries/:id', async (req, res, next) => {
  try {
    const item = await Gallery.findOne({ where: { id: req.params.id, status: 'published' } });
    if (!item) return fail(res, 'Galeri tidak ditemukan.', {}, 404);
    ok(res, serializeMedia(req, item, 'gallery', 'image'));
  } catch (e) { next(e); }
});

app.get('/api/articles/:id', async (req, res, next) => {
  try {
    const item = await Article.findOne({ where: { id: req.params.id, status: 'published' } });
    if (!item) return fail(res, 'Artikel tidak ditemukan.', {}, 404);
    ok(res, serializeMedia(req, item, 'articles', 'thumbnail'));
  } catch (e) { next(e); }
});

const buildApplicationTimeline = (status) => {
  const base = [
    { status: 'Lamaran Terkirim', done: true },
    { status: 'Seleksi Administrasi', done: false },
    { status: 'Tes Psikotes / Wawancara', done: false },
    { status: 'Keputusan Final', done: false }
  ];

  const statusMap = {
    baru: [true, false, false, false],
    ditinjau: [true, true, false, false],
    lolos: [true, true, true, false],
    tidak_lolos: [true, true, true, true],
    diterima: [true, true, true, true]
  };

  const levels = statusMap[status] || statusMap.baru;
  return base.map((step, idx) => ({ ...step, done: levels[idx], current: !levels[idx] && idx === 1 && status === 'baru' ? true : idx === 2 && status === 'ditinjau' ? true : idx === 3 && status === 'lolos' ? true : false }));
};

app.post('/api/applications', upload.fields([{ name: 'cv', maxCount: 1 }, { name: 'diploma', maxCount: 1 }]), [
  body('job_id').isInt(),
  body('name').trim().notEmpty(),
  body('nisn').trim().notEmpty(),
  body('whatsapp').trim().notEmpty(),
  body('email').isEmail(),
  body('graduation_year').isInt({ min: 1900, max: 2200 }),
  body('average_score').isFloat({ min: 0, max: 100 }),
  body('major').trim().notEmpty(),
  body('main_skill').trim().notEmpty()
], validate, async (req, res, next) => {
  try {
    if (!req.files?.cv?.[0] || !req.files?.diploma?.[0]) {
      return fail(res, 'CV dan ijazah wajib diunggah.', {}, 422);
    }
    const job = await Job.findOne({ where: { id: req.body.job_id, status: 'published' } });
    if (!job) return fail(res, 'Lowongan tidak tersedia.', {}, 404);

    const application = await Application.create({
      jobId: job.id,
      name: req.body.name,
      nisn: req.body.nisn,
      whatsapp: req.body.whatsapp,
      email: req.body.email,
      graduationYear: req.body.graduation_year,
      averageScore: req.body.average_score,
      major: req.body.major,
      mainSkill: req.body.main_skill,
      cv: path.relative(path.resolve(__dirname, 'uploads'), req.files.cv[0].path).replace(/\\/g, '/'),
      diploma: path.relative(path.resolve(__dirname, 'uploads'), req.files.diploma[0].path).replace(/\\/g, '/'),
      coverMessage: req.body.cover_message || '',
      status: 'baru'
    });

    ok(res, { id: application.id, status: application.status }, 'Lamaran berhasil dikirim', 201);
  } catch (e) {
    next(e);
  }
});

app.get('/api/applications/track', async (req, res, next) => {
  try {
    const nisn = String(req.query.nisn || '').trim();
    const email = String(req.query.email || '').trim();
    if (!nisn && !email) return fail(res, 'NISN atau email wajib diisi untuk melacak lamaran.', {}, 400);

    const where = {};
    if (nisn) where.nisn = nisn;
    if (email) where.email = email;

    const applications = await Application.findAll({
      where,
      include: [{ model: Job, as: 'job', include: [{ model: Company, as: 'company' }] }],
      order: [['createdAt', 'DESC']]
    });

    const payload = applications.map((app) => ({
      id: `BKK-${app.id}`,
      code: `BKK-${app.id}`,
      applicantName: app.name,
      jobTitle: app.job?.title || '-',
      company: app.job?.company?.name || '-',
      nisn: app.nisn,
      email: app.email,
      appliedAt: app.createdAt,
      status: app.status,
      timeline: buildApplicationTimeline(app.status)
    }));

    ok(res, payload, 'Data pelacakan lamaran berhasil diambil');
  } catch (e) {
    next(e);
  }
});

// Admin Dashboard Summary
app.get('/api/admin/dashboard', auth, async (req, res, next) => {
  try {
    const [
      totalJobs,
      activeJobs,
      totalApplications,
      newApplications,
      totalCompanies,
      totalGallery,
      totalArticles,
      latestApplications,
      latestJobs,
      latestCompanies,
      latestArticles
    ] = await Promise.all([
      Job.count(),
      Job.count({ where: { status: 'published' } }),
      Application.count(),
      Application.count({ where: { status: 'pending' } }),
      Company.count(),
      Gallery.count(),
      Article.count(),
      Application.findAll({
        include: [{ model: Job, as: 'job', attributes: ['id', 'title'] }],
        order: [['createdAt', 'DESC']],
        limit: 5
      }),
      Job.findAll({ include: includeJob, order: [['createdAt', 'DESC']], limit: 5 }),
      Company.findAll({ order: [['createdAt', 'DESC']], limit: 5, ...publicCompany }),
      Article.findAll({ order: [['createdAt', 'DESC']], limit: 5 })
    ]);

    ok(res, {
      statistics: { totalJobs, activeJobs, totalApplications, newApplications, totalCompanies, totalGallery, totalArticles },
      latest: { applications: latestApplications, jobs: latestJobs, companies: latestCompanies, articles: latestArticles }
    });
  } catch (e) {
    next(e);
  }
});

// Admin CRUD Resources
const resources = {
  jobs: { Model: Job, include: includeJob, search: ['title', 'location'] },
  companies: { Model: Company, search: ['name'] },
  gallery: { Model: Gallery, search: ['title'] },
  articles: { Model: Article, search: ['title', 'author'] }
};

function adminCrud(resource) {
  const { Model, include, search } = resources[resource];
  const uploadFields = resource === 'jobs'
    ? upload.single('image')
    : resource === 'companies'
    ? upload.single('logo')
    : resource === 'gallery'
    ? upload.single('image')
    : resource === 'articles'
    ? upload.single('thumbnail')
    : null;

  const parse = (req) => {
    const data = { ...req.body };

    if (resource === 'jobs') {
      data.companyId = data.company_id || data.companyId;
      data.jobType = data.job_type || data.jobType || 'Full Time';
      data.requirements = data.requirements || '';
      data.skills = data.skills || '';
      data.education = data.education || '';
      data.location = data.location || '';
      data.deadline = typeof data.deadline === 'string' && data.deadline.trim() ? data.deadline.trim() : null;
      data.status = data.status || 'draft';
      if (!data.slug && data.title) {
        data.slug = slugify(data.title, { lower: true, strict: true }) + '-' + Math.floor(1000 + Math.random() * 9000);
      }
    }

    if (resource === 'articles') {
      data.publishedAt = data.status === 'published' ? (data.published_at || new Date()) : null;
      if (!data.slug && data.title) {
        data.slug = slugify(data.title, { lower: true, strict: true }) + '-' + Math.floor(1000 + Math.random() * 9000);
      }
    }

    if (resource === 'companies') {
      if (!data.name && data.title) data.name = data.title;
      data.status = data.status || 'active';
    }

    if (req.file) {
      const fieldKey = resource === 'jobs' ? 'image' : resource === 'companies' ? 'logo' : resource === 'gallery' ? 'image' : 'thumbnail';
      data[fieldKey] = path.relative(path.resolve(__dirname, 'uploads'), req.file.path).replace(/\\/g, '/');
    }

    return data;
  };

  app.get(`/api/admin/${resource}`, auth, async (req, res, next) => {
    try {
      const where = {};
      if (req.query.status && req.query.status !== 'all') where.status = req.query.status;
      if (req.query.search) {
        const { Op } = require('sequelize');
        where[Op.or] = search.map((field) => ({ [field]: { [Op.like]: `%${req.query.search}%` } }));
      }
      const page = Math.max(Number(req.query.page || 1), 1);
      const limit = Math.min(Math.max(Number(req.query.limit || 10), 1), 100);
      const result = await Model.findAndCountAll({
        where,
        include,
        order: [['createdAt', 'DESC']],
        limit,
        offset: (page - 1) * limit
      });

      res.json({
        success: true,
        message: 'Data berhasil diambil',
        data: result.rows,
        meta: { page, limit, total: result.count, pages: Math.ceil(result.count / limit) }
      });
    } catch (e) {
      next(e);
    }
  });

  app.post(`/api/admin/${resource}`, auth, uploadFields || ((req, res, next) => next()), async (req, res, next) => {
    try {
      const parsedData = parse(req);
      if (resource === 'jobs') {
        console.log('CREATE JOB BODY:', parsedData);
        const companyId = Number(parsedData.companyId);
        if (!Number.isInteger(companyId) || companyId <= 0) {
          return fail(res, 'Perusahaan wajib dipilih.', { field: 'company_id' }, 422);
        }
        const company = await Company.findByPk(companyId);
        if (!company) return fail(res, 'Perusahaan tidak ditemukan.', { field: 'company_id' }, 404);
        parsedData.companyId = companyId;
      }
      const item = await Model.create(parsedData);
      ok(res, resource === 'jobs' ? serializeJob(req, item) : resource === 'companies' ? serializeMedia(req, item, 'companies', 'logo') : resource === 'gallery' ? serializeMedia(req, item, 'gallery', 'image') : serializeMedia(req, item, 'articles', 'thumbnail'), 'Data berhasil dibuat', 201);
    } catch (e) {
      if (resource === 'jobs') console.error('CREATE JOB ERROR:', e);
      next(e);
    }
  });

  app.get(`/api/admin/${resource}/:id`, auth, async (req, res, next) => {
    try {
      const item = await Model.findByPk(req.params.id, { include });
      if (!item) return fail(res, 'Data tidak ditemukan.', {}, 404);
      ok(res, resource === 'jobs' ? serializeJob(req, item) : resource === 'companies' ? serializeMedia(req, item, 'companies', 'logo') : resource === 'gallery' ? serializeMedia(req, item, 'gallery', 'image') : serializeMedia(req, item, 'articles', 'thumbnail'));
    } catch (e) {
      next(e);
    }
  });

  app.put(`/api/admin/${resource}/:id`, auth, uploadFields || ((req, res, next) => next()), async (req, res, next) => {
    try {
      const item = await Model.findByPk(req.params.id);
      if (!item) return fail(res, 'Data tidak ditemukan.', {}, 404);
      const oldFile = item[resource === 'jobs' ? 'image' : resource === 'companies' ? 'logo' : resource === 'gallery' ? 'image' : 'thumbnail'];
      const parsedData = parse(req);
      if (resource === 'jobs' && parsedData.companyId !== undefined) {
        const companyId = Number(parsedData.companyId);
        if (!Number.isInteger(companyId) || companyId <= 0) {
          return fail(res, 'Perusahaan wajib dipilih.', { field: 'company_id' }, 422);
        }
        const company = await Company.findByPk(companyId);
        if (!company) return fail(res, 'Perusahaan tidak ditemukan.', { field: 'company_id' }, 404);
        parsedData.companyId = companyId;
      }
      await item.update(parsedData);
      if (req.file && oldFile) {
        const oldPath = path.resolve(__dirname, 'uploads', oldFile);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      ok(res, resource === 'jobs' ? serializeJob(req, item) : resource === 'companies' ? serializeMedia(req, item, 'companies', 'logo') : resource === 'gallery' ? serializeMedia(req, item, 'gallery', 'image') : serializeMedia(req, item, 'articles', 'thumbnail'), 'Data berhasil diperbarui');
    } catch (e) {
      if (resource === 'jobs') console.error('UPDATE JOB ERROR:', e);
      next(e);
    }
  });

  app.delete(`/api/admin/${resource}/:id`, auth, async (req, res, next) => {
    try {
      const item = await Model.findByPk(req.params.id);
      if (!item) return fail(res, 'Data tidak ditemukan.', {}, 404);
      const fileField = resource === 'jobs' ? 'image' : resource === 'companies' ? 'logo' : resource === 'gallery' ? 'image' : 'thumbnail';
      if (item[fileField]) {
        const filePath = path.resolve(__dirname, 'uploads', item[fileField]);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
      await item.destroy();
      ok(res, null, 'Data berhasil dihapus');
    } catch (e) {
      next(e);
    }
  });
}

Object.keys(resources).forEach(adminCrud);

// Admin Applications Management
app.get('/api/admin/applications', auth, async (req, res, next) => {
  try {
    const { Op } = require('sequelize');
    const where = {};
    if (req.query.status && req.query.status !== 'all') {
      const mapped = appStatusMap[String(req.query.status).toLowerCase().trim()] || String(req.query.status).toLowerCase().trim();
      where.status = mapped;
    }
    if (req.query.search) {
      where[Op.or] = ['name', 'email', 'nisn'].map((field) => ({ [field]: { [Op.like]: `%${req.query.search}%` } }));
    }
    const limit = Math.min(Number(req.query.limit || 20), 100);
    const page = Math.max(Number(req.query.page || 1), 1);
    const data = await Application.findAndCountAll({
      where,
      include: [{ model: Job, as: 'job', include: [{ model: Company, as: 'company' }] }],
      order: [['createdAt', 'DESC']],
      limit,
      offset: (page - 1) * limit
    });
    res.json({ success: true, message: 'Data berhasil diambil', data: data.rows, meta: { total: data.count } });
  } catch (e) {
    next(e);
  }
});

app.get('/api/admin/applications/:id', auth, async (req, res, next) => {
  try {
    const item = await Application.findByPk(req.params.id, {
      include: [{ model: Job, as: 'job', include: [{ model: Company, as: 'company' }] }]
    });
    if (!item) return fail(res, 'Lamaran tidak ditemukan.', {}, 404);
    ok(res, item);
  } catch (e) {
    next(e);
  }
});

app.put('/api/admin/applications/:id', auth, [
  body('status').custom((val) => {
    const key = String(val).toLowerCase().trim();
    if (!appStatusMap[key]) {
      throw new Error('Status lamaran tidak valid.');
    }
    return true;
  })
], validate, async (req, res, next) => {
  try {
    const item = await Application.findByPk(req.params.id);
    if (!item) return fail(res, 'Lamaran tidak ditemukan.', {}, 404);
    const normalizedStatus = appStatusMap[String(req.body.status).toLowerCase().trim()] || String(req.body.status).toLowerCase().trim();
    await item.update({ status: normalizedStatus });
    ok(res, item, 'Status lamaran berhasil diperbarui');
  } catch (e) {
    next(e);
  }
});

app.delete('/api/admin/applications/:id', auth, async (req, res, next) => {
  try {
    const item = await Application.findByPk(req.params.id);
    if (!item) return fail(res, 'Lamaran tidak ditemukan.', {}, 404);
    [item.cv, item.diploma].forEach((file) => {
      if (file) {
        const fullPath = path.resolve(__dirname, 'uploads', file);
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
      }
    });
    await item.destroy();
    ok(res, null, 'Lamaran berhasil dihapus');
  } catch (e) {
    next(e);
  }
});

app.get('/api/admin/applications/:id/document/:type', auth, async (req, res, next) => {
  try {
    if (!['cv', 'diploma'].includes(req.params.type)) return fail(res, 'Dokumen tidak valid.', {}, 400);
    const item = await Application.findByPk(req.params.id);
    if (!item?.[req.params.type]) return fail(res, 'Dokumen tidak ditemukan.', {}, 404);
    const fullPath = path.resolve(__dirname, 'uploads', item[req.params.type]);
    if (!fs.existsSync(fullPath)) return fail(res, 'File dokumen tidak ditemukan di server.', {}, 404);
    return res.download(fullPath);
  } catch (e) {
    next(e);
  }
});

app.use(errorMiddleware);

module.exports = app;
