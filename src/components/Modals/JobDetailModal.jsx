import React from 'react';
import { X, MapPin, DollarSign, Calendar, Clock, CheckCircle2, Building2, Briefcase, Share2, Send, ShieldCheck, GraduationCap } from 'lucide-react';
import CompanyLogo from '../CompanyLogo';

export default function JobDetailModal({ job, onClose, onApply }) {
  if (!job) return null;

  const reqList = Array.isArray(job.requirements)
    ? job.requirements
    : typeof job.requirements === 'string'
    ? job.requirements.split('\n').map((s) => s.trim()).filter(Boolean)
    : [];

  const respList = Array.isArray(job.responsibilities)
    ? job.responsibilities
    : typeof job.responsibilities === 'string'
    ? job.responsibilities.split('\n').map((s) => s.trim()).filter(Boolean)
    : [
        'Melaksanakan tugas operasional sesuai Standar Operasional Prosedur (SOP)',
        'Menerapkan keselamatan dan kesehatan kerja (K3)',
        'Menyusun laporan hasil kerja harian/mingguan'
      ];

  const benList = Array.isArray(job.benefits)
    ? job.benefits
    : typeof job.benefits === 'string'
    ? job.benefits.split('\n').map((s) => s.trim()).filter(Boolean)
    : [
        'Gaji Pokok & Insentif Kinerja',
        'BPJS Kesehatan & Ketenagakerjaan',
        'Tunjangan Transportasi & Uang Makan',
        'Program Pelatihan & Sertifikasi Industri'
      ];

  const companyName = job.company?.name || (typeof job.company === 'string' ? job.company : '') || 'Mitra Industri BKK';
  const salaryText = job.salary || (job.salaryMin ? `Rp ${Number(job.salaryMin).toLocaleString('id-ID')} - Rp ${Number(job.salaryMax || job.salaryMin).toLocaleString('id-ID')}` : 'Gaji Kompetitif');
  const deadlineText = job.deadline ? (String(job.deadline).includes('-') ? new Date(job.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : job.deadline) : 'Segera';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative my-8">
        
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-bkk-navy via-bkk-blue to-bkk-lightBlue text-white p-6 sm:p-8 rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-20 h-16 rounded-2xl bg-white p-2 flex items-center justify-center shadow-lg shrink-0">
              <CompanyLogo name={job.logo || job.company?.logo || companyName} className="max-h-10" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-orange-500 text-white font-extrabold text-[10px] uppercase">
                  {job.type || job.employmentType || 'Full Time'}
                </span>
                <span className="text-xs text-slate-200">Batas Lamar: {deadlineText}</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white font-display mt-1 uppercase leading-tight">
                {job.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 font-medium">
                {companyName} {job.companyCategory ? `• ${job.companyCategory}` : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3.5 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-slate-400 font-medium block">Gaji & Benefit:</span>
            <span className="font-extrabold text-emerald-700">{salaryText}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Lokasi Kerja:</span>
            <span className="font-bold text-slate-800">{job.location || 'Jakarta'}</span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="text-slate-400 font-medium block">Kualifikasi Jurusan:</span>
            <span className="font-bold text-bkk-blue truncate block">{job.education || job.requirements || 'Semua Jurusan SMK'}</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          {/* Deskripsi */}
          <div>
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight font-display mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-bkk-orange" />
              <span>Deskripsi Pekerjaan</span>
            </h4>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 whitespace-pre-wrap">
              {job.description}
            </p>
          </div>

          {/* Persyaratan & Kualifikasi */}
          {reqList.length > 0 && (
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight font-display mb-2.5 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-bkk-orange" />
                <span>Kualifikasi & Persyaratan</span>
              </h4>
              <ul className="space-y-2">
                {reqList.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tanggung Jawab Utama */}
          {respList.length > 0 && (
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight font-display mb-2.5 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-bkk-orange" />
                <span>Tanggung Jawab Utama</span>
              </h4>
              <ul className="space-y-2">
                {respList.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-bkk-blue shrink-0 mt-2"></span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefit & Fasilitas */}
          {benList.length > 0 && (
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight font-display mb-2.5 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-bkk-orange" />
                <span>Benefit & Fasilitas Karyawan</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {benList.map((ben, idx) => (
                  <div key={idx} className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{ben}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer / Action CTA */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 sm:px-8 py-4 rounded-b-3xl flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Terverifikasi Resmi Tim BKK SMKN 1</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-all"
            >
              Tutup
            </button>

            <button
              onClick={() => { onClose(); onApply(job); }}
              className="px-6 py-2.5 rounded-xl bg-bkk-orange hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-button-orange flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Send className="w-4 h-4" />
              <span>Lamar Posisi Ini</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
