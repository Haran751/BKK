import React from 'react';
import { X, Calendar, MapPin, Users, Tag } from 'lucide-react';

export default function GalleryLightboxModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden relative border border-white/20">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white bg-black/40 hover:bg-black/70 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Large Image View */}
        <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-bkk-orange text-white text-xs font-black uppercase">
            {item.category}
          </div>
        </div>

        {/* Caption & Metadata */}
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-bkk-orange" />
              <span>{item.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-bkk-orange" />
              <span>{item.location}</span>
            </div>
            {item.participants && (
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-bkk-blue" />
                <span>{item.participants}</span>
              </div>
            )}
          </div>

          <h3 className="text-lg sm:text-xl font-black text-slate-900 font-display">
            {item.title}
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {item.description}
          </p>

          <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
