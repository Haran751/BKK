import React, { useState } from 'react';
import { X, Building2, PlusCircle, CheckCircle2, DollarSign, MapPin, Send, ShieldCheck, Sparkles } from 'lucide-react';

export default function PostJobModal({ onClose, onJobPosted }) {
  const [submitted, setSubmitted] = useState(false);
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    companyCategory: 'Manufaktur & Otomotif',
    location: 'Jakarta & Sekitarnya',
    type: 'Full Time',
    salary: 'Rp 5.200.000 - Rp 6.800.000',
    education: 'SMK Teknik Mesin / Otomotif / TKJ / RPL',
    deadline: '30 November 2024',
    openPositions: 15,
    description: '',
    requirementsText: 'Pria / Wanita, usia maksimal 23 tahun\nLulusan SMK jurusan relevan\nSehat jasmani dan rohani, tidak buta warna\nDisiplin dan bertanggung jawab'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      id: 'job-admin-' + Date.now(),
      title: jobData.title.toUpperCase(),
      company: jobData.company,
      companyCategory: jobData.companyCategory,
      logo: 'astra',
      logoColor: '#003b7a',
      location: jobData.location,
      type: jobData.type,
      salary: jobData.salary,
      education: jobData.education,
      deadline: jobData.deadline,
      openPositions: parseInt(jobData.openPositions) || 5,
      description: jobData.description,
      requirements: jobData.requirementsText.split('\n').map(r => r.trim()).filter(Boolean),
      responsibilities: [
        'Melaksanakan tugas operasional sesuai Standar Operasional Prosedur (SOP)',
        'Menerapkan keselamatan dan kesehatan kerja (K3)',
        'Menyusun laporan hasil kerja harian/mingguan'
      ],
      benefits: [
        'Gaji Pokok & Insentif Kinerja',
        'BPJS Kesehatan & Ketenagakerjaan',
        'Tunjangan Transportasi & Uang Makan',
        'Program Pelatihan & Sertifikasi Industri'
      ]
    };

    if (onJobPosted) onJobPosted(newJob);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 relative my-8 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0a192f] via-bkk-navy to-bkk-blue text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-400/30">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
            <p className="text-[11px] font-black text-orange-400 uppercase tracking-widest">
              Panel Administrator BKK
            </p>
          </div>
          <h3 className="text-xl font-black text-white font-display">
            Publikasikan Lowongan Kerja Baru
          </h3>
          <p className="text-xs text-slate-200 mt-1">
            Lowongan yang diinput akan langsung terbit dan dapat dilihat oleh seluruh siswa & alumni SMKN 1 Jakarta
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-black text-slate-900 font-display">
                Lowongan Berhasil Dipublikasikan!
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Lowongan <strong className="text-slate-800">{jobData.title}</strong> dari <strong className="text-slate-800">{jobData.company}</strong> telah resmi dipublikasikan di halaman Lowongan Kerja.
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-bkk-navy hover:bg-bkk-blue text-white font-bold text-xs uppercase transition-all shadow-md"
              >
                Selesai & Lihat Lowongan
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Judul Posisi Lowongan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: TEKNISI JARINGAN FIBER OPTIK"
                    value={jobData.title}
                    onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nama Perusahaan (PT/CV) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: PT Telekomunikasi Indonesia"
                    value={jobData.company}
                    onChange={(e) => setJobData({ ...jobData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tipe Pekerjaan *</label>
                  <select
                    value={jobData.type}
                    onChange={(e) => setJobData({ ...jobData, type: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Magang (Internship)">Magang</option>
                    <option value="Kontrak">Kontrak</option>
                    <option value="Part Time">Part Time</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Lokasi Penempatan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Jakarta Pusat / Cikarang"
                    value={jobData.location}
                    onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Batas Lamar *</label>
                  <input
                    type="text"
                    required
                    placeholder="30 Nov 2024"
                    value={jobData.deadline}
                    onChange={(e) => setJobData({ ...jobData, deadline: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Rentang Gaji / Uang Saku *</label>
                  <input
                    type="text"
                    required
                    placeholder="Rp 5.000.000 - Rp 6.500.000"
                    value={jobData.salary}
                    onChange={(e) => setJobData({ ...jobData, salary: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jumlah Formasi / Kuota *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    placeholder="10"
                    value={jobData.openPositions}
                    onChange={(e) => setJobData({ ...jobData, openPositions: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Kualifikasi Jurusan *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: SMK Teknik Mesin, TKJ, RPL, atau Akuntansi"
                  value={jobData.education}
                  onChange={(e) => setJobData({ ...jobData, education: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Deskripsi Singkat Pekerjaan *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Tuliskan gambaran ringkas tentang lingkup tugas pekerjaan..."
                  value={jobData.description}
                  onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Persyaratan & Kriteria Pelamar (1 baris per poin)</label>
                <textarea
                  rows={3}
                  value={jobData.requirementsText}
                  onChange={(e) => setJobData({ ...jobData, requirementsText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-[11px]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-bkk-orange hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-button-orange flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Terbitkan Lowongan Sekarang (Admin)</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
