import React, { useState } from 'react';
import { X, CheckCircle, Upload, ArrowRight, ArrowLeft, Send, AlertCircle } from 'lucide-react';
import CompanyLogo from '../CompanyLogo';
import { submitApplication } from '../../services/applicationService';

const MAJORS = [
  'AKUTANSI(AK)',
  'LAYANAN PERBANKAN SYARIAH(LPS)',
  'MANAJEMEN PERKANTORAN(MP)',
  'MANAJEMEN LOGISTIK(ML)',
  'BISNIS DIGITAL(BD)',
  'BISNIS RETAIL(BR)',
  'REKAYASA PERANGKAT LUNAK(RPL)'
];

export default function ApplyJobModal({ job, onClose, onSubmitSuccess }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [appCode, setAppCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    nisn: '',
    email: '',
    phone: '',
    graduationYear: '2024',
    major: MAJORS[0],
    gpa: '85.50',
    skills: '',
    cvFile: null,
    cvFileName: '',
    diplomaFile: null,
    diplomaFileName: '',
    coverLetter: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (type, file) => {
    if (!file) return;
    setFormData({ ...formData, [type]: file, [`${type}Name`]: file.name });
  };

  const handleNext = async (e) => {
    e.preventDefault();

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    const requiredFields = {
      fullName: formData.fullName.trim(),
      nisn: formData.nisn.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      gpa: formData.gpa.trim(),
      major: formData.major.trim(),
      cvFile: formData.cvFile,
      diplomaFile: formData.diplomaFile
    };

    if (!requiredFields.fullName || !requiredFields.nisn || !requiredFields.email || !requiredFields.phone || !requiredFields.gpa || !requiredFields.major || !requiredFields.cvFile || !requiredFields.diplomaFile) {
      alert('Harap lengkapi semua data wajib, termasuk NISN, email, WhatsApp, jurusan, dan upload CV serta Ijazah.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append('job_id', String(job?.id || ''));
      payload.append('name', formData.fullName);
      payload.append('nisn', formData.nisn);
      payload.append('whatsapp', formData.phone);
      payload.append('email', formData.email);
      payload.append('graduation_year', String(formData.graduationYear));
      payload.append('average_score', formData.gpa);
      payload.append('major', formData.major);
      payload.append('main_skill', formData.skills || '');
      payload.append('cover_message', formData.coverLetter || '');
      payload.append('cv', formData.cvFile);
      payload.append('diploma', formData.diplomaFile);

      const response = await submitApplication(payload);
      const randomCode = response?.data?.data?.id ? `BKK-${response.data.data.id}` : 'BKK-' + Math.floor(100000 + Math.random() * 900000);
      setAppCode(randomCode);

      const companyName = job.company?.name || (typeof job.company === 'string' ? job.company : '') || 'Mitra Industri BKK';
      const applicationRecord = {
        id: randomCode,
        jobId: job.id,
        jobTitle: job.title,
        company: companyName,
        applicantName: formData.fullName,
        nisn: formData.nisn,
        email: formData.email,
        major: formData.major,
        appliedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        status: 'baru',
        timeline: [
          { status: 'Lamaran Terkirim', date: 'Hari ini', done: true },
          { status: 'Seleksi Administrasi', date: 'Sedang Berlangsung', done: false },
          { status: 'Tes Psikotes / Wawancara', date: 'Menunggu', done: false },
          { status: 'Keputusan Final', date: 'Menunggu', done: false }
        ]
      };

      setSubmitted(true);
      if (onSubmitSuccess) onSubmitSuccess(applicationRecord);
    } catch (error) {
      console.error('APPLICATION SUBMIT ERROR:', error);
      const message = error?.response?.data?.message || error?.message || 'Gagal mengirim lamaran';
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const compName = job.company?.name || (typeof job.company === 'string' ? job.company : '') || 'Mitra Industri BKK';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 relative my-8 overflow-hidden">
        
        {/* Top Gradient Header */}
        <div className="bg-gradient-to-r from-bkk-navy to-bkk-blue text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
              <CompanyLogo name={job.logo || job.company?.logo || compName} className="max-h-7" />
            </div>
            <div>
              <p className="text-[11px] font-extrabold text-orange-400 uppercase tracking-widest">
                Formulir Lamaran Kerja Online
              </p>
              <h3 className="text-base sm:text-lg font-black text-white leading-tight font-display">
                {job.title}
              </h3>
              <p className="text-xs text-slate-200">{compName}</p>
            </div>
          </div>

          {/* Stepper Progress */}
          {!submitted && (
            <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] font-bold text-slate-300">
              <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-orange-400 font-extrabold' : ''}`}>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">1</span>
                <span>Data Pribadi</span>
              </div>
              <div className="w-8 h-0.5 bg-white/20"></div>
              <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-orange-400 font-extrabold' : ''}`}>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">2</span>
                <span>Pendidikan</span>
              </div>
              <div className="w-8 h-0.5 bg-white/20"></div>
              <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-orange-400 font-extrabold' : ''}`}>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">3</span>
                <span>Upload Dokumen</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {submitted ? (
            /* Success View */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wide">
                  Lamaran Berhasil Dikirim!
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2 font-display">
                  Terima Kasih, {formData.fullName || 'Pelamar'}!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                  Berkas lamaran Anda untuk posisi <strong className="text-slate-800">{job.title}</strong> di <strong className="text-slate-800">{compName}</strong> telah resmi diterima oleh sistem BKK SMKN 20 Jakarta.
                </p>
              </div>

              {/* Application Code Box */}
              <div className="bg-slate-50 border-2 border-dashed border-bkk-blue/30 rounded-2xl p-4 max-w-sm mx-auto text-center">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Kode Tracking Lamaran Anda:
                </p>
                <div className="text-xl font-mono font-black text-bkk-blue tracking-widest mt-1">
                  {appCode}
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Simpan kode ini untuk memantau proses seleksi di menu "Cek Lamaran".
                </p>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-bkk-navy hover:bg-bkk-blue text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  Selesai & Tutup
                </button>
              </div>
            </div>
          ) : (
            /* Form Steps */
            <form onSubmit={handleNext} className="space-y-4 text-xs">
              {step === 1 && (
                <div className="space-y-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Nama Lengkap Sesuai Ijazah *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Contoh: Ahmad Rizky Pratama"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">NISN *</label>
                      <input
                        type="text"
                        name="nisn"
                        required
                        placeholder="Masukkan NISN"
                        value={formData.nisn}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue transition-all"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Nomor WhatsApp Aktif *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="Contoh: 081234567890"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Email Aktif *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Contoh: ahmad.rizky@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue transition-all"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Tahun Lulus SMKN 20 *</label>
                      <select
                        name="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue transition-all bg-white"
                      >
                        <option value="2025">2025 (Siswa Tingkat Akhir)</option>
                        <option value="2024">2024 (Fresh Graduate)</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="lainnya">Alumni Angkatan Lain</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Nilai Rata-rata Raport / Ujikom</label>
                      <input
                        type="text"
                        name="gpa"
                        placeholder="Contoh: 86.50"
                        value={formData.gpa}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Jurusan / Program Keahlian *</label>
                    <select
                      name="major"
                      value={formData.major}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue transition-all bg-white"
                    >
                      {MAJORS.map((major) => (
                        <option key={major} value={major}>{major}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Keahlian Utama / Sertifikasi</label>
                    <input
                      type="text"
                      name="skills"
                      placeholder="Contoh: Servis Mesin, PLC, AutoCAD, Sertifikat BNSP"
                      value={formData.skills}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue transition-all"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  {/* File Upload Box */}
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Upload Curriculum Vitae (CV) *</label>
                    <div className="border-2 border-dashed border-slate-300 hover:border-bkk-blue rounded-2xl p-4 text-center bg-slate-50 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-bkk-blue mx-auto mb-1.5" />
                      <p className="font-bold text-slate-800">{formData.cvFileName || 'Klik untuk pilih file CV'}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Format PDF, DOC, DOCX (Maksimal 5MB)</p>
                      <input
                        type="file"
                        className="hidden"
                        id="cv-upload"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange('cvFile', e.target.files?.[0])}
                      />
                      <label htmlFor="cv-upload" className="inline-block mt-2 px-3 py-1 bg-white border border-slate-300 rounded-lg text-[11px] font-bold text-slate-700 hover:bg-slate-100 cursor-pointer">
                        Pilih File CV
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Upload Ijazah / SKL *</label>
                    <div className="border-2 border-dashed border-slate-300 hover:border-bkk-blue rounded-2xl p-4 text-center bg-slate-50 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-bkk-blue mx-auto mb-1.5" />
                      <p className="font-bold text-slate-800">{formData.diplomaFileName || 'Klik untuk pilih file ijazah'}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Format PDF, JPG, JPEG, PNG</p>
                      <input
                        type="file"
                        className="hidden"
                        id="diploma-upload"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange('diplomaFile', e.target.files?.[0])}
                      />
                      <label htmlFor="diploma-upload" className="inline-block mt-2 px-3 py-1 bg-white border border-slate-300 rounded-lg text-[11px] font-bold text-slate-700 hover:bg-slate-100 cursor-pointer">
                        Pilih File Ijazah
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Pesan Pengantar / Catatan Singkat</label>
                    <textarea
                      rows={2}
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue text-xs"
                      placeholder="Tuliskan motivasi singkat Anda melamar di posisi ini..."
                    />
                  </div>

                  <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 text-[11px] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>Pastikan data yang diisi telah valid. BKK tidak memungut biaya apapun!</span>
                  </div>
                </div>
              )}

              {/* Form Navigation Controls */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-50 transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Kembali</span>
                  </button>
                ) : (
                  <div></div>
                )}

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-bkk-orange hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider shadow-button-orange flex items-center gap-1.5 transition-all disabled:opacity-60"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? 'Mengirim...' : step === 3 ? 'Kirim Lamaran Sekarang' : 'Lanjut ke Langkah Berikutnya'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
