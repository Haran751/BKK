import React, { useState } from 'react';
import { X, Building2, PlusCircle, CheckCircle2, DollarSign, MapPin, Send } from 'lucide-react';

export default function PostJobModal({ onClose, onJobPosted }) {
  const [submitted, setSubmitted] = useState(false);
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    companyCategory: 'Manufaktur & Otomotif',
    location: 'Jakarta',
    type: 'Full Time',
    salary: 'Rp 5.000.000 - Rp 6.500.000',
    education: 'SMK Teknik Mesin / Otomotif / TKJ',
    deadline: '30 November 2024',
    openPositions: 10,
    description: '',
    requirementsText: 'Lulusan SMK relevan\nUsia maks. 23 tahun\nSehat jasmani dan rohani'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      id: 'job-custom-' + Date.now(),
      title: jobData.title,
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
      requirements: jobData.requirementsText.split('\n').filter(Boolean),
      responsibilities: ['Melaksanakan pekerjaan sesuai SOP teknis', 'Menjaga standar kualitas dan keselamatan K3'],
      benefits: ['Gaji Pokok Kompetitif', 'BPJS Kesehatan & Ketenagakerjaan', 'Tunjangan Transport & Makan']
    };

    if (onJobPosted) onJobPosted(newJob);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 relative my-8 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-bkk-navy to-bkk-blue text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <p className="text-[11px] font-extrabold text-orange-400 uppercase tracking-widest">
            Portal Mitra Industri (DUDI)
          </p>
          <h3 className="text-xl font-black text-white font-display mt-0.5">
            Pasang Lowongan Kerja Baru
          </h3>
          <p className="text-xs text-slate-200 mt-1">
            Publikasikan lowongan kerja atau magang khusus siswa & alumni SMKN 1 Jakarta
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
                Lowongan Berhasil Diajukan!
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Terima kasih. Tim BKK SMKN 1 Jakarta akan meninjau dan memverifikasi lowongan ini dalam 1x24 jam kerja sebelum dipublikasikan ke siswa & alumni.
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-bkk-navy text-white font-bold text-xs uppercase"
              >
                Selesai
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Judul Posisi Lowongan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: OPERATOR PRODUKSI - PT ..."
                    value={jobData.title}
                    onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nama Perusahaan (PT/CV) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama perusahaan"
                    value={jobData.company}
                    onChange={(e) => setJobData({ ...jobData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tipe Pekerjaan *</label>
                  <select
                    value={jobData.type}
                    onChange={(e) => setJobData({ ...jobData, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Magang (Internship)">Magang</option>
                    <option value="Kontrak">Kontrak 1 Thn</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Lokasi Penempatan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Jakarta / Cikarang"
                    value={jobData.location}
                    onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
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
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
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
                  placeholder="Tuliskan uraian tanggung jawab dan profil pekerjaan..."
                  value={jobData.description}
                  onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Persyaratan & Kriteria Pelamar (1 baris per poin)</label>
                <textarea
                  rows={3}
                  value={jobData.requirementsText}
                  onChange={(e) => setJobData({ ...jobData, requirementsText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-bkk-orange hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-button-orange flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Formulir Lowongan Kerja</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
