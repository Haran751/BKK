import React from 'react';
import { X, Award, Target, CheckCircle2, Users, Building, ShieldCheck, Heart } from 'lucide-react';
import { schoolInfo } from '../../data/mockData';

export default function AboutBkkModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-bkk-navy to-bkk-blue text-white p-6 sm:p-8 rounded-t-3xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="px-3 py-1 rounded-full bg-bkk-orange text-white text-[10px] font-black uppercase">
            Profil Lembaga
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display mt-2 uppercase">
            BURSA KERJA KHUSUS (BKK)<br />SMK NEGERI 20 JAKARTA
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-1">
            Menghubungkan Potensi Kejuruan dengan Peluang Karir Nyata di Industri Global
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          {/* Tentang BKK */}
          <div>
            <h3 className="text-base font-black text-slate-900 uppercase tracking-tight font-display mb-2 flex items-center gap-2">
              <Building className="w-5 h-5 text-bkk-orange" />
              <span>Tentang BKK SMKN 20 Jakarta</span>
            </h3>
            <p className="text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 leading-relaxed">
              Bursa Kerja Khusus (BKK) SMK Negeri 20 Jakarta adalah unit kelembagaan resmi di bawah naungan Dinas Pendidikan DKI Jakarta dan Kementerian Ketenagakerjaan RI yang dibentuk sebagai wadah pelayanan informasi ketenagakerjaan, bimbingan karir, pembinaan kompetensi, serta penyaluran dan penempatan lulusan ke dunia usaha dan dunia industri (DUDI).
            </p>
          </div>

          {/* Visi & Misi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50/70 border border-blue-100 p-4 rounded-2xl">
              <h4 className="text-xs font-black text-bkk-navy uppercase tracking-wider mb-2 flex items-center gap-1.5 font-display">
                <Target className="w-4 h-4 text-bkk-blue" />
                <span>Visi BKK</span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Menjadi Bursa Kerja Khusus terdepan, terpercaya, dan berdaya saing global dalam mewujudkan keterserapan lulusan SMK yang kompeten, berkarakter unggul, dan siap berkontribusi di era industri 4.0.
              </p>
            </div>

            <div className="bg-orange-50/70 border border-orange-100 p-4 rounded-2xl">
              <h4 className="text-xs font-black text-orange-900 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-display">
                <Award className="w-4 h-4 text-bkk-orange" />
                <span>Misi Utama BKK</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-bkk-orange mt-1.5 shrink-0"></span>
                  <span>Memperluas jejaring kemitraan strategis dengan DUDI nasional dan internasional.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-bkk-orange mt-1.5 shrink-0"></span>
                  <span>Menyelenggarakan pelatihan soft skill, etika kerja, dan standarisasi rekrutmen.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-bkk-orange mt-1.5 shrink-0"></span>
                  <span>Melaksanakan tracer study akurat demi peningkatan mutu kurikulum kejuruan.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Struktur Pengurus */}
          <div>
            <h3 className="text-base font-black text-slate-900 uppercase tracking-tight font-display mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-bkk-orange" />
              <span>Struktur Pengelola BKK SMKN 20 Jakarta</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Penanggung Jawab</p>
                <p className="font-extrabold text-slate-900 text-xs mt-0.5">Kepala SMKN 20 Jakarta</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Ketua BKK</p>
                <p className="font-extrabold text-slate-900 text-xs mt-0.5">Drs. H. Hendra, M.Pd</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Koordinator Hubungan Industri</p>
                <p className="font-extrabold text-slate-900 text-xs mt-0.5">Rina Wahyuni, S.T, M.M</p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 sm:px-8 py-4 rounded-b-3xl flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-bkk-navy hover:bg-bkk-blue text-white font-extrabold text-xs uppercase"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
