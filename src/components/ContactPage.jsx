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
  const { showToast } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Message sent successfully! Our team will reply shortly. 💌');
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
    <div className="bg-[#FDFCFD] min-h-screen py-8 sm:py-12 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* HERO BANNER WITH BACKGROUND IMAGE */}
        <div className="relative rounded-3xl overflow-hidden min-h-[360px] sm:min-h-[420px] flex items-center p-8 sm:p-12 lg:p-16 shadow-2xl shadow-rose-950/20">
          
          {/* Background Image: Friendly Customer Care & Happy Family Setting */}
          <img
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1920&q=85"
            alt="KidzGem Customer Care and Family Support"
            className="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000"
          />

          {/* Aesthetic Gradient Scrim (Red & Rose to Translucent) */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-950/90 via-rose-900/80 via-60% to-rose-950/40"></div>

          {/* Ambient Light Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Banner Content */}
          <div className="relative z-10 max-w-2xl space-y-4 text-left text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-xs border border-white/25">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>We Are Here For You 24/7</span>
            </div>

            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] drop-shadow-md"
              style={{ fontFamily: 'Fredoka, sans-serif' }}
            >
              Get in Touch with <br />
              <span className="text-amber-300 underline decoration-wavy decoration-white/40">KidzGem Family Care</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-rose-100 font-semibold leading-relaxed drop-shadow-xs">
              Have a question about order dispatch, toy safety, or birthday hampers? Our team is always ready to assist your family with joy and warmth.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-bold text-rose-100">
              <a
                href="tel:+919999659104"
                className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>+91 99996 59104 (Call / WhatsApp)</span>
              </a>
              <a
                href="mailto:welcome@kidzgem.com"
                className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-300" />
                <span>welcome@kidzgem.com</span>
              </a>
            </div>
          </div>

          {/* Floating Aesthetic Response Badge on Right Side */}
          <div className="hidden lg:flex absolute bottom-8 right-8 z-10 items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/80 shadow-xl pointer-events-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-black text-lg shadow-xs">
              💬
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-wider text-emerald-600">Quick Response</p>
              <p className="text-xs font-black text-slate-800">Under 2 Hours Reply</p>
            </div>
          </div>

        </div>

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
                className="w-full py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-rose-600/30 transition-all hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
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
