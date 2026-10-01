import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Flame } from 'lucide-react';
import { heroSlides } from '../data/mockData';

export default function Hero({ 
  onOpenJobSection, 
  onOpenJobFairModal,
  onOpenCampusHiringModal,
  onOpenCounselingModal,
  onOpenAboutModal,
  onOpenPartnersSection,
  onOpenEventsSection
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentSlide((index) => (index + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const copy = heroSlides[0];

  const handleNextSlide = () => {
    setCurrentSlide((index) => (index + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((index) => (index - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleAction = (actionType) => {
    switch (actionType) {
      case 'jobs':
        if (onOpenJobSection) onOpenJobSection();
        break;
      case 'jobfair':
        if (onOpenJobFairModal) onOpenJobFairModal();
        break;
      case 'campushiring':
        if (onOpenCampusHiringModal) onOpenCampusHiringModal();
        break;
      case 'counseling':
        if (onOpenCounselingModal) onOpenCounselingModal();
        break;
      case 'about':
        if (onOpenAboutModal) onOpenAboutModal();
        break;
      case 'partners':
        if (onOpenPartnersSection) onOpenPartnersSection();
        break;
      case 'events':
        if (onOpenEventsSection) onOpenEventsSection();
        break;
      default:
        if (onOpenJobSection) onOpenJobSection();
    }
  };

  return (
    <section
      id="beranda"
      className="relative flex items-center overflow-hidden bg-bkk-navy text-white min-h-[640px] md:min-h-[700px]"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >

      {/* Background Photo Slideshow */}
      <div className="absolute inset-0">
        {heroSlides.map((item, idx) => (
          <img
            key={item.id || idx}
            src={item.image}
            alt=""
            aria-hidden="true"
            className={`hero-bg-img absolute inset-0 w-full h-full object-cover ${idx === currentSlide ? 'active' : ''}`}
          />
        ))}

        {/* Contrast Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061729]/95 via-[#0b2550]/85 to-[#123e7e]/55"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#061729] via-[#061729]/25 to-transparent"></div>
      </div>

      {/* Decorative Background Geometry & Waves */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 560" preserveAspectRatio="none">
          <path fill="#ffffff" fillOpacity="0.05" d="M0,192L60,186.7C120,181,240,171,360,186.7C480,203,600,245,720,240C840,235,960,181,1080,165.3C1200,149,1320,171,1380,181.3L1440,192L1440,560L1380,560C1320,560,1200,560,1080,560C960,560,840,560,720,560C600,560,480,560,360,560C240,560,120,560,60,560L0,560Z"></path>
          <circle cx="10%" cy="30%" r="180" fill="#ffffff" fillOpacity="0.03" />
          <circle cx="90%" cy="80%" r="220" fill="#f97316" fillOpacity="0.08" />
        </svg>
      </div>

      {/* Static Content Layer (text stays put while background slides) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
        <div className="max-w-3xl flex flex-col justify-center text-left space-y-6">

          {/* Highlight Badges & Category Header */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/25 border border-orange-400/40 text-orange-200 text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-sm">
              <Flame className="w-3.5 h-3.5 text-[#ff7a00] fill-[#ff7a00] animate-pulse" />
              <span>{copy.highlightLabel || "HIGHLIGHT BKK"}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs sm:text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-bkk-orange animate-ping"></span>
              <span>{copy.badge}</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black leading-[1.12] tracking-tight font-display">
            {copy.titlePrefix && (
              <span className="block text-white">
                {copy.titlePrefix}
              </span>
            )}
            {copy.titleMiddle && (
              <span className="block text-white/95">
                {copy.titleMiddle}
              </span>
            )}
            <span className="text-[#ff7a00] drop-shadow-md block mt-1">
              {copy.highlight}
            </span>
            {copy.titleSuffix && (
              <span className="block text-white text-2xl sm:text-3xl font-extrabold mt-1">
                {copy.titleSuffix}
              </span>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed">
            {copy.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => handleAction(copy.ctaAction)}
              className="px-7 py-3.5 rounded-xl bg-[#ff6b00] hover:bg-[#e65c00] text-white font-extrabold text-sm sm:text-base tracking-wide uppercase shadow-button-orange hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>{copy.ctaText}</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleAction(copy.secondaryCtaAction)}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all cursor-pointer"
            >
              {copy.secondaryCtaText}
            </button>
          </div>

          {/* Slideshow Controls Bar (Dots + Navigation Buttons + Counter) */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 max-w-xl">

            <div className="flex items-center gap-2.5">
              {heroSlides.map((s, idx) => (
                <button
                  key={s.id || idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Lihat Latar ${idx + 1}: ${s.highlight}`}
                  title={`Latar #${idx + 1}: ${s.highlight}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentSlide === idx
                      ? 'w-8 h-2.5 bg-gradient-to-r from-orange-400 to-[#ff6b00] shadow-md'
                      : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-300 tracking-wider">
                Latar <strong className="text-white">{currentSlide + 1}</strong> / {heroSlides.length}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevSlide}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all border border-white/15 cursor-pointer"
                  aria-label="Latar Sebelumnya"
                  title="Sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all border border-white/15 cursor-pointer"
                  aria-label="Latar Berikutnya"
                  title="Berikutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}