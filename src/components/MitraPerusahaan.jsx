import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Handshake, Building2, Users, ExternalLink } from 'lucide-react';
import CompanyLogo from './CompanyLogo';

export default function MitraPerusahaan({ companies = [], onSelectPartner }) {
  const scrollRef = useRef(null);
  const [selectedPartnerModal, setSelectedPartnerModal] = useState(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handlePartnerClick = (partner) => {
    setSelectedPartnerModal(partner);
    if (onSelectPartner) onSelectPartner(partner);
  };

  return (
    <section id="mitra" className="py-12 md:py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Left/Right Controls */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-bkk-navy uppercase tracking-tight font-display">
              MITRA PERUSAHAAN
            </h2>
            <div className="w-12 h-1 bg-bkk-orange rounded-full mt-1.5"></div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Bekerja sama dengan 160+ industri skala nasional & multinasional terpercaya
            </p>
          </div>

          {/* Carousel Arrow Controls matching Mockup */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-bkk-navy hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-bkk-navy hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Logos Carousel Row */}
        <div
          ref={scrollRef}
          className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth"
        >
          {companies.map((partner) => (
            <div
              key={partner.id}
              onClick={() => handlePartnerClick(partner)}
              className="min-w-[170px] sm:min-w-[200px] h-24 bg-white rounded-2xl border border-slate-200 hover:border-bkk-blue/40 shadow-sm hover:shadow-card-hover p-4 flex flex-col items-center justify-center cursor-pointer transition-all group shrink-0 transform hover:-translate-y-1"
              title={`Klik untuk melihat profil kemitraan ${partner.name}`}
            >
              <CompanyLogo name={partner} className="max-h-10 max-w-[130px]" />
              <span className="text-[10px] font-bold text-slate-400 mt-1 group-hover:text-bkk-blue transition-colors">
                {partner.industry || 'Mitra industri'}
              </span>
            </div>
          ))}
        </div>

        {/* Infinite subtle marquee underneath */}
        <div className="mt-8 pt-6 border-t border-slate-100 overflow-hidden relative">
          <div className="flex items-center gap-8 animate-marquee whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity">
            {companies.concat(companies).map((p, idx) => (
              <div key={idx} className="inline-flex items-center gap-2 text-xs font-bold text-slate-500">
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                <span>{p.name}</span>
                <span className="text-[10px] text-slate-400">Mitra aktif</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Partner Detail Quick Modal */}
      {selectedPartnerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setSelectedPartnerModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
            >
              ✕
            </button>

            <div className="text-center pt-2">
              <div className="w-24 h-14 bg-slate-50 border border-slate-200 rounded-2xl mx-auto flex items-center justify-center p-2 mb-3">
                <CompanyLogo name={selectedPartnerModal} className="max-h-9" />
              </div>
              <h3 className="text-lg font-black text-slate-900 font-display">
                {selectedPartnerModal.fullName || selectedPartnerModal.name || 'Perusahaan Mitra'}
              </h3>
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-bkk-blue text-xs font-bold mt-1">
                {selectedPartnerModal.sector || selectedPartnerModal.industry || 'Mitra industri'}
              </span>
            </div>

            <div className="mt-6 space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Status Kerjasama:</span>
                <span className="font-extrabold text-emerald-600">{selectedPartnerModal.badge}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Periode MoU:</span>
                <span className="font-bold text-slate-800">{selectedPartnerModal.mouYear}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Total Alumni Terserap:</span>
                <span className="font-extrabold text-bkk-blue text-sm">{selectedPartnerModal.alumniHired}+ Lulusan</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setSelectedPartnerModal(null)}
                className="w-full py-2.5 rounded-xl bg-bkk-navy hover:bg-bkk-blue text-white text-xs font-bold uppercase transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
