const multer = require('multer');
const path = require('path');
const fs = require('fs');

const root = path.resolve(__dirname, '../uploads');
const storage = multer.diskStorage({ destination: (req, file, cb) => { const folder = file.fieldname === 'cv' ? 'cv' : file.fieldname === 'diploma' ? 'diploma' : file.fieldname === 'logo' ? 'companies' : file.fieldname === 'image' && req.originalUrl.includes('/admin/jobs') ? 'jobs' : file.fieldname === 'image' ? 'gallery' : 'articles'; const destination = path.join(root, folder); fs.mkdirSync(destination, { recursive: true }); cb(null, destination); }, filename: (req, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname).toLowerCase()}`) });
const allowed = { cv: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'], diploma: ['application/pdf', 'image/jpeg', 'image/png'], logo: ['image/jpeg', 'image/png', 'image/webp'], image: ['image/jpeg', 'image/png', 'image/webp'], thumbnail: ['image/jpeg', 'image/png', 'image/webp'] };
const fileFilter = (req, file, cb) => allowed[file.fieldname]?.includes(file.mimetype) ? cb(null, true) : cb(Object.assign(new Error(`Tipe file ${file.fieldname} tidak diizinkan.`), { status: 422, expose: true }));
module.exports = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
