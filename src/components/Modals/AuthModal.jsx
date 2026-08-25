import React, { useState } from 'react';
import { X, User, Lock, Mail, Building, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Key } from 'lucide-react';

export default function AuthModal({ onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('siswa'); // 'siswa' | 'perusahaan' | 'admin'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    nisnOrNip: '',
    companyName: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const userObj = {
      name: formData.name || (role === 'siswa' ? 'Ahmad Rizky Pratama' : role === 'perusahaan' ? 'HRD PT Astra International' : 'Admin BKK SMKN 1'),
      email: formData.email || (role === 'siswa' ? 'siswa@smkn1jakarta.sch.id' : role === 'perusahaan' ? 'hrd@astra.co.id' : 'admin.bkk@smkn1jakarta.sch.id'),
      role: role === 'siswa' ? 'Alumni / Siswa' : role === 'perusahaan' ? 'Mitra Industri' : 'Administrator BKK'
    };
    if (onLoginSuccess) onLoginSuccess(userObj);
  };

  const handleDemoLogin = (demoRole) => {
    let userObj;
    if (demoRole === 'siswa') {
      userObj = {
        name: 'Ahmad Rizky Pratama (Alumni TKJ)',
        email: 'ahmad.rizky@gmail.com',
        role: 'Alumni / Siswa'
      };
    } else if (demoRole === 'perusahaan') {
      userObj = {
        name: 'HRD PT Astra International Tbk',
        email: 'recruitment@astra.co.id',
        role: 'Mitra Industri'
      };
    } else {
      userObj = {
        name: 'Drs. H. Hendra, M.Pd (Ketua BKK)',
        email: 'admin.bkk@smkn1jakarta.sch.id',
        role: 'Administrator BKK'
      };
    }
    if (onLoginSuccess) onLoginSuccess(userObj);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 relative my-8 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-bkk-navy to-bkk-blue text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <p className="text-[11px] font-extrabold text-orange-400 uppercase tracking-widest">
            Portal Layanan BKK SMKN 1
          </p>
          <h3 className="text-xl font-black text-white font-display mt-0.5">
            {isLogin ? 'Masuk ke Akun Anda' : 'Buat Akun Baru'}
          </h3>
          <p className="text-xs text-slate-200 mt-1">
            Akses lowongan kerja, campus hiring, dan tracer study
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
            Pilih Jenis Pengguna:
          </p>
          <div className="grid grid-cols-3 gap-1.5 bg-slate-200/70 p-1 rounded-xl">
            <button
              onClick={() => setRole('siswa')}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all truncate ${
                role === 'siswa' ? 'bg-white text-bkk-navy shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Siswa/Alumni
            </button>
            <button
              onClick={() => setRole('perusahaan')}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all truncate ${
                role === 'perusahaan' ? 'bg-white text-bkk-navy shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Perusahaan
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all truncate ${
                role === 'admin' ? 'bg-white text-bkk-navy shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Admin BKK
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          
          {/* 1-Click Demo Login Banner */}
          <div className="mb-5 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-800 mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Akses Cepat (Demo Testing):</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => handleDemoLogin('siswa')}
                className="py-1 px-1.5 rounded-lg bg-white border border-amber-300 text-[10px] font-bold text-amber-900 hover:bg-amber-100 transition-colors truncate"
              >
                Demo Siswa
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('perusahaan')}
                className="py-1 px-1.5 rounded-lg bg-white border border-amber-300 text-[10px] font-bold text-amber-900 hover:bg-amber-100 transition-colors truncate"
              >
                Demo HRD
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="py-1 px-1.5 rounded-lg bg-white border border-amber-300 text-[10px] font-bold text-amber-900 hover:bg-amber-100 transition-colors truncate"
              >
                Demo Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            {!isLogin && (
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Lengkap *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Nama lengkap Anda"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue text-xs"
                  />
                </div>
              </div>
            )}

            {role === 'perusahaan' && !isLogin && (
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Perusahaan / PT *</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: PT Astra International Tbk"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue text-xs"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="font-bold text-slate-700 block mb-1">Email / Username *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder={role === 'siswa' ? 'nisn@smkn1jakarta.sch.id' : 'email@perusahaan.com'}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue text-xs"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Kata Sandi (Password) *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue text-xs"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-bkk-navy hover:bg-bkk-blue text-white font-extrabold text-xs uppercase tracking-wider shadow-button-blue transition-all"
              >
                {isLogin ? `Masuk sebagai ${role === 'siswa' ? 'Siswa' : role === 'perusahaan' ? 'Perusahaan' : 'Admin'}` : 'Daftar Akun Sekarang'}
              </button>
            </div>
          </form>

          {/* Toggle between Login and Register */}
          <div className="mt-5 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            {isLogin ? (
              <p>
                Belum memiliki akun?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-bkk-orange font-bold hover:underline"
                >
                  Daftar Akun BKK
                </button>
              </p>
            ) : (
              <p>
                Sudah memiliki akun?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-bkk-blue font-bold hover:underline"
                >
                  Masuk di sini
                </button>
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
