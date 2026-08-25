import React, { useState } from 'react';
import { X, Lock, Mail, ShieldCheck, Sparkles, Key, AlertCircle } from 'lucide-react';

export default function AuthModal({ onClose, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Harap masukkan email/username dan password administrator.');
      return;
    }

    const userObj = {
      name: formData.email.includes('@') ? formData.email.split('@')[0] : 'Administrator BKK',
      email: formData.email,
      role: 'Administrator BKK'
    };
    if (onLoginSuccess) onLoginSuccess(userObj);
  };

  const handleDemoAdminLogin = () => {
    const userObj = {
      name: 'Drs. H. Hendra, M.Pd (Ketua BKK)',
      email: 'admin.bkk@smkn1jakarta.sch.id',
      role: 'Administrator BKK'
    };
    if (onLoginSuccess) onLoginSuccess(userObj);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 relative my-8 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0a192f] via-bkk-navy to-bkk-blue text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-400/30">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <p className="text-[11px] font-black text-orange-400 uppercase tracking-widest">
              Portal Khusus Administrator
            </p>
          </div>
          <h3 className="text-xl font-black text-white font-display">
            Login Pengelola BKK
          </h3>
          <p className="text-xs text-slate-200 mt-1">
            Masuk untuk mempublikasikan lowongan kerja baru dan mengelola data BKK SMKN 1 Jakarta
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6">
          
          {/* Quick Demo Button for easy testing */}
          <div className="mb-5 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-slate-800">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Akses Cepat (Demo Testing):</span>
              </div>
              <span className="text-[10px] text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded-full font-bold">
                1-Klik
              </span>
            </div>
            <button
              type="button"
              onClick={handleDemoAdminLogin}
              className="w-full py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Masuk sebagai Administrator BKK (Demo)</span>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Email / Username Administrator *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="admin.bkk@smkn1jakarta.sch.id"
                  value={formData.email}
                  onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setError(''); }}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue text-xs"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Kata Sandi (Password) *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => { setFormData({ ...formData, password: e.target.value }); setError(''); }}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue text-xs"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#133e75] hover:bg-[#0c2b53] text-white font-extrabold text-xs uppercase tracking-wider shadow-button-blue transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Masuk sebagai Administrator</span>
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p className="text-[11px] text-slate-400">
              Halaman ini terproteksi khusus untuk dewan pengelola BKK SMKN 1 Jakarta.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
