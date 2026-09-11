import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Send,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export const ContactPage = () => {
  const { showToast, submitContact } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [company, setCompany] = useState(''); // honeypot, must stay empty
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Inquiry',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    setIsSending(true);
    const result = await submitContact({ ...formData }, company);
    setIsSending(false);

    if (!result?.success) {
      showToast(result?.message || 'Could not send your message right now. Please try again.', 'error');
      return;
    }

    setSubmitted(true);
    showToast('Message sent successfully! Our team will reply shortly.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'Order Inquiry',
      message: ''
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-[#FDFCFD] min-h-screen animate-fadeIn">
      
      {/* FULL-SCREEN HERO BANNER */}
      <div className="relative w-full min-h-[72vh] sm:min-h-[82vh] flex items-center justify-center overflow-hidden mb-12 sm:mb-16">
        {/* Background Image: Friendly Customer Care & Happy Family Setting */}
        <img
          src="/images/unsplash/1543269865-cbf427effbad-w1920.jpg"
          alt="KidzGem Customer Care and Family Support"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 filter brightness-95"
        />

        {/* Multi-Layered Cinematic Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/95 via-rose-950/85 to-red-950/90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/40"></div>

        {/* Ambient Depth Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Banner Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 py-16">
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2 rounded-full text-xs font-black tracking-wider uppercase text-white shadow-2xl">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="bg-gradient-to-r from-white via-rose-100 to-amber-200 bg-clip-text text-transparent">
              24/7 Dedicated Support • Response Under 2 Hours
            </span>
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.06] drop-shadow-2xl break-words"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            Get in Touch with <br />
            <span className="bg-gradient-to-r from-amber-300 via-rose-200 to-amber-200 bg-clip-text text-transparent">
              KidzGem Family Care
            </span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-rose-100/90 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
            Have a question about order dispatch, toy safety, or birthday hampers? Our team is always ready to assist your family with joy and warmth.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-4 text-xs font-black text-white">
            <a
              href="tel:+919999659104"
              className="flex items-center gap-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 px-6 py-3.5 rounded-2xl shadow-xl shadow-rose-600/30 hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>Call / WhatsApp: +91 99996 59104</span>
            </a>
            <a
              href="mailto:welcome@kidzgem.com"
              className="flex items-center gap-2.5 bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md px-6 py-3.5 rounded-2xl transition-all duration-200 active:scale-95 shadow-lg"
            >
              <Mail className="w-4 h-4 text-amber-300" />
              <span>welcome@kidzgem.com</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">

        {/* 4 CONTACT CHANNELS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <a
            href="tel:+919999659104"
            className="bg-white p-6 rounded-3xl border border-rose-100 shadow-md hover:border-rose-400 hover:shadow-xl hover:-translate-y-1 transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-xs font-black text-rose-600 uppercase tracking-wider block">Call or WhatsApp</span>
              <h3 className="text-base font-bold text-slate-900 mt-1">+91 99996 59104</h3>
              <p className="text-xs text-slate-500 mt-1">Instant voice & chat support</p>
            </div>
            <span className="mt-4 text-xs font-black text-rose-600 inline-flex items-center gap-1 group-hover:underline">
              Tap to Call &rarr;
            </span>
          </a>

          <a
            href="mailto:welcome@kidzgem.com"
            className="bg-white p-6 rounded-3xl border border-rose-100 shadow-md hover:border-rose-400 hover:shadow-xl hover:-translate-y-1 transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-xs font-black text-rose-600 uppercase tracking-wider block">Direct Email</span>
              <h3 className="text-base font-bold text-slate-900 mt-1">welcome@kidzgem.com</h3>
              <p className="text-xs text-slate-500 mt-1">Replies within 2 to 4 business hours</p>
            </div>
            <span className="mt-4 text-xs font-black text-rose-600 inline-flex items-center gap-1 group-hover:underline">
              Send Email &rarr;
            </span>
          </a>

          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-md text-left flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-xs font-black text-rose-600 uppercase tracking-wider block">Support Hours</span>
              <h3 className="text-base font-bold text-slate-900 mt-1">10:00 AM – 7:00 PM IST</h3>
              <p className="text-xs text-slate-500 mt-1">Monday to Saturday</p>
            </div>
            <span className="mt-4 text-[11px] text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Support Available
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-md text-left flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-black text-rose-600 uppercase tracking-wider block">Hassle-Free Returns</span>
              <h3 className="text-base font-bold text-slate-900 mt-1">7-Day Free Replacement</h3>
              <p className="text-xs text-slate-500 mt-1">For any transit damage or defects</p>
            </div>
            <span className="mt-4 text-[11px] text-rose-600 font-bold">100% Parent Satisfaction</span>
          </div>
        </div>

        {/* MESSAGE FORM & FAQ SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* SEND MESSAGE FORM */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-rose-100 shadow-xl space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
                <MessageSquare className="w-4 h-4" />
                <span>Send Us a Message</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                How Can We Help You Today?
              </h2>
            </div>

            {submitted && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center gap-3 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <p className="text-xs font-bold leading-relaxed">
                  Thank you! Your message has been received. Our KidzGem team will contact you shortly on your provided phone/email.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field - hidden from real users, catches bots */}
              <input
                type="text"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] w-px h-px opacity-0"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-4 py-3 bg-rose-50/40 border border-rose-200 focus:border-rose-500 focus:bg-white rounded-2xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-rose-400/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="priya@example.com"
                    className="w-full px-4 py-3 bg-rose-50/40 border border-rose-200 focus:border-rose-500 focus:bg-white rounded-2xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-rose-400/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 bg-rose-50/40 border border-rose-200 focus:border-rose-500 focus:bg-white rounded-2xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-rose-400/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-rose-50/40 border border-rose-200 focus:border-rose-500 focus:bg-white rounded-2xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-rose-400/20"
                  >
                    <option value="Order Inquiry">Order Status & Tracking</option>
                    <option value="Product Question">Toy & Safety Inquiry</option>
                    <option value="Returns & Replacements">Returns & Replacement</option>
                    <option value="Bulk & Birthday Orders">Birthday & Bulk Hampers</option>
                    <option value="Other">Other Feedback</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you need help with..."
                  className="w-full px-4 py-3 bg-rose-50/40 border border-rose-200 focus:border-rose-500 focus:bg-white rounded-2xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-rose-400/20"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-rose-600/30 transition-all hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className={`w-4 h-4 ${isSending ? 'animate-pulse' : ''}`} />
                <span>{isSending ? 'Sending...' : 'Submit Message'}</span>
              </button>
            </form>
          </div>

          {/* QUICK FAQs */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-rose-50/60 p-6 rounded-3xl border border-rose-100 space-y-4">
              <div className="flex items-center gap-2 text-rose-600 font-black text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Frequently Asked Questions</span>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-2xs">
                  <h4 className="text-xs font-black text-slate-900">How soon do you dispatch orders?</h4>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    Orders placed before 2:00 PM are dispatched on the same business day. Delivery usually takes 2-4 business days across India.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-2xs">
                  <h4 className="text-xs font-black text-slate-900">Do I need an account to place an order?</h4>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    No! KidzGem is completely zero-friction. You can add any toy to cart and check out directly via UPI, Card, Net Banking or Cash on Delivery.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-2xs">
                  <h4 className="text-xs font-black text-slate-900">What if a toy arrives damaged?</h4>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    We offer a 7-day hassle-free replacement. Simply message us on WhatsApp (+91 99996 59104) with your order ID and a photo.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
