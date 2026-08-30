import React, { useState, useMemo } from 'react';
import { Search, MapPin, Briefcase, Clock, DollarSign, ChevronRight, Filter, Building2, Send, PlusCircle, ShieldCheck } from 'lucide-react';
import CompanyLogo from './CompanyLogo';
import { mediaUrl, fallbackImage } from '../services/media';

export default function LowonganKerja({
  jobs = [],
  currentUser,
  onSelectJob,
  onApplyJob,
  onOpenPostJobModal,
  searchQuery = '',
  setSearchQuery
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [internalSearch, setInternalSearch] = useState('');

  const categories = [
    { id: 'all', label: 'Semua Jurusan / Posisi' },
    { id: 'mesin', label: 'Teknik Mesin & Otomotif' },
    { id: 'it', label: 'TKJ & RPL (IT)' },
    { id: 'admin', label: 'Akuntansi & Administrasi' },
    { id: 'listrik', label: 'Ketenagalistrikan' }
  ];

  const filteredJobs = useMemo(() => {
    return (jobs || []).filter(job => {
      if (!job) return false;
      const q = (searchQuery || internalSearch).toLowerCase();
      const compName = typeof job.company === 'string' ? job.company : (job.company?.name || '');
      const edu = job.education || job.requirements || '';
      const loc = job.location || '';
      const title = job.title || '';

      const matchQuery = !q || 
        title.toLowerCase().includes(q) || 
        compName.toLowerCase().includes(q) ||
        edu.toLowerCase().includes(q) ||
        loc.toLowerCase().includes(q);

      const matchCategory = selectedCategory === 'all' || (() => {
        const text = (title + ' ' + edu).toLowerCase();
        if (selectedCategory === 'mesin') return text.includes('mesin') || text.includes('otomotif') || text.includes('operator');
        if (selectedCategory === 'it') return text.includes('tkj') || text.includes('rpl') || text.includes('teknisi') || text.includes('it') || text.includes('developer');
        if (selectedCategory === 'admin') return text.includes('akuntansi') || text.includes('otkp') || text.includes('administrasi') || text.includes('keuangan');
        if (selectedCategory === 'listrik') return text.includes('listrik') || text.includes('elektro');
        return true;
      })();

      return matchQuery && matchCategory;
    });
  }, [jobs, searchQuery, internalSearch, selectedCategory]);

  return (
    <section id="lowongan" className="py-12 md:py-16 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-bkk-navy uppercase tracking-tight font-display">
              LOWONGAN KERJA TERBARU
            </h2>
            <div className="w-12 h-1 bg-bkk-orange rounded-full mt-1.5"></div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Peluang karir resmi dari mitra industri terverifikasi BKK SMKN 20 Jakarta
            </p>
          </div>

          {/* Action: Post Job ONLY available for logged in Admin */}
          {currentUser && (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenPostJobModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#133e75] hover:bg-[#0c2b53] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-bkk-orange" />
                <span>+ Tambah Lowongan (Admin)</span>
              </button>
            </div>
          )}
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-card border border-slate-100 mb-8 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari posisi pekerjaan, nama perusahaan, atau kualifikasi jurusan..."
                value={searchQuery || internalSearch}
                onChange={(e) => {
                  if (setSearchQuery) setSearchQuery(e.target.value);
                  setInternalSearch(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue transition-all"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-bkk-navy text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Job Cards Grid matching Mockup format */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-700">Tidak ada lowongan ditemukan</h4>
            <p className="text-xs text-slate-500 mt-1">Coba gunakan kata kunci pencarian lain atau reset filter jurusan.</p>
            <button
              onClick={() => {
                if (setSearchQuery) setSearchQuery('');
                setInternalSearch('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-bkk-blue text-white text-xs font-bold"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-5 shadow-card border border-slate-100 hover:shadow-card-hover hover:border-slate-200 transition-all flex flex-col justify-between group"
              >
                <div>
                  
                  {/* Top row: Logo Box on Left + Job Title on Right */}
                  <div className="flex items-start gap-4">
                    
                    {/* Logo Box matching Mockup */}
                    <div className="w-24 sm:w-28 h-16 sm:h-18 rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center shrink-0 shadow-sm group-hover:border-bkk-blue/40 transition-colors">
                      {job.image ? <img src={mediaUrl(job.image, 'jobs')} alt="" onError={(event) => { event.currentTarget.src = fallbackImage; }} className="max-h-10 max-w-full object-contain" /> : <CompanyLogo name={job.company || job.company?.name} className="max-h-10 max-w-full" />}
                    </div>

                    {/* Job Title & Company */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-blue-50 text-bkk-blue">
                          {job.jobType || job.job_type || job.type || job.employmentType || 'Full Time'}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          Batas: {job.deadline ? (String(job.deadline).includes('-') ? new Date(job.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : job.deadline) : 'Segera'}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight mt-1 leading-snug font-display line-clamp-2 group-hover:text-bkk-blue transition-colors">
                        {job.title}
                      </h3>

                      <p className="text-xs font-bold text-slate-500 mt-0.5 truncate">
                        {job.company?.name || (typeof job.company === 'string' ? job.company : '') || 'Mitra Industri BKK'}
                      </p>
                    </div>

                  </div>

                  {/* Description Snippet matching Mockup */}
                  <p className="mt-3.5 text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {job.description}
                  </p>

                  {/* Badges / Meta Info */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-bkk-orange shrink-0" />
                      <span className="truncate max-w-[150px]">{job.location || 'Jakarta & Sekitarnya'}</span>
                    </div>
                    <div className="flex items-center gap-1 font-bold text-emerald-700">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{job.salary || (job.salaryMin ? `Rp ${Number(job.salaryMin).toLocaleString('id-ID')} - Rp ${Number(job.salaryMax || job.salaryMin).toLocaleString('id-ID')}` : 'Gaji Kompetitif')}</span>
                    </div>
                  </div>

                </div>

                {/* Bottom Action Buttons: DETAIL & LAMAR */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-orange-600 font-bold bg-orange-50 px-2.5 py-1 rounded-md">
                    {(job.openPositions ?? 1)} Kuota Formasi
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Detail Button matching mockup (Navy pill) */}
                    <button
                      onClick={() => onSelectJob(job)}
                      className="px-4 py-1.5 rounded-lg bg-[#133e75] hover:bg-[#0c2b53] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95"
                    >
                      DETAIL
                    </button>

                    {/* Lamar Button */}
                    <button
                      onClick={() => onApplyJob(job)}
                      className="px-4 py-1.5 rounded-lg bg-bkk-orange hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-button-orange active:scale-95 flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>LAMAR</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
