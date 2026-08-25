import React, { useState } from 'react';
import { X, Calendar, MapPin, Ticket, CheckCircle2, Download, Printer, QrCode, Sparkles, Building2 } from 'lucide-react';
import { recruitmentEvents } from '../../data/mockData';

export default function EventRegistrationModal({ eventId = 'job-fair-2024', onClose }) {
  const event = recruitmentEvents.find(e => e.id === eventId) || recruitmentEvents[0];
  
  const [registered, setRegistered] = useState(false);
  const [ticketData, setTicketData] = useState({
    name: 'Ahmad Rizky Pratama',
    email: 'ahmad.rizky@gmail.com',
    phone: '081234567890',
    institution: 'Alumni SMKN 1 Jakarta (TKJ)',
    ticketCode: 'TKT-JF24-' + Math.floor(1000 + Math.random() * 9000),
    session: 'Sesi Pagi (08.30 - 12.00 WIB)'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTicketData(prev => ({
      ...prev,
      ticketCode: 'TKT-JF24-' + Math.floor(10000 + Math.random() * 90000)
    }));
    setRegistered(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 relative my-8 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#102d5e] via-[#163e7e] to-[#1e52a4] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-bkk-orange text-white text-[10px] font-black uppercase">
              {event.type}
            </span>
            <span className="text-xs text-slate-200">BKK SMKN 1 Jakarta</span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white font-display leading-tight uppercase">
            {event.title}
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-200">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-orange-400" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {registered ? (
            /* Digital E-Ticket View */
            <div className="space-y-4">
              <div className="text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pendaftaran Berhasil! Tiket Elektronik Terbit</span>
                </span>
              </div>

              {/* Printable Ticket Card */}
              <div className="bg-gradient-to-br from-slate-900 via-bkk-navy to-slate-900 text-white rounded-3xl p-5 shadow-2xl border-2 border-orange-500/40 relative overflow-hidden">
                {/* Side Cutout Notches for Ticket Aesthetics */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white"></div>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white"></div>

                <div className="border-b border-dashed border-white/20 pb-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">E-TICKET ENTRY</p>
                      <h4 className="font-extrabold text-sm sm:text-base text-white">{event.type} 2024</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-slate-300">STATUS</p>
                      <span className="text-xs font-black text-emerald-400 uppercase">VALID / RESMI</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 block">NAMA PESERTA</span>
                    <span className="font-bold text-white truncate block">{ticketData.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">INSTITUSI / ASAL</span>
                    <span className="font-bold text-white truncate block">{ticketData.institution}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">TANGGAL & SESI</span>
                    <span className="font-bold text-white">{event.date}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">LOKASI</span>
                    <span className="font-bold text-white">SMKN 1 Jakarta</span>
                  </div>
                </div>

                {/* QR Code & Barcode Section */}
                <div className="bg-white rounded-2xl p-3 flex items-center justify-between gap-3 text-slate-900">
                  <div className="flex items-center gap-3">
                    {/* SVG QR Code Simulation */}
                    <div className="w-16 h-16 bg-slate-100 rounded-lg p-1 flex items-center justify-center border border-slate-200">
                      <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-900">
                        <rect x="10" y="10" width="25" height="25" />
                        <rect x="15" y="15" width="15" height="15" fill="white" />
                        <rect x="18" y="18" width="9" height="9" />
                        <rect x="65" y="10" width="25" height="25" />
                        <rect x="70" y="15" width="15" height="15" fill="white" />
                        <rect x="73" y="18" width="9" height="9" />
                        <rect x="10" y="65" width="25" height="25" />
                        <rect x="15" y="70" width="15" height="15" fill="white" />
                        <rect x="18" y="73" width="9" height="9" />
                        <rect x="45" y="20" width="10" height="10" />
                        <rect x="45" y="45" width="10" height="10" />
                        <rect x="65" y="65" width="12" height="12" />
                        <rect x="80" y="50" width="8" height="20" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">NO. TIKET MASUK</p>
                      <p className="text-sm font-mono font-black text-bkk-navy tracking-wider">{ticketData.ticketCode}</p>
                      <p className="text-[9px] text-emerald-600 font-semibold">Tunjukkan QR saat registrasi di pintu masuk</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handlePrint}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Tiket</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl bg-bkk-navy hover:bg-bkk-blue text-white font-extrabold text-xs uppercase tracking-wider shadow-md"
                >
                  Selesai
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Lengkap Peserta *</label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama lengkap Anda"
                  value={ticketData.name}
                  onChange={(e) => setTicketData({ ...ticketData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">No. WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0812xxxx"
                    value={ticketData.phone}
                    onChange={(e) => setTicketData({ ...ticketData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Aktif *</label>
                  <input
                    type="email"
                    required
                    placeholder="email@gmail.com"
                    value={ticketData.email}
                    onChange={(e) => setTicketData({ ...ticketData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Status / Asal Sekolah *</label>
                <select
                  value={ticketData.institution}
                  onChange={(e) => setTicketData({ ...ticketData, institution: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue text-xs bg-white"
                >
                  <option value="Alumni SMKN 1 Jakarta">Alumni SMKN 1 Jakarta</option>
                  <option value="Siswa Kelas XII SMKN 1 Jakarta">Siswa Kelas XII SMKN 1 Jakarta</option>
                  <option value="Alumni SMK Lainnya di DKI Jakarta">Alumni SMK Lainnya di DKI Jakarta</option>
                  <option value="Umum / Fresh Graduate">Umum / Fresh Graduate</option>
                </select>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-800 text-[11px] space-y-1">
                <p className="font-bold">Informasi Penting Peserta:</p>
                <p>• Harap membawa CV cetak minimal 5-10 lembar dan pas foto terbaru.</p>
                <p>• Kenakan pakaian kemeja putih/formal dan sepatu tertutup.</p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-bkk-orange hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider shadow-button-orange flex items-center justify-center gap-2 transition-all"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Dapatkan E-Ticket Gratis Sekarang</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
