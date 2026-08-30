import React from 'react';
import { Calendar, MapPin, Users, Ticket, ArrowRight, Sparkles, Building, CheckCircle2 } from 'lucide-react';
import CompanyLogo from './CompanyLogo';

export default function KegiatanRekrutmen({ onOpenEventModal }) {
  return (
    <section id="rekrutmen" className="py-12 md:py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-bkk-navy uppercase tracking-tight font-display">
            KEGIATAN REKRUTMEN
          </h2>
          <div className="w-12 h-1 bg-bkk-orange rounded-full mt-1.5"></div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Agenda bursa kerja, campus hiring, dan walk-in interview terdekat di SMKN 20 Jakarta
          </p>
        </div>

        {/* 2 Big Banner Cards matching Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* BANNER 1: JOB FAIR 2024 (Left Wide Banner) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-[#102d5e] via-[#163e7e] to-[#1e52a4] text-white p-6 sm:p-8 relative flex flex-col justify-between group hover:shadow-2xl transition-all">
            
            {/* Background Decorative Circles & Shapes */}
            <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-orange-500/20 to-transparent pointer-events-none"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl"></div>

            <div>
              {/* Header inside card: Logo + School badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/20 p-1 flex items-center justify-center">
                    <Building className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-slate-200">
                    BKK SMKN 20 JAKARTA
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-bkk-orange text-white text-[11px] font-black uppercase tracking-wider animate-pulse">
                  Event Akbar
                </span>
              </div>

              {/* Title & Content */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-7">
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-display uppercase leading-tight">
                    JOB FAIR<br />
                    <span className="text-orange-400">2024</span>
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    Bursa Kerja Terbuka untuk Umum & Alumni. Hadirkan 45+ Perusahaan Multinasional dengan 1.200+ Lowongan Kerja!
                  </p>

                  {/* Info Pills */}
                  <div className="mt-4 space-y-2 text-xs font-semibold text-slate-100">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 w-fit">
                      <Calendar className="w-4 h-4 text-orange-400 shrink-0" />
                      <span>22 - 24 Oktober 2024 (08.00 - 15.30 WIB)</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 w-fit">
                      <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                      <span>Tempat: SMKN 20 Jakarta Pusat</span>
                    </div>
                  </div>
                </div>

                {/* Right Image Cutout Container */}
                <div className="sm:col-span-5 relative mt-4 sm:mt-0 flex justify-center">
                  <div className="w-full max-w-[200px] sm:max-w-none rounded-2xl overflow-hidden border-2 border-white/30 shadow-lg aspect-[4/3] sm:aspect-square">
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
                      alt="Job Fair SMKN 20 Jakarta"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Button */}
            <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Gratis / Tanpa Dipungut Biaya</span>
              </div>

              <button
                onClick={() => onOpenEventModal('job-fair-2024')}
                className="px-5 py-2.5 rounded-xl bg-bkk-orange hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-button-orange flex items-center gap-2 group/btn transition-all"
              >
                <Ticket className="w-4 h-4" />
                <span>Daftar Tiket Masuk Gratis</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* BANNER 2: CAMPUS HIRING (Right Banner) */}
          <div className="lg:col-span-5 rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-[#0c244c] via-[#12366c] to-[#184484] text-white p-6 sm:p-8 relative flex flex-col justify-between group hover:shadow-2xl transition-all">
            
            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>

            <div>
              {/* Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30 text-[10px] font-extrabold uppercase tracking-wider">
                  Walk-In Recruitment
                </span>
                <span className="text-xs font-semibold text-slate-300">Batch IV - 2024</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display uppercase">
                CAMPUS <span className="text-orange-400">HIRING</span>
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                Rekrutmen dan seleksi tes langsung di sekolah oleh mitra industri terkemuka khusus siswa & alumni SMKN 1.
              </p>

              {/* Company Logo Badges Box */}
              <div className="mt-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-inner text-slate-800">
                <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2 text-center">
                  Mitra Industri Pekan Ini:
                </p>
                <div className="flex flex-wrap items-center justify-around gap-3 pt-1">
                  <div className="flex items-center gap-1 font-bold text-slate-800 text-xs">
                    <CompanyLogo name="astra" className="h-6" />
                  </div>
                  <div className="flex items-center gap-1 font-bold text-slate-800 text-xs">
                    <CompanyLogo name="telkom" className="h-6" />
                  </div>
                  <div className="flex items-center gap-1 font-bold text-slate-800 text-xs">
                    <CompanyLogo name="indofood" className="h-6" />
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-200 font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  <span>Psikotes On-The-Spot</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  <span>Wawancara User Langsung</span>
                </div>
              </div>
            </div>

            {/* Bottom Action Button */}
            <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-300 font-medium">Kuota Terbatas 150 Peserta</span>
              
              <button
                onClick={() => onOpenEventModal('campus-hiring-astral-telkom')}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-bkk-navy font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-2 group/btn transition-all"
              >
                <span>Lihat Jadwal Seleksi</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform text-bkk-orange" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
