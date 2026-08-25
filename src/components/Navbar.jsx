import React, { useState, useEffect } from 'react';
import { Search, Menu, X, User, LogOut, Briefcase, Bell, ChevronDown, PlusCircle, ShieldCheck } from 'lucide-react';
import logoSmkn20 from '../assets/logo-smkn20jkt.webp';

export default function Navbar({
  activeSection,
  setActiveSection,
  currentUser,
  onLogout,
  onSearch,
  searchQuery,
  setSearchQuery,
  onOpenAboutModal,
  onOpenTrackerModal,
  onOpenPostJobModal
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'beranda', label: 'BERANDA', href: '#beranda' },
    { id: 'profil', label: 'PROFIL', href: '#profil' },
    { id: 'program', label: 'PROGRAM', href: '#program' },
    { id: 'rekrutmen', label: 'KEGIATAN REKRUTMEN', href: '#rekrutmen' },
    { id: 'lowongan', label: 'LOWONGAN KERJA', href: '#lowongan' },
    { id: 'mitra', label: 'MITRA PERUSAHAAN', href: '#mitra' },
    { id: 'galeri', label: 'GALERI', href: '#galeri' },
    { id: 'artikel', label: 'ARTIKEL', href: '#artikel' },
  ];

  const handleNavClick = (id, href) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-200/80' 
        : 'bg-white py-3.5 border-b border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & School Title */}
          <a 
            href="#beranda" 
            onClick={(e) => { e.preventDefault(); handleNavClick('beranda', '#beranda'); }}
            className="flex items-center gap-3 group shrink-0"
          >
            {/* School Crest Emblem */}
            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white p-1 shadow-sm border border-slate-200 group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={logoSmkn20}
                alt="Logo SMKN 20 Jakarta"
                className="w-full h-full object-contain"
              />
            </div>

            {/* School Text */}
            <div className="flex flex-col">
              <span className="font-extrabold text-[15px] sm:text-[17px] tracking-tight text-bkk-navy leading-tight uppercase font-sans">
                SMK NEGERI 20 JAKARTA
              </span>
              <span className="font-black text-lg sm:text-xl text-bkk-blue tracking-widest leading-none font-display">
                BKK
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.href)}
                  className={`px-2.5 py-1.5 rounded-md text-[13px] 2xl:text-[14px] font-bold tracking-tight transition-colors uppercase whitespace-nowrap ${
                    isActive
                      ? 'text-bkk-orange font-extrabold'
                      : 'text-slate-700 hover:text-bkk-blue hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Interactive Search Bar / Trigger */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-slate-100 rounded-full px-3 py-1.5 border border-slate-300 animate-fadeIn">
                  <Search className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="Cari lowongan, jurusan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="bg-transparent text-xs sm:text-sm text-slate-800 focus:outline-none w-32 sm:w-48"
                  />
                  <button 
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="text-slate-400 hover:text-slate-600 ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search"
                  className="p-2 rounded-full text-slate-700 hover:text-bkk-blue hover:bg-slate-100 transition-colors"
                  title="Cari Lowongan & Berita"
                >
                  <Search className="w-5 h-5 stroke-[2.2]" />
                </button>
              )}
            </div>

            {/* Application Tracker Quick Button */}
            <button
              onClick={onOpenTrackerModal}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-bkk-blue bg-bkk-sky/60 hover:bg-bkk-sky rounded-full transition-colors"
              title="Cek Status Lamaran Saya"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Cek Lamaran</span>
            </button>

            {/* Admin Profile & Actions (Only visible when Admin is Logged In) */}
            {currentUser && (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#133e75] text-white text-xs sm:text-sm font-semibold hover:bg-bkk-blue transition-colors shadow-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-bkk-orange flex items-center justify-center font-bold text-white text-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="max-w-[100px] truncate">{currentUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Status Akses</p>
                      <p className="text-sm font-bold text-slate-900 truncate mt-0.5">{currentUser.name}</p>
                      <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-[10px] font-black rounded-full bg-orange-100 text-bkk-orange uppercase">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{currentUser.role}</span>
                      </span>
                    </div>

                    {onOpenPostJobModal && (
                      <button
                        onClick={() => { setUserDropdownOpen(false); onOpenPostJobModal(); }}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-emerald-700 hover:bg-emerald-50 flex items-center gap-2"
                      >
                        <PlusCircle className="w-4 h-4 text-emerald-600" />
                        <span>+ Pasang Lowongan Baru</span>
                      </button>
                    )}

                    <button
                      onClick={() => { setUserDropdownOpen(false); onOpenTrackerModal(); }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Briefcase className="w-4 h-4 text-bkk-blue" />
                      <span>Status Lamaran Masuk</span>
                    </button>

                    <button
                      onClick={() => { setUserDropdownOpen(false); onLogout(); }}
                      className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-slate-100"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Keluar (Logout Admin)</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-slate-100 pb-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.href)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold tracking-tight uppercase ${
                  activeSection === item.id
                    ? 'bg-orange-50 text-bkk-orange font-extrabold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 px-2 flex flex-col gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenTrackerModal(); }}
                className="w-full py-2.5 px-4 rounded-lg bg-bkk-sky text-bkk-blue font-bold text-xs flex items-center justify-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                Cek Status Lamaran Kerja
              </button>

              {currentUser && (
                <>
                  {onOpenPostJobModal && (
                    <button
                      onClick={() => { setMobileMenuOpen(false); onOpenPostJobModal(); }}
                      className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <PlusCircle className="w-4 h-4" />
                      + Pasang Lowongan (Admin)
                    </button>
                  )}
                  <button
                    onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                    className="w-full py-2 px-4 rounded-lg bg-red-50 text-red-600 font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar ({currentUser.name})
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
