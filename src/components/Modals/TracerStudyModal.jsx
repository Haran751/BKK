import React, { useState } from 'react';
import { X, PieChart, CheckCircle2, Award, Briefcase, GraduationCap, Store, Search, Send } from 'lucide-react';

export default function TracerStudyModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    nisn: '',
    graduationYear: '2024',
    major: 'Teknik Komputer & Jaringan (TKJ)',
    status: 'bekerja', // 'bekerja' | 'kuliah' | 'wirausaha' | 'mencari'
    workplaceName: 'PT Telkom Indonesia',
    position: 'Teknisi Jaringan Fiber Optik',
    salaryRange: 'Rp 5.000.000 - Rp 7.000.000',
    universityName: '',
    businessType: '',
    feedback: 'Layanan BKK sangat membantu saat pembekalan wawancara dan penyaluran tes kerja!'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
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
            Kuesioner Resmi Kemendikbudristek & Disdik
          </p>
          <h3 className="text-xl font-black text-white font-display mt-0.5">
            Tracer Study Alumni SMKN 1 Jakarta
          </h3>
          <p className="text-xs text-slate-200 mt-1">
            Pendataan keterserapan lulusan (Bekerja, Melanjutkan Kuliah, Wirausaha)
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
                Data Tracer Study Berhasil Disimpan!
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Terima kasih atas partisipasi Anda dalam membantu pemetaan mutu dan keterserapan lulusan SMK Negeri 1 Jakarta.
              </p>

              {/* Statistics Breakdown Indicator */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-3 mt-4">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Distribusi Keterserapan Alumni Angkatan 2024:
                </p>
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span>Bekerja di Industri / BUMN</span>
                      <span className="font-extrabold text-bkk-blue">73.5%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-bkk-blue h-full rounded-full" style={{ width: '73.5%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span>Melanjutkan Kuliah (PTN/PTS)</span>
                      <span className="font-extrabold text-emerald-600">14.2%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '14.2%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span>Wirausaha / Membuka Usaha</span>
                      <span className="font-extrabold text-orange-600">7.1%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full rounded-full" style={{ width: '7.1%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-bkk-navy hover:bg-bkk-blue text-white font-extrabold text-xs uppercase tracking-wider transition-all"
                >
                  Tutup
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nama Lengkap Alumni *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama alumni"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tahun Kelulusan *</label>
                  <select
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue bg-white"
                  >
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Jurusan di SMKN 1 Jakarta *</label>
                <select
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue bg-white"
                >
                  <option value="Teknik Komputer & Jaringan (TKJ)">Teknik Komputer & Jaringan (TKJ)</option>
                  <option value="Rekayasa Perangkat Lunak (RPL)">Rekayasa Perangkat Lunak (RPL)</option>
                  <option value="Teknik Kendaraan Ringan (TKRO)">Teknik Kendaraan Ringan (TKRO)</option>
                  <option value="Teknik Pemesinan (TPM)">Teknik Pemesinan (TPM)</option>
                  <option value="Teknik Ketenagalistrikan (TITL)">Teknik Ketenagalistrikan (TITL)</option>
                  <option value="Akuntansi & Keuangan Lembaga (AKL)">Akuntansi & Keuangan Lembaga (AKL)</option>
                  <option value="Otomatisasi Perkantoran (OTKP)">Otomatisasi Perkantoran (OTKP)</option>
                </select>
              </div>

              {/* Status BMW Selection */}
              <div>
                <label className="font-bold text-slate-700 block mb-2">Status Aktivitas Saat Ini (BMW) *</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: 'bekerja' })}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      formData.status === 'bekerja'
                        ? 'border-bkk-blue bg-blue-50/80 text-bkk-blue font-bold shadow-sm ring-1 ring-bkk-blue'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Briefcase className="w-4 h-4 text-bkk-blue shrink-0" />
                    <span>Bekerja di Industri / Kantor</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: 'kuliah' })}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      formData.status === 'kuliah'
                        ? 'border-emerald-600 bg-emerald-50/80 text-emerald-700 font-bold shadow-sm ring-1 ring-emerald-600'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Melanjutkan Kuliah (Studi)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: 'wirausaha' })}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      formData.status === 'wirausaha'
                        ? 'border-orange-500 bg-orange-50/80 text-orange-700 font-bold shadow-sm ring-1 ring-orange-500'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Store className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>Membuka Usaha / Wirausaha</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: 'mencari' })}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      formData.status === 'mencari'
                        ? 'border-slate-600 bg-slate-100 text-slate-900 font-bold shadow-sm ring-1 ring-slate-600'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Search className="w-4 h-4 text-slate-600 shrink-0" />
                    <span>Sedang Mencari Kerja</span>
                  </button>
                </div>
              </div>

              {formData.status === 'bekerja' && (
                <div className="p-3 bg-slate-50 rounded-2xl space-y-2.5 border border-slate-200">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Nama Perusahaan / Tempat Bekerja</label>
                    <input
                      type="text"
                      placeholder="Contoh: PT Telkom Indonesia Tbk"
                      value={formData.workplaceName}
                      onChange={(e) => setFormData({ ...formData, workplaceName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Posisi / Jabatan</label>
                    <input
                      type="text"
                      placeholder="Contoh: Junior Network Engineer"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 block mb-1">Saran / Masukan untuk BKK SMKN 1 Jakarta</label>
                <textarea
                  rows={2}
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue"
                  placeholder="Tulis saran..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-bkk-orange hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider shadow-button-orange flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Data Tracer Study</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
