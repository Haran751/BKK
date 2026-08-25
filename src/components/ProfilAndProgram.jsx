import React from 'react';
import { Presentation, Users, Briefcase, ChevronRight, CheckCircle, Info, Sparkles } from 'lucide-react';
import { bkkPrograms } from '../data/mockData';

export default function ProfilAndProgram({
  onOpenAboutModal,
  onOpenCounselingModal,
  onOpenProgramModal
}) {
  return (
    <section id="profil" className="py-12 md:py-16 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: PROFIL BKK */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl sm:text-2xl font-black text-bkk-navy uppercase tracking-tight font-display flex items-center gap-2">
                <span>PROFIL BKK</span>
              </h2>
              <div className="w-12 h-1 bg-bkk-orange rounded-full mt-1.5"></div>
            </div>

            {/* Profile Card matching Mockup */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-card border border-slate-100 flex-1 flex flex-col justify-between hover:shadow-card-hover transition-all group">
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center mb-4">
                  
                  {/* Student image thumbnail */}
                  <div className="sm:col-span-5 relative rounded-xl overflow-hidden shadow-sm aspect-[4/3] sm:aspect-square bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80"
                      alt="Profil BKK SMKN 1 Jakarta"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-bkk-navy/80 backdrop-blur-sm text-[10px] font-bold text-white uppercase">
                      BKK Resmi
                    </div>
                  </div>

                  {/* Title & snippet */}
                  <div className="sm:col-span-7">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase leading-snug tracking-tight font-display">
                      MENGENAL BKK KAMI
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-4">
                      Bursa Kerja Khusus (BKK) SMK Negeri 1 Jakarta adalah lembaga yang dibentuk untuk memberikan pelayanan informasi pasar kerja, bimbingan kejuruan, penyaluran dan penempatan tenaga kerja bagi alumni ke dunia usaha & industri.
                    </p>
                  </div>
                </div>

                {/* Key Points */}
                <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Terakreditasi A BAN-SM</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Layanan 100% Gratis</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>160+ Kemitraan DUDI</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Tracer Study Terpadu</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3">
                <button
                  onClick={onOpenAboutModal}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-bkk-sky text-bkk-blue hover:text-bkk-navy font-bold text-xs sm:text-sm border border-slate-200 hover:border-bkk-blue/30 transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <Info className="w-4 h-4 text-bkk-orange" />
                  <span>Pelajari Selengkapnya Tentang BKK</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: PROGRAM UNGGULAN */}
          <div id="program" className="lg:col-span-7 flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl sm:text-2xl font-black text-bkk-navy uppercase tracking-tight font-display">
                PROGRAM UNGGULAN
              </h2>
              <div className="w-12 h-1 bg-bkk-orange rounded-full mt-1.5"></div>
            </div>

            {/* 3 Cards Grid matching Mockup */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
              
              {/* Card 1: PELATIHAN KERJA */}
              <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100 flex flex-col items-center text-center justify-between hover:shadow-card-hover hover:-translate-y-1 transition-all group">
                <div className="flex flex-col items-center">
                  {/* Circular Orange Icon Container */}
                  <div className="w-16 h-16 rounded-2xl bg-orange-50 border-2 border-orange-200 text-bkk-orange flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-bkk-orange group-hover:text-white transition-all shadow-sm">
                    <Presentation className="w-8 h-8 stroke-[2]" />
                  </div>

                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight font-display mb-2">
                    PELATIHAN KERJA
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pelatihan soft skill, persiapan psikotes, simulasi interview, dan standarisasi kompetensi industri.
                  </p>
                </div>

                <button
                  onClick={() => onOpenProgramModal('pelatihan')}
                  className="mt-4 text-xs font-bold text-bkk-orange hover:text-bkk-orangeHover inline-flex items-center gap-1 group-hover:underline"
                >
                  <span>Detail Program</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card 2: KONSELING KARIR */}
              <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100 flex flex-col items-center text-center justify-between hover:shadow-card-hover hover:-translate-y-1 transition-all group">
                <div className="flex flex-col items-center">
                  {/* Circular Orange Icon Container */}
                  <div className="w-16 h-16 rounded-2xl bg-orange-50 border-2 border-orange-200 text-bkk-orange flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-bkk-orange group-hover:text-white transition-all shadow-sm">
                    <Users className="w-8 h-8 stroke-[2]" />
                  </div>

                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight font-display mb-2">
                    KONSELING KARIR
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Bimbingan karir manajemen bakat, konsultasi karir personal, dan persiapan peminatan industri.
                  </p>
                </div>

                <button
                  onClick={onOpenCounselingModal}
                  className="mt-4 text-xs font-bold text-bkk-orange hover:text-bkk-orangeHover inline-flex items-center gap-1 group-hover:underline"
                >
                  <span>Konsultasi Sekarang</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card 3: PEMAGANGAN */}
              <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100 flex flex-col items-center text-center justify-between hover:shadow-card-hover hover:-translate-y-1 transition-all group">
                <div className="flex flex-col items-center">
                  {/* Circular Orange Icon Container */}
                  <div className="w-16 h-16 rounded-2xl bg-orange-50 border-2 border-orange-200 text-bkk-orange flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-bkk-orange group-hover:text-white transition-all shadow-sm">
                    <Briefcase className="w-8 h-8 stroke-[2]" />
                  </div>

                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight font-display mb-2">
                    PEMAGANGAN
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pendampingan pemagangan bersertifikat industri dan penempatan kerja sebelum lulus.
                  </p>
                </div>

                <button
                  onClick={() => onOpenProgramModal('pemagangan')}
                  className="mt-4 text-xs font-bold text-bkk-orange hover:text-bkk-orangeHover inline-flex items-center gap-1 group-hover:underline"
                >
                  <span>Daftar Magang</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
