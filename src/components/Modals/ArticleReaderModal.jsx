import React from 'react';
import { X, Calendar, Clock, User, Share2, BookOpen, Bookmark, Check } from 'lucide-react';

export default function ArticleReaderModal({ article, onClose }) {
  const [copied, setCopied] = React.useState(false);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-white bg-black/40 hover:bg-black/70 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded bg-bkk-orange text-white text-[10px] font-black uppercase">
                {article.badge || 'Blog Post'}
              </span>
              <span className="text-xs text-slate-300">{article.category}</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black font-display leading-tight uppercase text-white">
              {article.title}
            </h2>
          </div>
        </div>

        {/* Meta Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 font-medium">
              <User className="w-3.5 h-3.5 text-bkk-blue" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-orange-500" />
              <span>{article.readTime}</span>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-xs font-bold text-bkk-blue hover:text-bkk-navy transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tautan Disalin!' : 'Bagikan Artikel'}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-4 text-slate-700 leading-relaxed text-xs sm:text-sm">
          <p className="text-sm sm:text-base font-semibold text-slate-900 border-l-4 border-bkk-orange pl-4 italic">
            "{article.excerpt}"
          </p>

          <div className="prose prose-slate max-w-none text-slate-700 space-y-4 pt-2 whitespace-pre-line">
            {article.content}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 rounded-b-3xl flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">Diterbitkan oleh Tim Publikasi BKK SMKN 1 Jakarta</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-bkk-navy hover:bg-bkk-blue text-white font-bold text-xs uppercase"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
