import React, { useState } from 'react';
import { X, Calendar, Users, Clock, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

export default function CounselingBookingModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: 'Ahmad Rizky Pratama',
    classMajor: 'Kelas XII TKJ 1 / Alumni',
    date: '2024-10-25',
    timeSlot: '09.00 - 10.00 WIB (Sesi Pagi)',
    counselor: 'Ibu Dra. Siti Rahmawati, M.Pd (Konselor Karir BKK)',
    topic: 'Simulasi Wawancara & Pemantapan Minat Bekerja di BUMN'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 relative my-8 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <p className="text-[11px] font-extrabold text-amber-200 uppercase tracking-widest">
            Layanan One-on-One BKK
          </p>
          <h3 className="text-xl font-black text-white font-display mt-0.5">
            Jadwalkan Konseling Karir
          </h3>
          <p className="text-xs text-amber-100 mt-1">
            Konsultasi karir personal, review CV, dan simulasi interview dengan konselor
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-black text-slate-900 font-display">
                Jadwal Konseling Terkonfirmasi!
              </h3>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2 text-slate-700">
                <p><strong>Nama:</strong> {bookingData.name}</p>
                <p><strong>Tanggal:</strong> {bookingData.date}</p>
                <p><strong>Waktu:</strong> {bookingData.timeSlot}</p>
                <p><strong>Konselor:</strong> {bookingData.counselor}</p>
                <p><strong>Lokasi:</strong> Ruang Konseling BKK Lantai 1 SMKN 1 Jakarta</p>
              </div>
              <p className="text-xs text-slate-500">
                Notifikasi dan link konfirmasi telah dikirimkan ke WhatsApp Anda.
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-bkk-navy text-white font-bold text-xs uppercase"
              >
                Selesai
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Siswa / Alumni *</label>
                <input
                  type="text"
                  required
                  value={bookingData.name}
                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Kelas & Jurusan *</label>
                <input
                  type="text"
                  required
                  value={bookingData.classMajor}
                  onChange={(e) => setBookingData({ ...bookingData, classMajor: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pilih Tanggal *</label>
                  <input
                    type="date"
                    required
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Sesi Waktu *</label>
                  <select
                    value={bookingData.timeSlot}
                    onChange={(e) => setBookingData({ ...bookingData, timeSlot: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="09.00 - 10.00 WIB (Sesi Pagi)">09.00 - 10.00 WIB</option>
                    <option value="10.30 - 11.30 WIB (Sesi Pagi)">10.30 - 11.30 WIB</option>
                    <option value="13.30 - 14.30 WIB (Sesi Siang)">13.30 - 14.30 WIB</option>
                    <option value="15.00 - 16.00 WIB (Sesi Sore)">15.00 - 16.00 WIB</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Topik Konsultasi</label>
                <input
                  type="text"
                  value={bookingData.topic}
                  onChange={(e) => setBookingData({ ...bookingData, topic: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  placeholder="Contoh: Bedah CV, Tips Interview, atau Rencana Kuliah"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  Konfirmasi Booking Konseling
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
