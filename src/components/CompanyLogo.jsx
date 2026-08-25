import React from 'react';

export default function CompanyLogo({ name, className = "h-8 object-contain" }) {
  const normalized = (name || '').toLowerCase();

  if (normalized.includes('toyota')) {
    return (
      <div className={`inline-flex items-center gap-2 font-bold tracking-tight text-slate-800 ${className}`}>
        <svg viewBox="0 0 100 70" className="h-8 w-auto fill-red-600">
          <ellipse cx="50" cy="35" rx="46" ry="30" fill="none" stroke="currentColor" strokeWidth="6" />
          <ellipse cx="50" cy="35" rx="30" ry="28" fill="none" stroke="currentColor" strokeWidth="5" />
          <ellipse cx="50" cy="22" rx="20" ry="12" fill="none" stroke="currentColor" strokeWidth="5" />
        </svg>
        <span className="font-extrabold text-red-600 text-lg tracking-wider">TOYOTA</span>
      </div>
    );
  }

  if (normalized.includes('bri')) {
    return (
      <div className={`inline-flex items-center gap-1.5 font-bold ${className}`}>
        <div className="bg-[#00529c] text-white px-2 py-0.5 rounded font-black text-xl tracking-tighter">
          BRI
        </div>
        <span className="text-[#00529c] font-bold text-xs uppercase tracking-tight leading-none hidden sm:inline-block">
          Bank Rakyat<br />Indonesia
        </span>
      </div>
    );
  }

  if (normalized.includes('indosat')) {
    return (
      <div className={`inline-flex items-center gap-1 font-bold ${className}`}>
        <div className="flex items-center -space-x-1">
          <span className="w-3.5 h-3.5 rounded-full bg-red-600 inline-block"></span>
          <span className="w-3.5 h-3.5 rounded-full bg-yellow-500 inline-block"></span>
          <span className="w-3.5 h-3.5 rounded-full bg-green-600 inline-block"></span>
          <span className="w-3.5 h-3.5 rounded-full bg-blue-600 inline-block"></span>
        </div>
        <span className="font-black text-lg text-slate-900 ml-1">indosat</span>
      </div>
    );
  }

  if (normalized.includes('nestle') || normalized.includes('nestlé')) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <span className="font-serif italic font-bold text-xl text-[#005ca9] tracking-tight">
          Nestlé
        </span>
        <span className="text-[10px] text-slate-500 font-medium">Good food, Good life</span>
      </div>
    );
  }

  if (normalized.includes('pertamina')) {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <div className="flex flex-col gap-0.5">
          <div className="w-5 h-2.5 bg-blue-600 rounded-sm transform -skew-x-12"></div>
          <div className="w-5 h-2.5 bg-green-600 rounded-sm transform -skew-x-12"></div>
          <div className="w-5 h-2.5 bg-red-600 rounded-sm transform -skew-x-12"></div>
        </div>
        <span className="font-black text-lg text-slate-900 tracking-wider">PERTAMINA</span>
      </div>
    );
  }

  if (normalized.includes('bca')) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <div className="bg-[#003399] text-white px-2.5 py-1 rounded-md font-black text-xl tracking-wide flex items-center gap-1">
          <span>BCA</span>
        </div>
        <span className="text-[10px] font-semibold text-[#003399] uppercase leading-tight hidden md:inline-block">
          Senantiasa<br />di Sisi Anda
        </span>
      </div>
    );
  }

  if (normalized.includes('astra')) {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <div className="w-7 h-7 rounded-full bg-[#003b7a] flex items-center justify-center text-white font-black text-sm">
          A
        </div>
        <span className="font-black text-xl text-[#003b7a] tracking-widest">ASTRA</span>
      </div>
    );
  }

  if (normalized.includes('telkom')) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <svg viewBox="0 0 100 100" className="h-7 w-7 text-[#e60000] fill-current">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8"/>
          <circle cx="50" cy="50" r="22" fill="currentColor"/>
          <path d="M 50 15 A 35 35 0 0 1 85 50" fill="none" stroke="#ff7300" strokeWidth="8" strokeLinecap="round"/>
        </svg>
        <div className="flex flex-col">
          <span className="font-extrabold text-lg text-[#222] tracking-tight leading-none">Telkom</span>
          <span className="text-[9px] font-bold text-[#e60000] uppercase tracking-widest">Indonesia</span>
        </div>
      </div>
    );
  }

  if (normalized.includes('indofood')) {
    return (
      <div className={`inline-flex items-center gap-1 ${className}`}>
        <span className="font-black text-xl italic text-[#004899] tracking-tighter" style={{ fontFamily: 'Impact, sans-serif' }}>
          Indofood
        </span>
      </div>
    );
  }

  // Fallback badge
  return (
    <div className={`inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-bold text-sm ${className}`}>
      {name}
    </div>
  );
}
