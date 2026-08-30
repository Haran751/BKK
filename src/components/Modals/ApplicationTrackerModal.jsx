import React, { useState } from 'react';
import { X, Search, Briefcase, CheckCircle2, Clock } from 'lucide-react';
import { trackApplication } from '../../services/applicationService';

const statusLabels = {
  baru: 'Baru',
  ditinjau: 'Ditinjau',
  lolos: 'Lolos Seleksi',
  tidak_lolos: 'Tidak Lolos',
  diterima: 'Diterima'
};

export default function ApplicationTrackerModal({ onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [applications, setApplications] = useState([]);
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearched(true);
    const query = searchQuery.trim();
    if (!query) {
      setResults([]);
      setApplications([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await trackApplication({ nisn: query });
      const payload = response.data?.data || [];
      setResults(payload);
      setApplications(payload);
    } catch (error) {
      console.error('TRACK APPLICATION ERROR:', error);
      setResults([]);
      setApplications([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-bkk-navy to-bkk-blue text-white p-6 relative rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <p className="text-[11px] font-extrabold text-orange-400 uppercase tracking-widest">
            Sistem Pelacakan Rekrutmen
          </p>
          <h3 className="text-xl font-black text-white font-display mt-0.5">
            Cek Status Lamaran Kerja
          </h3>
          <p className="text-xs text-slate-200 mt-1">
            Pantau progres seleksi berkas, psikotes, hingga jadwal wawancara kerja Anda
          </p>
        </div>

        {/* Search Bar */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Masukkan Kode Tracking (BKK-...) atau NISN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bkk-blue/20 focus:border-bkk-blue text-xs bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-bkk-navy hover:bg-bkk-blue text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm shrink-0"
            >
              Cari Data
            </button>
          </form>
        </div>

        {/* Results List */}
        <div className="p-6 space-y-5">
          {isLoading ? (
            <div className="text-center py-8 text-xs text-slate-500">Mencari data lamaran...</div>
          ) : results.length === 0 ? (
            <div className="text-center py-8">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="font-bold text-slate-700 text-sm">Tidak ada riwayat lamaran ditemukan</p>
              <p className="text-xs text-slate-500 mt-1">Pastikan nomor NISN yang dimasukkan sesuai dengan data lamaran Anda.</p>
            </div>
          ) : (
            results.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {app.id}
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 mt-1 font-display">
                      {app.jobTitle}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">{app.company}</p>
                  </div>
                  
                  <div className="text-left sm:text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-bkk-blue text-xs font-black uppercase">
                      {statusLabels[app.status] || app.status || 'Diproses'}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">Diajukan: {new Date(app.appliedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>

                {app.timeline && (
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                      Tahapan Seleksi:
                    </p>
                    <div className="space-y-2">
                      {app.timeline.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs">
                          {step.done ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          ) : step.current ? (
                            <Clock className="w-4 h-4 text-orange-500 shrink-0 mt-0.5 animate-pulse" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0 mt-0.5"></div>
                          )}
                          <div className="flex-1 flex justify-between">
                            <span className={step.done ? 'font-bold text-slate-800' : step.current ? 'font-black text-orange-600' : 'text-slate-400'}>
                              {step.status}
                            </span>
                            <span className="text-[11px] text-slate-400">{step.date || (step.done ? 'Selesai' : step.current ? 'Sedang berjalan' : 'Menunggu')}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 rounded-b-3xl flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
