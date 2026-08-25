import React, { useState } from 'react';
import { Image as ImageIcon, ZoomIn, Calendar, MapPin } from 'lucide-react';
import { galleryEvents } from '../data/mockData';

export default function GaleriKegiatan({ onOpenLightbox }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'Semua Foto' },
    { id: 'Kunjungan Industri', label: 'Kunjungan Industri' },
    { id: 'Pelatihan Soft Skill', label: 'Pelatihan Kerja' },
    { id: 'Job Fair & Rekrutmen', label: 'Job Fair & Campus Hiring' }
  ];

  const filteredGallery = activeFilter === 'all'
    ? galleryEvents
    : galleryEvents.filter(item => item.category === activeFilter);

  return (
    <section id="galeri" className="py-12 md:py-16 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-bkk-navy uppercase tracking-tight font-display">
              GALERI KEGIATAN
            </h2>
            <div className="w-12 h-1 bg-bkk-orange rounded-full mt-1.5"></div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Dokumentasi aktivitas pelatihan, kunjungan industri, dan seleksi kerja
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeFilter === f.id
                    ? 'bg-bkk-navy text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8 Photo Grid matching Mockup (4 cols x 2 rows) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item)}
              className="bg-white rounded-2xl overflow-hidden shadow-card border border-slate-100 hover:shadow-card-hover group cursor-pointer transition-all flex flex-col justify-between transform hover:-translate-y-1"
            >
              {/* Photo Container with overlay */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Hover zoom overlay */}
                <div className="absolute inset-0 bg-bkk-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <div className="w-9 h-9 rounded-full bg-white/90 text-bkk-navy flex items-center justify-center shadow-lg">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>

                {/* Category tag */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[9px] font-bold text-white uppercase">
                  {item.category}
                </div>
              </div>

              {/* Caption underneath matching Mockup */}
              <div className="p-3 sm:p-3.5 text-center">
                <h3 className="text-xs sm:text-xs font-extrabold text-slate-800 tracking-tight leading-snug line-clamp-1 group-hover:text-bkk-blue transition-colors font-sans">
                  {item.title}
                </h3>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                  {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
