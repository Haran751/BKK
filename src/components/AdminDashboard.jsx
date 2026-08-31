import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity, ArrowUpRight, BarChart3, BookOpen, BriefcaseBusiness, Building2,
  Check, ChevronDown, ClipboardList, CloudUpload, FileText, GalleryHorizontal,
  LayoutDashboard, LogOut, Menu, MoreHorizontal, Pencil, Plus, Search, Settings,
  ShieldCheck, Trash2, TrendingUp, Users, X, Eye, Download, Bell, Sparkles, Key
} from 'lucide-react';
import CompanyLogo from './CompanyLogo';
import { adminApi } from '../api/adminApi';

const SESSION_KEY = 'bkk_admin_session';

const menu = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'jobs', label: 'Lowongan Pekerjaan', icon: BriefcaseBusiness },
  { id: 'applications', label: 'Lamaran Pelamar', icon: ClipboardList },
  { id: 'companies', label: 'Mitra Perusahaan', icon: Building2 },
  { id: 'gallery', label: 'Galeri', icon: GalleryHorizontal },
  { id: 'articles', label: 'Artikel', icon: BookOpen },
  { id: 'settings', label: 'Pengaturan', icon: Settings }
];

const statusClass = (status) => ({
  Published: 'bg-emerald-50 text-emerald-700', published: 'bg-emerald-50 text-emerald-700',
  Aktif: 'bg-emerald-50 text-emerald-700', active: 'bg-emerald-50 text-emerald-700',
  Baru: 'bg-orange-50 text-orange-700', baru: 'bg-orange-50 text-orange-700', pending: 'bg-orange-50 text-orange-700',
  'Sedang Ditinjau': 'bg-blue-50 text-blue-700', ditinjau: 'bg-blue-50 text-blue-700', reviewed: 'bg-blue-50 text-blue-700',
  'Lolos Seleksi': 'bg-violet-50 text-violet-700', lolos: 'bg-violet-50 text-violet-700',
  Diterima: 'bg-emerald-50 text-emerald-700', diterima: 'bg-emerald-50 text-emerald-700', accepted: 'bg-emerald-50 text-emerald-700',
  Draft: 'bg-slate-100 text-slate-600', draft: 'bg-slate-100 text-slate-600',
  Closed: 'bg-rose-50 text-rose-700', closed: 'bg-rose-50 text-rose-700',
  'Tidak Aktif': 'bg-slate-100 text-slate-500', inactive: 'bg-slate-100 text-slate-500',
  tidak_lolos: 'bg-rose-50 text-rose-700', rejected: 'bg-rose-50 text-rose-700'
}[status] || 'bg-slate-100 text-slate-600');

