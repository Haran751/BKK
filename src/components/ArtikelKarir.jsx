import React from 'react';
import { BookOpen, Clock, ArrowRight, Sparkles, UserCheck } from 'lucide-react';
import { mediaUrl, fallbackImage } from '../services/media';

export default function ArtikelKarir({ articles = [], onOpenArticle }) {
  return (
    <section id="artikel" className="py-12 md:py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-bkk-navy uppercase tracking-tight font-display">
              ARTIKEL KARIR & INFO
            </h2>
            <div className="w-12 h-1 bg-bkk-orange rounded-full mt-1.5"></div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Wawasan karir, panduan interview, dan kisah sukses alumni inspiratif
            </p>
          </div>
        </div>

        {/* 3 Article Cards Grid matching Mockup */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              onClick={() => onOpenArticle(article)}
              className="bg-white rounded-2xl overflow-hidden shadow-card border border-slate-100 hover:shadow-card-hover group cursor-pointer transition-all flex flex-col justify-between transform hover:-translate-y-1"
            >
              <div>
                {/* Article Thumbnail Image */}
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src={mediaUrl(article.thumbnail || article.image, 'articles') || fallbackImage}
                    onError={(event) => { event.currentTarget.src = fallbackImage; }}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Blog Post Badge matching Mockup */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[10px] font-black text-bkk-navy uppercase tracking-wider shadow-sm">
                    {article.category || 'Artikel'}
                  </div>
                </div>

                {/* Article Body */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold mb-1.5">
                    <span>{article.category}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.author || 'Tim BKK'}</span>
                    </div>
                  </div>

                  {/* Title matching Mockup */}
                  <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight leading-snug font-display line-clamp-2 group-hover:text-bkk-blue transition-colors">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {article.excerpt || String(article.content || '').slice(0, 150)}
                  </p>
                </div>
              </div>

              {/* Bottom Footer / Read More */}
              <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-bkk-orange group-hover:text-bkk-orangeHover">
                <span className="text-[11px] text-slate-400 font-medium">{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('id-ID') : new Date(article.createdAt).toLocaleDateString('id-ID')}</span>
                <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
