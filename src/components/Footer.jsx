import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';
import { Sparkles, Heart, Mail, ShieldCheck, Truck, Check, Headphones, Clock, MapPin, ArrowRight, MessageSquare } from 'lucide-react';

export const Footer = () => {
  const { setSelectedCategory, showToast, setIsContactOpen, navigateTo, subscribeNewsletter } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    const emailToSubmit = newsletterEmail.trim();
    setSubscribed(true);
    setNewsletterEmail('');
    showToast('Subscribed to KidzGem Family! 20% coupon code KIDZ20 active 🎉');

    try {
      if (subscribeNewsletter) {
        await subscribeNewsletter(emailToSubmit);
      }
    } catch (err) {
      console.warn('Newsletter submission fallback:', err);
    }
  };

  return (
    <footer className="bg-white text-slate-700 border-t border-rose-100 relative overflow-hidden">
      
      {/* Background photographic picture with soft white fading vignette */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1920&q=80"
          alt="KidzGem Happy Play Background"
          className="w-full h-full object-cover object-center opacity-20"
          loading="lazy"
        />
        {/* Soft white fading gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white/95"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* 1. UPPER NEWSLETTER BANNER */}
      <div className="border-b border-rose-100/80 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 rounded-3xl p-8 sm:p-12 text-white shadow-2xl shadow-rose-950/15 relative overflow-hidden text-left border border-white/30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-2">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Join 10,000+ KidzGem Parents</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  Give The Gift Of Wonder Everyday!
                </h3>
                <p className="text-xs sm:text-sm text-rose-100 max-w-xl font-medium">
                  Receive weekend VIP discounts, new toy drops, safe play guides, and exclusive coupon codes.
                </p>
              </div>

              <div className="lg:col-span-5">
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter parent's email..."
                      className="w-full pl-10 pr-4 py-3.5 bg-white text-slate-900 rounded-2xl text-xs font-bold placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-300 shadow-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-slate-900 hover:bg-black text-white font-black text-xs rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-1.5 flex-shrink-0 cursor-pointer"
                  >
                    {subscribed ? <Check className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
                    <span>{subscribed ? 'Joined!' : 'Subscribe'}</span>
                  </button>
                </form>
                <span className="text-[11px] text-rose-100 mt-2 block font-medium">
                  🛡️ Zero Spam • Instant 20% Discount with coupon <strong className="text-amber-200">KIDZ20</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER SITEMAP LINKS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-left">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div onClick={() => navigateTo('home')} className="flex items-center gap-2.5 cursor-pointer select-none group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-red-700 flex items-center justify-center text-white shadow-lg shadow-rose-600/30 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Kidz<span className="text-rose-600">Gem</span>
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm font-medium">
              KidzGem offers fun, certified safe, and educational toys designed to spark creativity and imagination in children. Curated with love, safety testing, and screen-free smiles.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-rose-200 px-3 py-1.5 rounded-full shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Certified Safe</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-rose-200 px-3 py-1.5 rounded-full shadow-2xs">
                <Truck className="w-3.5 h-3.5 text-rose-600" />
                <span>Free Express Shipping</span>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => navigateTo('category-detail', c.id)}
                    className="text-slate-600 hover:text-rose-600 font-medium transition-colors text-left cursor-pointer"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-rose-600 text-left transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('categories')} className="hover:text-rose-600 text-left transition-colors cursor-pointer">
                  Category
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-rose-600 text-left transition-colors cursor-pointer">
                  Shop
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-rose-600 text-left transition-colors cursor-pointer">
                  About KidzGem
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-rose-600 text-left transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Support (Themed, Number Removed) */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              Customer Support
            </h4>
            <div className="space-y-3 text-xs">
              <button
                onClick={() => setIsContactOpen(true)}
                className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-black transition-colors text-left cursor-pointer group"
              >
                <Headphones className="w-3.5 h-3.5 text-rose-600 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span>Online Helpdesk & Live Chat</span>
              </button>

              <a
                href="mailto:welcome@kidzgem.com"
                className="flex items-center gap-2 text-slate-700 hover:text-rose-600 font-medium transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                <span>welcome@kidzgem.com</span>
              </a>

              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                <span>Fulfillment Hub: Gujarat, India</span>
              </div>

              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                <span>Hours: Mon–Sat, 10am–7pm</span>
              </div>

              <button
                onClick={() => setIsContactOpen(true)}
                className="mt-2 w-full py-2 px-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <MessageSquare className="w-3 h-3" />
                <span>Send Support Message</span>
              </button>
            </div>

            {/* Official Payment Badges */}
            <div className="mt-5 pt-3 border-t border-rose-100">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-2">
                Accepted Payments
              </span>
              <div className="bg-white p-2 rounded-xl border border-rose-100 inline-block shadow-2xs">
                <img
                  src="https://kidzgem.com/wp-content/themes/kidzgem/assets/img/photos/payment1.png"
                  alt="Accepted Payment Methods (UPI, Card, Net Banking, COD)"
                  className="h-6 object-contain"
                />
              </div>
            </div>
          </div>

        </div>

        {/* 3. BOTTOM BAR */}
        <div className="mt-14 pt-6 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>&copy; 2026 <a href="https://kidzgem.com" target="_blank" rel="noreferrer" className="text-rose-600 font-bold hover:underline">KidzGem</a>. All rights reserved.</p>
          <div className="flex items-center gap-2 text-slate-500">
            <span>Direct Add to Cart to Payment</span>
            <span>•</span>
            <button onClick={() => navigateTo('contact')} className="text-rose-600 font-bold hover:underline cursor-pointer">
              Contact Us
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};
