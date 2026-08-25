import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 text-xs sm:text-sm">
        {type === 'success' ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        ) : type === 'error' ? (
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
        ) : (
          <Info className="w-5 h-5 text-blue-400 shrink-0" />
        )}
        <span className="font-medium pr-2">{message}</span>
        <button onClick={onClose} className="text-slate-400 hover:text-white ml-auto">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
