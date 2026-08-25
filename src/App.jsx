import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProfilAndProgram from './components/ProfilAndProgram';
import KegiatanRekrutmen from './components/KegiatanRekrutmen';
import LowonganKerja from './components/LowonganKerja';
import MitraPerusahaan from './components/MitraPerusahaan';
import GaleriKegiatan from './components/GaleriKegiatan';
import ArtikelKarir from './components/ArtikelKarir';
import Footer from './components/Footer';

// Modals
import JobDetailModal from './components/Modals/JobDetailModal';
import ApplyJobModal from './components/Modals/ApplyJobModal';
import EventRegistrationModal from './components/Modals/EventRegistrationModal';
import AuthModal from './components/Modals/AuthModal';
import GalleryLightboxModal from './components/Modals/GalleryLightboxModal';
import ArticleReaderModal from './components/Modals/ArticleReaderModal';
import TracerStudyModal from './components/Modals/TracerStudyModal';
import CounselingBookingModal from './components/Modals/CounselingBookingModal';
import PostJobModal from './components/Modals/PostJobModal';
import AboutBkkModal from './components/Modals/AboutBkkModal';
import ApplicationTrackerModal from './components/Modals/ApplicationTrackerModal';
import Toast from './components/Toast';

import { MessageCircle, ArrowUp } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('beranda');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Modal States
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyingJob, setApplyingJob] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isTracerOpen, setIsTracerOpen] = useState(false);
  const [isCounselingOpen, setIsCounselingOpen] = useState(false);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthOpen(false);
    showToast(`Selamat datang, ${user.name}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Anda telah keluar dari akun.', 'info');
  };

  const handleJobApplicationSuccess = (record) => {
    showToast(`Lamaran untuk ${record.jobTitle} berhasil terkirim! Simpan kode: ${record.id}`);
  };

  const handleJobPosted = (newJob) => {
    showToast(`Lowongan "${newJob.title}" berhasil diajukan untuk verifikasi.`);
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 font-sans">
      
      {/* Top Main Navigation */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAboutModal={() => setIsAboutOpen(true)}
        onOpenTrackerModal={() => setIsTrackerOpen(true)}
      />

      {/* Main Landing Page Flow */}
      <main className="flex-grow">
        {/* Hero Section Banner (Highlight Slideshow) */}
        <Hero
          onOpenJobSection={() => scrollToSection('lowongan')}
          onOpenJobFairModal={() => setSelectedEventId('job-fair-2024')}
          onOpenCampusHiringModal={() => setSelectedEventId('campus-hiring-astral-telkom')}
          onOpenCounselingModal={() => setIsCounselingOpen(true)}
          onOpenAboutModal={() => setIsAboutOpen(true)}
          onOpenPartnersSection={() => scrollToSection('mitra')}
          onOpenEventsSection={() => scrollToSection('rekrutmen')}
        />

        {/* Profil BKK & Program Unggulan */}
        <ProfilAndProgram
          onOpenAboutModal={() => setIsAboutOpen(true)}
          onOpenCounselingModal={() => setIsCounselingOpen(true)}
          onOpenProgramModal={(progId) => {
            if (progId === 'konseling') setIsCounselingOpen(true);
            else if (progId === 'pemagangan') {
              setSearchQuery('Magang');
              scrollToSection('lowongan');
            } else {
              setIsAboutOpen(true);
            }
          }}
        />

        {/* Kegiatan Rekrutmen (Job Fair & Campus Hiring) */}
        <KegiatanRekrutmen
          onOpenEventModal={(eventId) => setSelectedEventId(eventId)}
        />

        {/* Lowongan Kerja Terbaru */}
        <LowonganKerja
          onSelectJob={(job) => setSelectedJob(job)}
          onApplyJob={(job) => setApplyingJob(job)}
          onOpenPostJobModal={() => setIsPostJobOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Mitra Perusahaan (Carousels & Logotypes) */}
        <MitraPerusahaan />

        {/* Galeri Kegiatan (8 Photo Grid & Lightbox) */}
        <GaleriKegiatan
          onOpenLightbox={(item) => setSelectedGalleryItem(item)}
        />

        {/* Artikel Karir & Info */}
        <ArtikelKarir
          onOpenArticle={(article) => setSelectedArticle(article)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenTracerModal={() => setIsTracerOpen(true)}
        onOpenAboutModal={() => setIsAboutOpen(true)}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
        <a
          href="https://wa.me/6281234567890?text=Halo%20BKK%20SMKN%201%20Jakarta,%20saya%20ingin%20bertanya%20informasi%20lowongan%20kerja..."
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xl transition-all hover:scale-105"
          title="Chat WhatsApp Resmi BKK"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span className="hidden sm:inline">WhatsApp Helpdesk BKK</span>
        </a>
      </div>

      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-11 h-11 rounded-full bg-bkk-navy hover:bg-bkk-blue text-white flex items-center justify-center shadow-2xl transition-all hover:-translate-y-1"
          aria-label="Scroll to top"
          title="Kembali ke Atas"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* MODALS */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={(job) => setApplyingJob(job)}
        />
      )}

      {applyingJob && (
        <ApplyJobModal
          job={applyingJob}
          onClose={() => setApplyingJob(null)}
          onSubmitSuccess={handleJobApplicationSuccess}
        />
      )}

      {selectedEventId && (
        <EventRegistrationModal
          eventId={selectedEventId}
          onClose={() => setSelectedEventId(null)}
        />
      )}

      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {selectedGalleryItem && (
        <GalleryLightboxModal
          item={selectedGalleryItem}
          onClose={() => setSelectedGalleryItem(null)}
        />
      )}

      {selectedArticle && (
        <ArticleReaderModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {isTracerOpen && (
        <TracerStudyModal
          onClose={() => setIsTracerOpen(false)}
        />
      )}

      {isCounselingOpen && (
        <CounselingBookingModal
          onClose={() => setIsCounselingOpen(false)}
        />
      )}

      {isPostJobOpen && (
        <PostJobModal
          onClose={() => setIsPostJobOpen(false)}
          onJobPosted={handleJobPosted}
        />
      )}

      {isAboutOpen && (
        <AboutBkkModal
          onClose={() => setIsAboutOpen(false)}
        />
      )}

      {isTrackerOpen && (
        <ApplicationTrackerModal
          onClose={() => setIsTrackerOpen(false)}
        />
      )}

    </div>
  );
}
