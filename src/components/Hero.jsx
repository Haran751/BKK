import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Award, 
  Users, 
  CheckCircle2, 
  Building2, 
  Calendar, 
  Sparkles,
  Flame
} from 'lucide-react';
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
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      handleNextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay, currentSlide]);

  const changeSlide = (newIndex) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(newIndex);
      setIsTransitioning(false);
    }, 200);
  };

  const handleNextSlide = () => {
    changeSlide((currentSlide + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    changeSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  };

  const slide = heroSlides[currentSlide];

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

  const renderStatIcon = (iconName) => {
    switch (iconName) {
      case 'Award': return <Award className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'Calendar': return <Calendar className="w-5 h-5" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      default: return <Award className="w-5 h-5" />;
    }
  };

  return (
    <section 
      id="beranda" 
      className="relative bg-gradient-to-r from-[#0d2b59] via-[#0f346b] to-[#123e7e] text-white overflow-hidden"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      
      {/* Decorative Background Geometry & Waves */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 560" preserveAspectRatio="none">
          <path fill="#ffffff" fillOpacity="0.05" d="M0,192L60,186.7C120,181,240,171,360,186.7C480,203,600,245,720,240C840,235,960,181,1080,165.3C1200,149,1320,171,1380,181.3L1440,192L1440,560L1380,560C1320,560,1200,560,1080,560C960,560,840,560,720,560C600,560,480,560,360,560C240,560,120,560,60,560L0,560Z"></path>
          <circle cx="10%" cy="30%" r="180" fill="#ffffff" fillOpacity="0.03" />
          <circle cx="90%" cy="80%" r="220" fill="#f97316" fillOpacity="0.08" />
        </svg>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Text Column (Highlight Content) */}
          <div className={`lg:col-span-7 flex flex-col justify-center text-left space-y-6 transition-all duration-300 ${isTransitioning ? 'opacity-40 translate-y-1' : 'opacity-100 translate-y-0'}`}>
            
            {/* Highlight Badges & Category Header */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/25 border border-orange-400/40 text-orange-200 text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-sm">
                <Flame className="w-3.5 h-3.5 text-[#ff7a00] fill-[#ff7a00] animate-pulse" />
                <span>{slide.highlightLabel || "HIGHLIGHT BKK"}</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs sm:text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-bkk-orange animate-ping"></span>
                <span>{slide.badge}</span>
              </div>
            </div>

            {/* Main Headline with Dynamic Highlight Text */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black leading-[1.12] tracking-tight font-display">
              {slide.titlePrefix && (
                <span className="block text-white">
                  {slide.titlePrefix}
                </span>
              )}
              {slide.titleMiddle && (
                <span className="block text-white/95">
                  {slide.titleMiddle}
                </span>
              )}
              <span className="text-[#ff7a00] drop-shadow-md block mt-1">
                {slide.highlight}
              </span>
              {slide.titleSuffix && (
                <span className="block text-white text-2xl sm:text-3xl font-extrabold mt-1">
                  {slide.titleSuffix}
                </span>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed">
              {slide.subtitle}
            </p>

            {/* CTA Buttons for Active Highlight */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleAction(slide.ctaAction)}
                className="px-7 py-3.5 rounded-xl bg-[#ff6b00] hover:bg-[#e65c00] text-white font-extrabold text-sm sm:text-base tracking-wide uppercase shadow-button-orange hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>{slide.ctaText}</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleAction(slide.secondaryCtaAction)}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all cursor-pointer"
              >
                {slide.secondaryCtaText}
              </button>
            </div>

            {/* Slideshow Controls Bar (4 Dots + Navigation Buttons + Counter) */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 max-w-xl">
              
              {/* Dots matching the mockup */}
              <div className="flex items-center gap-2.5">
                {heroSlides.map((s, idx) => (
                  <button
                    key={s.id || idx}
                    onClick={() => changeSlide(idx)}
                    aria-label={`Lihat Slide Highlight ${idx + 1}: ${s.highlight}`}
                    title={`Highlight #${idx + 1}: ${s.highlight}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      currentSlide === idx
                        ? 'w-8 h-2.5 bg-gradient-to-r from-orange-400 to-[#ff6b00] shadow-md'
                        : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>

              {/* Slide Counter & Next/Prev Controls */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-300 tracking-wider">
                  Highlight <strong className="text-white">{currentSlide + 1}</strong> / {heroSlides.length}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrevSlide}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all border border-white/15 cursor-pointer"
                    aria-label="Highlight Sebelumnya"
                    title="Sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all border border-white/15 cursor-pointer"
                    aria-label="Highlight Berikutnya"
                    title="Berikutnya"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Right Visual Column (Student Graphic & Orange Curved Backdrop) */}
          <div className="lg:col-span-5 relative flex justify-center items-end mt-4 lg:mt-0">
            
            {/* Orange Curved Angular Shape Backdrop matching Mockup */}
            <div className="absolute -right-10 -bottom-10 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-tr from-[#ff6b00] to-[#ff9800] rounded-tl-[120px] rounded-br-[40px] opacity-90 -z-1 transform rotate-3 shadow-2xl"></div>
            
            {/* Decorative Blue Circle */}
            <div className="absolute -left-6 top-10 w-24 h-24 rounded-full bg-blue-400/20 blur-xl"></div>

            {/* Graphic Container with Dynamic Photo */}
            <div className={`relative z-10 w-full max-w-[420px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/15 bg-gradient-to-b from-blue-900/40 to-slate-900/60 backdrop-blur-sm transition-all duration-500 ${isTransitioning ? 'opacity-60 scale-98' : 'opacity-100 scale-100'}`}>
              
              {/* High-res Image */}
              <img
                src={slide.image}
                alt={slide.highlight}
                className="w-full h-[340px] sm:h-[380px] object-cover object-center hover:scale-105 transition-transform duration-700"
              />

              {/* Bottom Overlay Badge */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/55 to-transparent flex items-center justify-between text-white">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-orange-400">
                    {slide.imageTag}
                  </p>
                  <p className="text-sm font-extrabold text-white">
                    {slide.imageCaption}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{slide.verifiedText || "Resmi BKK"}</span>
                </div>
              </div>

              {/* Floating Stat Badge 1 (Top Left) */}
              {slide.stat1 && (
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-slate-800 rounded-xl p-2.5 shadow-xl border border-white flex items-center gap-2.5 animate-float">
                  <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold">
                    {renderStatIcon(slide.stat1.icon)}
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 leading-tight">
                      {slide.stat1.value}
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold">
                      {slide.stat1.label}
                    </div>
                  </div>
                </div>
              )}

              {/* Floating Stat Badge 2 (Top Right) */}
              {slide.stat2 && (
                <div 
                  className="absolute top-16 right-4 bg-white/95 backdrop-blur-md text-slate-800 rounded-xl p-2.5 shadow-xl border border-white flex items-center gap-2.5 animate-float"
                  style={{ animationDelay: '1.5s' }}
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                    {renderStatIcon(slide.stat2.icon)}
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 leading-tight">
                      {slide.stat2.value}
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold">
                      {slide.stat2.label}
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
