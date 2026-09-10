import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast = () => {
  const { toast } = useStore();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md ${
        isSuccess
          ? 'bg-white/95 border-rose-200 text-slate-900 shadow-rose-500/20'
          : isError
          ? 'bg-red-600 text-white border-red-700 shadow-red-600/30'
          : 'bg-slate-900 text-white border-slate-800'
      }`}>
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isSuccess ? 'bg-rose-100 text-rose-600' : 'bg-white/20 text-white'
        }`}>
          {isSuccess ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : isError ? (
            <AlertCircle className="w-5 h-5" />
          ) : (
            <Info className="w-5 h-5" />
          )}
        </div>

        <span className="text-xs sm:text-sm font-bold pr-2">
          {toast.message}
        </span>
      </div>
    </div>
  );
};