function AdminLogin({ onLogin }) {
  const [identity, setIdentity] = useState('admin@example.com');
  const [password, setPassword] = useState('ChangeMe123!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event?.preventDefault();
    if (!identity.trim() || password.length < 6) {
      setError('Masukkan email/username dan password minimal 6 karakter.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await adminApi.login(identity, password);
      const user = response.data?.data?.admin || response.data?.admin || { name: 'Administrator', email: identity };
      const token = response.data?.data?.token || response.data?.token;
      if (!token) throw new Error('Respons login dari server tidak valid.');
      sessionStorage.setItem('bkk_admin_token', token);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
      onLogin(user);
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || 'Login gagal. Pastikan backend server aktif.');
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-art">
        <div className="admin-brand-mark">
          <ShieldCheck size={22} />
          <span>BKK</span>
        </div>
        <div className="admin-art-copy">
          <p>PORTAL PENGELOLA</p>
          <h1>Kelola peluang.<br /><em>Buka masa depan.</em></h1>
          <span>Ruang kerja digital untuk menghubungkan talenta SMKN 20 Jakarta dengan industri terbaik.</span>
        </div>
      </div>
      <section className="admin-login-card">
        <div className="admin-mobile-logo"><ShieldCheck size={19} /> BKK</div>
        <div className="admin-login-heading">
          <span className="eyebrow">ADMINISTRATOR</span>
          <h2>Selamat datang kembali</h2>
          <p>Masuk untuk mengelola portal BKK SMKN 20 Jakarta.</p>
        </div>
        {error && <div className="admin-error"><X size={16} />{error}</div>}
        <form onSubmit={submit} className="admin-form">
          <label>
            Email atau username
            <input
              value={identity}
              onChange={(e) => { setIdentity(e.target.value); setError(''); }}
              placeholder="admin@example.com"
              autoComplete="username"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Masukkan password"
              autoComplete="current-password"
            />
          </label>
          <div className="admin-form-meta">
            <label className="admin-check">
              <input type="checkbox" defaultChecked /> Ingat perangkat ini
            </label>
          </div>
          <button className="admin-primary-btn" type="submit" disabled={loading}>
            {loading ? <span className="admin-spinner" /> : <ShieldCheck size={18} />}
            {loading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}
          </button>
        </form>
        <p className="admin-login-foot">
          Akses terbatas untuk administrator terverifikasi BKK SMKN 20 Jakarta.
        </p>
      </section>
    </main>
  );
}

function StatCard({ label, value, trend, icon: Icon, accent }) {
  return (
    <div className="admin-stat-card">
      <div className={`admin-stat-icon ${accent}`}><Icon size={20} /></div>
      <div className="admin-stat-label">{label}</div>
      <strong>{value ?? 0}</strong>
      <span className="admin-stat-trend"><TrendingUp size={13} /> {trend}</span>
    </div>
  );
}

function EmptyState({ label }) {
  return (
    <div className="admin-empty">
      <FileText size={28} />
      <strong>Belum ada data {label}</strong>
      <span>Data baru akan muncul di sini setelah tersimpan.</span>
    </div>
  );
}

function DataToolbar({ search, setSearch, placeholder, onAdd, addLabel = 'Tambah data', filter, setFilter, options = [] }) {
  return (
    <div className="admin-toolbar">
      <div className="admin-search">
        <Search size={17} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={placeholder} />
      </div>
      <div className="admin-toolbar-actions">
        {options.length > 0 && (
          <div className="admin-select-wrap">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">Semua status</option>
              {options.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <ChevronDown size={15} />
          </div>
        )}
        {onAdd && (
          <button className="admin-primary-btn compact" onClick={onAdd}>
            <Plus size={16} /> {addLabel}
          </button>
        )}
      </div>
    </div>
  );
}

function DashboardHome({ jobs = [], applications = [], companies = [], gallery = [], articles = [], stats = {}, selectPage }) {
  return (
    <>
      <div className="admin-page-header">
        <div>
          <span className="eyebrow">RINGKASAN AKTIVITAS</span>
          <h1>Dashboard overview</h1>
          <p>Pantau ekosistem penyaluran kerja BKK hari ini.</p>
        </div>
      </div>
      <div className="admin-stats-grid">
        <StatCard label="Total lowongan" value={stats.totalJobs ?? jobs.length} trend="Dari database" icon={BriefcaseBusiness} accent="orange" />
        <StatCard label="Pelamar baru" value={stats.newApplications ?? stats.totalApplications ?? applications.length} trend="Dari database" icon={Users} accent="blue" />
        <StatCard label="Mitra aktif" value={stats.totalCompanies ?? companies.length} trend="Dari database" icon={Building2} accent="green" />
        <StatCard label="Artikel terbit" value={stats.totalArticles ?? articles.length} trend="Dari database" icon={BookOpen} accent="violet" />
      </div>
      <div className="admin-content-grid">
        <section className="admin-panel admin-wide">
          <PanelTitle title="Lamaran terbaru" action="Lihat semua" onClick={() => selectPage('applications')} />
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Pelamar</th>
                  <th>Lowongan</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {(applications || []).slice(0, 5).map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="admin-person">
                        <span>{(item.name || 'P').charAt(0).toUpperCase()}</span>
                        <div>
                          <strong>{item.name || '-'}</strong>
                          <small>{item.email || '-'}</small>
                        </div>
                      </div>
                    </td>
                    <td>{item.job?.title || (typeof item.job === 'string' ? item.job : '') || '-'}</td>
                    <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID') : '-'}</td>
                    <td><span className={`admin-status ${statusClass(item.status)}`}>{item.status}</span></td>
                  </tr>
                ))}
                {applications.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-slate-400">Belum ada data lamaran.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        <section className="admin-panel">
          <PanelTitle title="Aktivitas terbaru" action="" />
          <div className="admin-activity">
            <ActivityItem icon={Activity} color="blue" text="Aktivitas database tersinkronisasi" time="Real-time MySQL" />
            <ActivityItem icon={BriefcaseBusiness} color="orange" text={`${stats.activeJobs ?? jobs.length} lowongan sedang aktif`} time="Status published / active" />
            <ActivityItem icon={Users} color="green" text={`${stats.totalApplications ?? applications.length} total pelamar tercatat`} time="Data pelamar BKK" />
          </div>
        </section>
      </div>
      <div className="admin-content-grid">
        <section className="admin-panel">
          <PanelTitle title="Lowongan terbaru" action="Kelola lowongan" onClick={() => selectPage('jobs')} />
          {(jobs || []).slice(0, 4).map((job) => (
            <div className="admin-list-row" key={job.id}>
              <div className="admin-list-avatar"><BriefcaseBusiness size={16} /></div>
              <div>
                <strong>{job.title}</strong>
                <small>{job.company?.name || (typeof job.company === 'string' ? job.company : '') || 'Mitra BKK'} · {job.location || 'Jakarta'}</small>
              </div>
              <span className={`admin-status ${statusClass(job.status)}`}>{job.status}</span>
            </div>
          ))}
          {jobs.length === 0 && <p className="text-xs text-slate-400 py-3">Belum ada lowongan.</p>}
        </section>
        <section className="admin-panel">
          <PanelTitle title="Mitra perusahaan" action="Kelola mitra" onClick={() => selectPage('companies')} />
          {(companies || []).slice(0, 4).map((company) => (
            <div className="admin-list-row" key={company.id}>
              <div className="admin-company-avatar"><CompanyLogo name={company.name || company.logo || company.id} /></div>
              <div>
                <strong>{company.name || company.fullName || 'Perusahaan'}</strong>
                <small>{company.industry || company.website || 'Mitra industri'}</small>
              </div>
              <span className="admin-dot-status"><i /> {company.status || 'active'}</span>
            </div>
          ))}
          {companies.length === 0 && <p className="text-xs text-slate-400 py-3">Belum ada perusahaan mitra.</p>}
        </section>
      </div>
    </>
  );
}

function PanelTitle({ title, action, onClick }) {
  return (
    <div className="admin-panel-title">
      <h2>{title}</h2>
      {action && <button onClick={onClick}>{action} <ArrowUpRight size={14} /></button>}
    </div>
  );
}

function ActivityItem({ icon: Icon, color, text, time }) {
  return (
    <div className="admin-activity-item">
      <span className={`activity-icon ${color}`}><Icon size={15} /></span>
      <div>
        <strong>{text}</strong>
        <small>{time}</small>
      </div>
    </div>
  );
}

function CrudPage({ type, data = [], setData, companies = [] }) {
  const config = {
    jobs: ['Lowongan pekerjaan', 'judul atau lokasi', 'Tambah lowongan'],
    companies: ['Mitra perusahaan', 'nama perusahaan', 'Tambah perusahaan'],
    gallery: ['Galeri kegiatan', 'judul galeri', 'Tambah galeri'],
    articles: ['Artikel & berita', 'judul artikel', 'Tambah artikel']
  }[type] || ['Data', 'pencarian', 'Tambah data'];

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [modal, setModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);

  const filtered = useMemo(() => (data || []).filter((item) => {
    if (!item) return false;
    const compName = typeof item.company === 'string' ? item.company : (item.company?.name || '');
    const hay = `${item.title || item.name || item.fullName || ''} ${compName} ${item.industry || item.category || ''} ${item.location || ''}`.toLowerCase();
    return hay.includes(search.toLowerCase()) && (filter === 'all' || item.status === filter);
  }), [data, search, filter]);

  const titleOf = (item) => item.title || item.name || item.fullName || 'Item';

  const remove = async (id) => {
    if (window.confirm('Hapus data ini? Tindakan ini tidak dapat dibatalkan.')) {
      try {
        await adminApi.remove(type, id);
        setData((current) => current.filter((item) => item.id !== id));
      } catch (e) {
        console.error('Gagal menghapus data:', e);
      }
    }
  };

  const toggle = async (id) => {
    const currentItem = (data || []).find((item) => item.id === id);
    if (!currentItem) return;
    const nextStatus = type === 'companies'
      ? (currentItem.status === 'active' ? 'inactive' : 'active')
      : type === 'jobs'
      ? (currentItem.status === 'published' ? 'draft' : 'published')
      : (currentItem.status === 'published' ? 'draft' : 'published');

    try {
      await adminApi.update(type, id, { status: nextStatus });
      setData((current) => current.map((item) => item.id === id ? { ...item, status: nextStatus } : item));
    } catch (e) {
      console.error('Gagal update status:', e);
    }
  };

  return (
    <>
      <div className="admin-page-header">
        <div>
          <span className="eyebrow">MANAJEMEN KONTEN</span>
          <h1>{config[0]}</h1>
          <p>Kelola informasi yang tampil di portal publik BKK.</p>
        </div>
        <button className="admin-primary-btn" onClick={() => { setEditingItem(null); setModal(true); }}>
          <Plus size={17} /> {config[2]}
        </button>
      </div>
      <section className="admin-panel">
        <DataToolbar
          search={search}
          setSearch={setSearch}
          placeholder={`Cari ${config[1]}...`}
          filter={filter}
          setFilter={setFilter}
          options={type === 'companies' ? ['active', 'inactive'] : type === 'jobs' ? ['published', 'draft', 'closed'] : ['published', 'draft']}
        />
        <div className="admin-table-wrap">
          <table className="admin-table admin-manage-table">
            <thead>
              <tr>
                <th>{type === 'companies' ? 'Perusahaan' : 'Judul'}</th>
                <th>{type === 'jobs' ? 'Perusahaan / Lokasi' : type === 'companies' ? 'Website' : 'Author / Kategori'}</th>
                <th>Status</th>
                <th>Diperbarui</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="admin-person">
                      {type === 'companies' ? (
                        <div className="admin-company-avatar"><CompanyLogo name={item.name || item.logo || item.id} /></div>
                      ) : (
                        <div className="admin-list-avatar"><FileText size={16} /></div>
                      )}
                      <div>
                        <strong>{titleOf(item)}</strong>
                        <small>{item.id} · {item.description ? String(item.description).slice(0, 45) + '...' : item.location || 'Konten BKK'}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    {type === 'jobs'
                      ? `${item.company?.name || (typeof item.company === 'string' ? item.company : '') || '-'} · ${item.location || '-'}`
                      : item.website || item.author || item.category || 'BKK SMKN 20'}
                  </td>
                  <td>
                    <button className={`admin-status ${statusClass(item.status)}`} onClick={() => toggle(item.id)}>
                      {item.status || 'active'}
                    </button>
                  </td>
                  <td>{item.updatedAt ? new Date(item.updatedAt).toLocaleDateString('id-ID') : item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID') : '-'}</td>
                  <td>
                    <div className="admin-row-actions">
                      <button title="Lihat detail" onClick={() => setViewingItem(item)}><Eye size={16} /></button>
                      <button title="Edit" onClick={() => { setEditingItem(item); setModal(true); }}><Pencil size={16} /></button>
                      <button title="Hapus" onClick={() => remove(item.id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <EmptyState label={config[0].toLowerCase()} />}
        </div>
        <div className="admin-pagination">
          <span>Menampilkan {filtered.length} dari {data.length} data</span>
        </div>
      </section>

      {modal && (
        <ContentModal
          type={type}
          item={editingItem}
          companies={companies}
          onClose={() => { setModal(false); setEditingItem(null); }}
          onSave={async (itemData) => {
            try {
              if (editingItem) {
                const res = await adminApi.update(type, editingItem.id, itemData);
                setData((current) => current.map((i) => i.id === editingItem.id ? (res.data?.data || itemData) : i));
              } else {
                const res = await adminApi.create(type, itemData);
                if (res.data?.data) setData((current) => [res.data.data, ...current]);
              }
              setModal(false);
              setEditingItem(null);
            } catch (e) {
              console.error(`SAVE ${type.toUpperCase()} ERROR:`, e);
              console.error('API RESPONSE:', e.response?.data);
              const message = e.response?.data?.message || e.response?.data?.error || e.message || 'Terjadi kesalahan pada server.';
              alert('Gagal menyimpan data: ' + message);
            }
          }}
        />
      )}

      {viewingItem && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal">
            <div className="admin-modal-head">
              <div>
                <span className="eyebrow">DETAIL {type.toUpperCase()}</span>
                <h2>{titleOf(viewingItem)}</h2>
              </div>
              <button onClick={() => setViewingItem(null)}><X size={19} /></button>
            </div>
            <div className="space-y-3 text-xs">
              <p><strong>Deskripsi / Konten:</strong></p>
              <p className="p-3 bg-slate-50 rounded-xl text-slate-700 whitespace-pre-wrap">{viewingItem.description || viewingItem.content || '-'}</p>
              {viewingItem.location && <p><strong>Lokasi:</strong> {viewingItem.location}</p>}
              {viewingItem.salary && <p><strong>Gaji:</strong> {viewingItem.salary}</p>}
              {viewingItem.website && <p><strong>Website:</strong> {viewingItem.website}</p>}
              <p><strong>Status:</strong> <span className={`admin-status ${statusClass(viewingItem.status)}`}>{viewingItem.status}</span></p>
            </div>
            <div className="admin-modal-actions mt-4">
              <button type="button" className="admin-outline-btn" onClick={() => setViewingItem(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ContentModal({ type, item, companies = [], onClose, onSave }) {
  const [title, setTitle] = useState(item?.title || item?.name || '');
  const [description, setDescription] = useState(item?.description || item?.content || '');
  const [location, setLocation] = useState(item?.location || 'Jakarta');
  const [extra, setExtra] = useState(item?.website || item?.author || '');
  const [companyId, setCompanyId] = useState(item?.companyId || item?.company_id || companies[0]?.id || '');
  const [jobType, setJobType] = useState(item?.jobType || item?.job_type || 'Full Time');
  const [requirements, setRequirements] = useState(item?.requirements || '');
  const [skills, setSkills] = useState(item?.skills || '');
  const [education, setEducation] = useState(item?.education || '');
  const [salary, setSalary] = useState(item?.salary || '');
  const [deadline, setDeadline] = useState(item?.deadline || '');
  const [category, setCategory] = useState(item?.category || '');
  const [eventDate, setEventDate] = useState(item?.eventDate || item?.event_date || '');
  const [status, setStatus] = useState(item?.status || (type === 'companies' ? 'active' : type === 'articles' || type === 'gallery' ? 'draft' : 'draft'));
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const values = { title, name: title, description, content: description, location, status };
    if (type === 'jobs') Object.assign(values, { company_id: companyId, job_type: jobType, requirements, skills, education, salary, deadline });
    if (type === 'companies') Object.assign(values, { website: extra, industry: category });
    if (type === 'articles') Object.assign(values, { author: extra || 'Admin BKK', category });
    if (type === 'gallery') values.category = category;
    if (type === 'gallery') values.event_date = eventDate;
    const payload = file || type === 'gallery' || type === 'companies' || type === 'articles' || type === 'jobs' ? new FormData() : values;
    const fileField = type === 'jobs' ? 'image' : type === 'companies' ? 'logo' : type === 'gallery' ? 'image' : 'thumbnail';
    if (payload instanceof FormData) {
      Object.entries(values).forEach(([key, value]) => payload.append(key, value ?? ''));
      if (file) payload.append(fileField, file);
    }
    onSave(payload);
  };

  const modalTitle = item
    ? `Edit ${type === 'jobs' ? 'Lowongan' : type === 'companies' ? 'Perusahaan' : type === 'gallery' ? 'Galeri' : 'Artikel'}`
    : `Tambah ${type === 'jobs' ? 'Lowongan' : type === 'companies' ? 'Perusahaan' : type === 'gallery' ? 'Galeri' : 'Artikel'}`;

  return (
    <div className="admin-modal-backdrop" style={{ overflow: 'hidden' }}>
      <div className="admin-modal" style={{ maxHeight: 'min(90vh, calc(100vh - 40px))', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>

        {/* ── Sticky header ── */}
        <div className="admin-modal-head" style={{ flexShrink: 0, padding: '20px 22px 16px', borderBottom: '1px solid #f0f2f5' }}>
          <div>
            <span className="eyebrow">FORM DATA</span>
            <h2 style={{ margin: '5px 0 0', fontSize: 19 }}>{modalTitle}</h2>
          </div>
          <button onClick={onClose} style={{ border: 0, background: '#f2f5f8', borderRadius: 5, width: 29, height: 29, color: '#708096', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
            <X size={19} />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div style={{ flex: '1 1 auto', minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', padding: '18px 22px' }}>
          <form id="content-modal-form" className="admin-form" onSubmit={handleSubmit}>
            <label>
              Judul / Nama *
              <input autoFocus required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Contoh: Judul atau Nama..." />
            </label>

            {type === 'jobs' && (
              <>
                <label>
                  Perusahaan *
                  <select required value={companyId} onChange={(e) => setCompanyId(e.target.value)}>
                    <option value="">Pilih perusahaan mitra</option>
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>{company.name}</option>
                    ))}
                  </select>
                </label>

                <label>
                  Lokasi Penempatan
                  <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Contoh: Jakarta Pusat" />
                </label>

                <label>
                  Tipe Pekerjaan
                  <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                    {['Full Time', 'Part Time', 'Contract', 'Internship'].map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </label>

                <label>
                  Persyaratan & Kualifikasi *
                  <textarea
                    required
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    rows={5}
                    placeholder="Tulis setiap persyaratan pada baris baru&#10;Contoh:&#10;- Min. lulusan SMK / sederajat&#10;- Mampu bekerja dalam tim"
                    style={{ resize: 'vertical' }}
                  />
                </label>

                <label>
                  Keahlian / Skill yang Dibutuhkan
                  <textarea
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    rows={3}
                    placeholder="Contoh: Microsoft Office, AutoCAD, troubleshooting jaringan"
                    style={{ resize: 'vertical' }}
                  />
                </label>

                <label>
                  Pendidikan Minimal *
                  <input required value={education} onChange={(e) => setEducation(e.target.value)} placeholder="Contoh: SMK Teknik Mesin / TKJ / RPL" />
                </label>

                <label>
                  Rentang Gaji
                  <input value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Contoh: Rp 3.500.000 - Rp 5.000.000" />
                </label>

                <label>
                  Deadline Lamaran
                  <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                </label>
              </>
            )}

            {type === 'companies' && (
              <label>
                Website Perusahaan
                <input value={extra} onChange={(e) => setExtra(e.target.value)} placeholder="https://perusahaan.co.id" />
              </label>
            )}

            {type === 'articles' && (
              <label>
                Penulis / Author
                <input value={extra} onChange={(e) => setExtra(e.target.value)} placeholder="Tim BKK" />
              </label>
            )}

            {(type === 'companies' || type === 'gallery' || type === 'articles') && (
              <label>
                Kategori / Industri
                <input value={category} onChange={(e) => setCategory(e.target.value)} />
              </label>
            )}

            {type === 'gallery' && (
              <label>
                Tanggal Kegiatan
                <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
              </label>
            )}

            {type !== 'companies' && (
              <label>
                Status
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  {(type === 'jobs' ? ['draft', 'published', 'closed'] : ['draft', 'published']).map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </label>
            )}

            {['jobs', 'companies', 'gallery', 'articles'].includes(type) && (
              <label>
                File {type === 'jobs' ? 'Gambar Lowongan' : type === 'companies' ? 'Logo Perusahaan' : type === 'gallery' ? 'Gambar Kegiatan' : 'Thumbnail Artikel'}
                <input
                  type="file"
                  name={type === 'jobs' ? 'image' : type === 'companies' ? 'logo' : type === 'gallery' ? 'image' : 'thumbnail'}
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => {
                    const nextFile = e.target.files?.[0] || null;
                    setFile(nextFile);
                    setPreview(nextFile ? URL.createObjectURL(nextFile) : '');
                  }}
                />
              </label>
            )}

            {preview && (
              <img src={preview} alt="Preview file" className="w-full h-32 object-contain rounded-xl border border-slate-200 bg-slate-50 p-2" />
            )}

            <label>
              Deskripsi / Konten *
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Tuliskan deskripsi atau keterangan lengkap..."
                style={{ resize: 'vertical' }}
              />
            </label>
          </form>
        </div>

        {/* ── Sticky footer with action buttons ── */}
        <div className="admin-modal-actions" style={{ flex: '0 0 auto', borderTop: '1px solid #f0f2f5', padding: '14px 22px', margin: 0, background: '#fff' }}>
          <button type="button" className="admin-outline-btn" onClick={onClose}>Batal</button>
          <button type="submit" form="content-modal-form" className="admin-primary-btn">
            <Check size={16} /> {item ? 'Simpan Perubahan' : 'Simpan Data'}
          </button>
        </div>

      </div>
    </div>
  );
}

function ApplicationsPage({ applications = [], setApplications }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const statuses = [
    { value: 'baru', label: 'Baru' },
    { value: 'ditinjau', label: 'Ditinjau' },
    { value: 'lolos', label: 'Lolos' },
    { value: 'tidak_lolos', label: 'Tidak Lolos' },
    { value: 'diterima', label: 'Diterima' }
  ];

  const filtered = (applications || []).filter((item) => {
    if (!item) return false;
    const jobTitle = item.job?.title || (typeof item.job === 'string' ? item.job : '') || '';
    const hay = `${item.name || ''} ${item.email || ''} ${item.nisn || ''} ${jobTitle}`.toLowerCase();
    return hay.includes(search.toLowerCase()) && (filter === 'all' || item.status === filter);
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await adminApi.update('applications', id, { status: newStatus });
      const nextStatus = response?.data?.data?.status || newStatus;
      setApplications((current) => current.map((candidate) => candidate.id === id ? { ...candidate, status: nextStatus } : candidate));
    } catch (e) {
      console.error('Gagal memperbarui status lamaran:', e);
      alert(e.response?.data?.message || 'Gagal memperbarui status lamaran.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus data lamaran ini? Tindakan ini tidak dapat dibatalkan.')) {
      try {
        await adminApi.remove('applications', id);
        setApplications((current) => current.filter((candidate) => candidate.id !== id));
      } catch (e) {
        console.error('Gagal menghapus lamaran:', e);
      }
    }
  };

  const downloadDocument = async (id, type) => {
    try {
      const response = await adminApi.document(id, type);
      const url = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${type}-lamaran-${id}`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Dokumen tidak dapat diunduh: ' + (e.response?.data?.message || e.message));
    }
  };

  return (
    <>
      <div className="admin-page-header">
        <div>
          <span className="eyebrow">TALENT PIPELINE</span>
          <h1>Lamaran pelamar</h1>
          <p>Review berkas kandidat dan perbarui status seleksi.</p>
        </div>
      </div>
      <section className="admin-panel">
        <DataToolbar search={search} setSearch={setSearch} placeholder="Cari nama, email, atau NISN..." filter={filter} setFilter={setFilter} options={['baru', 'ditinjau', 'lolos', 'tidak_lolos', 'diterima']} />
        <div className="admin-table-wrap">
          <table className="admin-table admin-manage-table">
            <thead>
              <tr>
                <th>Pelamar</th>
                <th>Lowongan dilamar</th>
                <th>Tanggal</th>
                <th>Status lamaran</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="admin-person">
                      <span>{(item.name || 'P').charAt(0).toUpperCase()}</span>
                      <div>
                        <strong>{item.name || '-'}</strong>
                        <small>{item.email || '-'} · NISN {item.nisn || '-'}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <strong>{item.job?.title || item.jobTitle || (typeof item.job === 'string' ? item.job : '') || '-'}</strong>
                    <small className="admin-block">{item.job?.company?.name || item.company || '-'}</small>
                  </td>
                  <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID') : item.date || '-'}</td>
                  <td>
                    <select
                      className={`admin-status-select ${statusClass(item.status)}`}
                      value={item.status || 'pending'}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                    >
                      {statuses.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      <button title="Detail pelamar" onClick={() => setSelected(item)}><Eye size={16} /></button>
                      <button title="Hapus" onClick={() => handleDelete(item.id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-slate-400">Tidak ada lamaran ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="admin-pagination">
          <span>{filtered.length} pelamar ditemukan</span>
        </div>
      </section>

      {selected && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal applicant-modal">
            <div className="admin-modal-head">
              <div>
                <span className="eyebrow">DETAIL PELAMAR · #{selected.id}</span>
                <h2>{selected.name}</h2>
              </div>
              <button onClick={() => setSelected(null)}><X size={19} /></button>
            </div>
            <div className="applicant-profile">
              <span>{(selected.name || 'P').charAt(0).toUpperCase()}</span>
              <div>
                <strong>{selected.email}</strong>
                <small>{selected.whatsapp || '-'} · {selected.major || '-'}</small>
              </div>
              <span className={`admin-status ${statusClass(selected.status)}`}>{selected.status}</span>
            </div>
            <div className="applicant-detail-grid">
              <div><small>NISN</small><strong>{selected.nisn || '-'}</strong></div>
              <div><small>Tahun lulus</small><strong>{selected.graduationYear || selected.graduation_year || '-'}</strong></div>
              <div><small>Nilai rata-rata</small><strong>{selected.averageScore || selected.average_score || selected.score || '-'}</strong></div>
              <div><small>Lowongan</small><strong>{selected.job?.title || selected.jobTitle || (typeof selected.job === 'string' ? selected.job : '') || '-'}</strong></div>
            </div>
            {selected.coverMessage && (
              <div className="mb-4">
                <small className="text-slate-400 block mb-1">Pesan Pengantar:</small>
                <p className="p-3 bg-slate-50 rounded-xl text-slate-700 text-xs">{selected.coverMessage}</p>
              </div>
            )}
            <div className="document-list">
              {selected.cv ? (
                <button type="button" onClick={() => downloadDocument(selected.id, 'cv')} className="admin-primary-btn compact inline-flex items-center gap-2">
                  <FileText size={16} /> Unduh Dokumen CV <Download size={15} />
                </button>
              ) : null}
              {selected.diploma ? (
                <button type="button" onClick={() => downloadDocument(selected.id, 'diploma')} className="admin-outline-btn compact inline-flex items-center gap-2">
                  <FileText size={16} /> Unduh Dokumen Ijazah <Download size={15} />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function AdminDashboard() {
  const [user, setUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const getInitialPage = () => {
    const path = window.location.pathname;
    const seg = path.replace(/^\/admin\/?/, '').split('/')[0];
    const valid = ['dashboard', 'jobs', 'applications', 'companies', 'gallery', 'articles', 'settings'];
    return valid.includes(seg) ? seg : 'dashboard';
  };

  const [page, setPage] = useState(getInitialPage);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [articleData, setArticleData] = useState([]);
  const [stats, setStats] = useState({});
  const [apiError, setApiError] = useState('');

  const logout = () => {
    adminApi.logout().catch(() => {});
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem('bkk_admin_token');
    setUser(null);
    window.history.replaceState({}, '', '/admin/login');
  };

  useEffect(() => {
    if (!user) return;
    Promise.all([
      adminApi.list('jobs', { limit: 100 }),
      adminApi.list('applications', { limit: 100 }),
      adminApi.list('companies', { limit: 100 }),
      adminApi.list('gallery', { limit: 100 }),
      adminApi.list('articles', { limit: 100 }),
      adminApi.list('dashboard')
    ]).then(([jobRes, appRes, compRes, galRes, artRes, dashRes]) => {
      setJobs(jobRes.data?.data || []);
      setApplications(appRes.data?.data || []);
      setCompanies(compRes.data?.data || []);
      setGallery(galRes.data?.data || []);
      setArticleData(artRes.data?.data || []);
      setStats(dashRes.data?.data?.statistics || {});
    }).catch((error) => {
      if (error.response?.status === 401) {
        logout();
      } else {
        setApiError(error.response?.data?.message || 'Tidak dapat memuat data dari API. Pastikan server aktif.');
      }
    });
  }, [user]);

  useEffect(() => {
    if (user) {
      window.history.replaceState({}, '', `/admin/${page}`);
    }
  }, [page, user]);

  const login = (nextUser) => {
    setUser(nextUser);
    window.history.replaceState({}, '', '/admin/dashboard');
    setPage('dashboard');
  };

  const navigate = (next) => {
    setPage(next);
    setSidebarOpen(false);
  };

  if (!user) {
    return <AdminLogin onLogin={login} />;
  }

  const userName = user.name || user.email?.split('@')[0] || 'Administrator';
  const userInitial = userName.charAt(0).toUpperCase();

  const content = (
    <>
      {apiError && <div className="admin-error"><X size={16} />{apiError}</div>}
      {page === 'dashboard' ? (
        <DashboardHome jobs={jobs} applications={applications} companies={companies} gallery={gallery} articles={articleData} stats={stats} selectPage={navigate} />
      ) : page === 'applications' ? (
        <ApplicationsPage applications={applications} setApplications={setApplications} />
      ) : page === 'jobs' ? (
        <CrudPage type="jobs" data={jobs} setData={setJobs} companies={companies} />
      ) : page === 'companies' ? (
        <CrudPage type="companies" data={companies} setData={setCompanies} />
      ) : page === 'gallery' ? (
        <CrudPage type="gallery" data={gallery} setData={setGallery} />
      ) : page === 'articles' ? (
        <CrudPage type="articles" data={articleData} setData={setArticleData} />
      ) : (
        <SettingsPage user={user} onUserUpdated={(updatedUser) => {
          setUser(updatedUser);
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
        }} />
      )}
    </>
  );

  return (
    <div className="admin-app">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-brand">
          <ShieldCheck size={22} />
          <span>BKK<span>ONE</span></span>
          <button onClick={() => setSidebarOpen(false)}><X size={18} /></button>
        </div>
        <div className="admin-workspace">
          <span>WORKSPACE</span>
          <strong>SMKN 20 Jakarta</strong>
          <ChevronDown size={15} />
        </div>
        <nav>
          {menu.map(({ id, label, icon: Icon }) => (
            <button key={id} className={page === id ? 'active' : ''} onClick={() => navigate(id)}>
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <button className="admin-logout-side" onClick={logout}>
          <LogOut size={18} /> Keluar dari akun
        </button>
        <div className="admin-sidebar-foot">
          <div className="admin-avatar">{userInitial}</div>
          <div>
            <strong>{userName}</strong>
            <small>{user.role || 'Administrator BKK'}</small>
          </div>
          <MoreHorizontal size={17} />
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-menu-button" onClick={() => setSidebarOpen(true)}>
            <Menu size={21} />
          </button>
          <div className="admin-breadcrumb">
            <span>Admin</span>
            <b>/</b>
            <strong>{menu.find((item) => item.id === page)?.label || 'Dashboard'}</strong>
          </div>
          <div className="admin-top-actions">
            <div className="admin-top-user">
              <div className="admin-avatar">{userInitial}</div>
              <div>
                <strong>{userName}</strong>
                <small>{user.email || 'admin@bkk.local'}</small>
              </div>
            </div>
          </div>
        </header>
        <main className="admin-page">{content}</main>
      </div>

      {sidebarOpen && <button className="admin-overlay" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}

function SettingsPage({ user, onUserUpdated }) {
  const [name, setName] = useState(user?.name || 'Administrator');
  const [email, setEmail] = useState(user?.email || 'admin@bkk.local');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saveState, setSaveState] = useState({ profile: '', password: '' });
  const [loading, setLoading] = useState({ profile: false, password: false });

  const submitProfile = async (e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, profile: true }));
    setSaveState((prev) => ({ ...prev, profile: '' }));
    try {
      const response = await adminApi.updateProfile({ name, email });
      const updatedUser = response.data?.data || { ...user, name, email };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
      onUserUpdated?.(updatedUser);
      setSaveState((prev) => ({ ...prev, profile: 'Profil berhasil diperbarui.' }));
    } catch (error) {
      setSaveState((prev) => ({ ...prev, profile: error.response?.data?.message || 'Gagal memperbarui profil.' }));
    } finally {
      setLoading((prev) => ({ ...prev, profile: false }));
    }
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || newPassword.length < 6) {
      setSaveState((prev) => ({ ...prev, password: 'Password baru minimal 6 karakter dan password lama wajib diisi.' }));
      return;
    }
    setLoading((prev) => ({ ...prev, password: true }));
    setSaveState((prev) => ({ ...prev, password: '' }));
    try {
      await adminApi.changePassword({ currentPassword, newPassword });
      setCurrentPassword('');
      setNewPassword('');
      setSaveState((prev) => ({ ...prev, password: 'Password berhasil diubah.' }));
    } catch (error) {
      setSaveState((prev) => ({ ...prev, password: error.response?.data?.message || 'Gagal mengubah password.' }));
    } finally {
      setLoading((prev) => ({ ...prev, password: false }));
    }
  };

  return (
    <>
      <div className="admin-page-header">
        <div>
          <span className="eyebrow">PREFERENSI SISTEM</span>
          <h1>Pengaturan</h1>
          <p>Kelola profil admin dan keamanan akun.</p>
        </div>
      </div>
      <section className="admin-panel settings-panel">
        <PanelTitle title="Profil administrator" action="" />
        <div className="settings-profile">
          <div className="settings-avatar">{(name || 'A').charAt(0).toUpperCase()}</div>
          <div>
            <h3>{name}</h3>
            <p>{email}</p>
            <span className="admin-status bg-emerald-50 text-emerald-700">Akun terverifikasi</span>
          </div>
        </div>
        <form onSubmit={submitProfile} className="settings-fields">
          <label>
            Nama administrator
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Role akses
            <input value="Administrator Penuh BKK" readOnly />
          </label>
          {saveState.profile && <div className="admin-error" style={{ marginTop: 10 }}>{saveState.profile}</div>}
          <button type="submit" className="admin-primary-btn compact" disabled={loading.profile}>
            {loading.profile ? 'Menyimpan...' : 'Simpan profil'}
          </button>
        </form>
      </section>

      <section className="admin-panel settings-panel" style={{ marginTop: 20 }}>
        <PanelTitle title="Keamanan akun" action="" />
        <form onSubmit={submitPassword} className="settings-fields">
          <label>
            Password lama
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Masukkan password lama" />
          </label>
          <label>
            Password baru
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Minimal 6 karakter" />
          </label>
          {saveState.password && <div className="admin-error" style={{ marginTop: 10 }}>{saveState.password}</div>}
          <button type="submit" className="admin-primary-btn compact" disabled={loading.password}>
            {loading.password ? 'Mengubah...' : 'Ubah password'}
          </button>
        </form>
      </section>
    </>
  );
}
