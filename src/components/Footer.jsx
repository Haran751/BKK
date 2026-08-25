import React from 'react';
import { Phone, MessageCircle, Globe, MapPin, Mail, ShieldCheck, Heart, Lock } from 'lucide-react';
import { schoolInfo } from '../data/mockData';
import logoSmkn20 from '../assets/logo-smkn20jkt.webp';

// Clean SVG Icons for Socials
const FacebookIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YoutubeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export default function Footer({ onOpenTracerModal, onOpenAboutModal, onOpenAuth, currentUser }) {
  return (
    <footer className="bg-[#0a192f] text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4 Columns matching Mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800 text-xs">
          
          {/* COLUMN 1: CONTACT INFO */}
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4 font-display">
              CONTACT INFO
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-bkk-orange shrink-0 mt-0.5" />
                <span className="hover:text-white transition-colors">{schoolInfo.phone}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  {schoolInfo.whatsapp} (WhatsApp BKK)
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-bkk-orange shrink-0 mt-0.5" />
                <a href={`mailto:${schoolInfo.email}`} className="hover:text-white transition-colors">
                  {schoolInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="hover:text-white transition-colors">{schoolInfo.website}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-relaxed">{schoolInfo.address}</span>
              </li>
            </ul>
          </div>

          {/* COLUMN 2: SOCIAL MEDIA */}
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4 font-display">
              SOCIAL MEDIA
            </h4>
            <ul className="space-y-3">
              <li>
                <a href={schoolInfo.socials.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors group">
                  <div className="w-6 h-6 rounded bg-blue-600/30 group-hover:bg-blue-600 flex items-center justify-center transition-colors">
                    <FacebookIcon className="w-3.5 h-3.5 text-blue-400 group-hover:text-white" />
                  </div>
                  <span>Facebook: @bkk.smkn1jkt</span>
                </a>
              </li>
              <li>
                <a href={schoolInfo.socials.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors group">
                  <div className="w-6 h-6 rounded bg-pink-600/30 group-hover:bg-pink-600 flex items-center justify-center transition-colors">
                    <InstagramIcon className="w-3.5 h-3.5 text-pink-400 group-hover:text-white" />
                  </div>
                  <span>Instagram: @bkksmkn1jakarta</span>
                </a>
              </li>
              <li>
                <a href={schoolInfo.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors group">
                  <div className="w-6 h-6 rounded bg-blue-700/30 group-hover:bg-blue-700 flex items-center justify-center transition-colors">
                    <LinkedinIcon className="w-3.5 h-3.5 text-blue-400 group-hover:text-white" />
                  </div>
                  <span>LinkedIn: BKK SMKN 1 Jakarta</span>
                </a>
              </li>
              <li>
                <a href={schoolInfo.socials.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors group">
                  <div className="w-6 h-6 rounded bg-red-600/30 group-hover:bg-red-600 flex items-center justify-center transition-colors">
                    <YoutubeIcon className="w-3.5 h-3.5 text-red-400 group-hover:text-white" />
                  </div>
                  <span>YouTube: BKK SMKN 1 Official</span>
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: FOLLOW US */}
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4 font-display">
              FOLLOW US
            </h4>
            <p className="text-slate-400 leading-relaxed mb-4">
              Ikuti saluran informasi resmi BKK untuk update info lowongan dan campus hiring terbaru setiap hari.
            </p>
            <div className="flex items-center gap-2">
              <a href={schoolInfo.socials.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href={schoolInfo.socials.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href={schoolInfo.socials.youtube} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a href={schoolInfo.socials.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-5">
              <button
                onClick={onOpenTracerModal}
                className="w-full py-2 px-3 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold text-center transition-colors"
              >
                Isi Kuesioner Tracer Study Alumni
              </button>
            </div>
          </div>

          {/* COLUMN 4: SCHOOL */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-full bg-white p-0.5 overflow-hidden flex items-center justify-center shrink-0">
                <img src={logoSmkn20} alt="Logo SMKN 20 Jakarta" className="w-full h-full object-contain" />
              </div>
              <h4 className="text-sm font-black text-white uppercase tracking-wider font-display">
                SMK NEGERI 20 JAKARTA
              </h4>
            </div>
            <div className="space-y-2 text-slate-400">
              <p className="text-xs">
                Sekolah Menengah Kejuruan Pusat Keunggulan (SMK PK) Bidang Bisnis & Manajemen, Akuntansi, Rekayasa Perangkat Lunak, dan Desain Komunikasi Visual.
              </p>
              <div className="pt-2 flex flex-col gap-1 text-[11px]">
                <div className="flex items-center gap-1 text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Akreditasi A BAN-SM (Unggul)</span>
                </div>
                <span>NPSN: {schoolInfo.npsn}</span>
                <span>Jam Kerja: {schoolInfo.operationalHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>© 2024 Bursa Kerja Khusus (BKK) SMK Negeri 1 Jakarta. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <button onClick={onOpenAboutModal} className="hover:text-white transition-colors">Visi & Misi</button>
            <span>•</span>
            <button onClick={onOpenTracerModal} className="hover:text-white transition-colors">Tracer Study</button>
            <span>•</span>
            <a href="#lowongan" className="hover:text-white transition-colors">Info Loker</a>
            <span>•</span>
            <button
              onClick={onOpenAuth}
              className="text-slate-500 hover:text-amber-400 transition-colors inline-flex items-center gap-1 cursor-pointer font-medium"
              title="Akses Khusus Pengelola & Administrator BKK"
            >
              <Lock className="w-3 h-3 text-slate-500" />
              <span>{currentUser ? 'Admin BKK Aktif' : 'Akses Admin'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
