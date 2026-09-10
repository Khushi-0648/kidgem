import React from 'react';
import { useStore } from '../context/StoreContext';
import { LEGAL_DOCS } from '../data/legalContent';
import { ArrowLeft, ScrollText, Phone, Mail } from 'lucide-react';

const LEGAL_NAV = [
  { key: 'privacy-policy', label: 'Privacy Policy' },
  { key: 'terms-conditions', label: 'Terms & Conditions' },
  { key: 'shipping-policy', label: 'Shipping Policy' },
  { key: 'refund-policy', label: 'Refund & Cancellation' }
];

export const LegalPage = ({ docKey }) => {
  const { navigateTo } = useStore();
  const doc = LEGAL_DOCS[docKey];

  if (!doc) return null;

  return (
    <div className="bg-[#FDFCFD] min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 via-rose-600 to-red-700 text-white py-14 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-100 hover:text-white transition-colors cursor-pointer mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to KidzGem</span>
          </button>
          <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mx-auto border border-white/20">
            <ScrollText className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            {doc.title}
          </h1>
          <p className="text-xs text-rose-100 font-semibold">Last Updated: {doc.updated}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl border border-rose-100 shadow-lg p-6 sm:p-10 space-y-8">

          {/* Legal doc quick-nav */}
          <div className="flex flex-wrap gap-2 pb-6 border-b border-rose-100">
            {LEGAL_NAV.map((item) => (
              <button
                key={item.key}
                onClick={() => navigateTo(item.key)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
                  item.key === docKey
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            {doc.intro}
          </p>

          {doc.sections.map((section) => (
            <div key={section.heading} className="space-y-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                {section.heading}
              </h2>
              {section.body.map((para, idx) => (
                <p key={idx} className="text-sm text-slate-600 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          ))}

          <div className="pt-6 border-t border-rose-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href="tel:+919999659104" className="flex items-center gap-2 bg-rose-50 px-4 py-3 rounded-2xl text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors">
              <Phone className="w-4 h-4" />
              <span>+91 99996 59104</span>
            </a>
            <a href="mailto:welcome@kidzgem.com" className="flex items-center gap-2 bg-rose-50 px-4 py-3 rounded-2xl text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors">
              <Mail className="w-4 h-4" />
              <span>welcome@kidzgem.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
