import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Phone, Mail, MapPin, Clock, Send, CheckCircle2, Sparkles } from 'lucide-react';

export const ContactModal = () => {
  const { isContactOpen, setIsContactOpen, showToast, submitContact } = useStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [company, setCompany] = useState(''); // honeypot, must stay empty
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState('');

  if (!isContactOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setSendError('');

    const result = await submitContact({
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    }, company);

    setIsSending(false);

    if (!result?.success) {
      setSendError(result?.message || 'Could not send your message right now. Please try again.');
      return;
    }

    setSubmitted(true);
    showToast('Message sent successfully! We will get back to you ASAP.');
    setTimeout(() => {
      setSubmitted(false);
      setIsContactOpen(false);
      setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-rose-100 my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-xl leading-tight" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Contact KidzGem Support
              </h3>
              <p className="text-xs text-rose-100">
                Official Helpline & Support Team
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsContactOpen(false)}
            className="p-2 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Official Info Cards (Matching kidzgem.com) */}
        <div className="p-5 sm:p-6 bg-rose-50/50 border-b border-rose-100">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            
            <a href="tel:+919999659104" className="bg-white p-3 rounded-2xl border border-rose-100 hover:border-rose-300 hover:shadow-xs transition-all block">
              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-1.5">
                <Phone className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 block">Phone</span>
              <span className="text-[11px] text-rose-600 font-semibold">+91 99996 59104</span>
            </a>

            <a href="mailto:welcome@kidzgem.com" className="bg-white p-3 rounded-2xl border border-rose-100 hover:border-rose-300 hover:shadow-xs transition-all block">
              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-1.5">
                <Mail className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 block">Email</span>
              <span className="text-[11px] text-rose-600 font-semibold truncate block">welcome@kidzgem.com</span>
            </a>

            <div className="bg-white p-3 rounded-2xl border border-rose-100">
              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-1.5">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 block">Location</span>
              <span className="text-[11px] text-slate-500 font-semibold">India</span>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-rose-100">
              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-1.5">
                <Clock className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 block">Hours</span>
              <span className="text-[11px] text-slate-500 font-semibold">Mon–Sat 10am-7pm</span>
            </div>

          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-1" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Message Sent!
              </h4>
              <p className="text-xs text-slate-500">
                Our support team will reach out to you within 2-4 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="text-center sm:text-left mb-4">
                <h4 className="text-lg font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  Send Us a Message
                </h4>
                <p className="text-slate-500 text-xs">
                  Fill in the form and we'll get back to you ASAP.
                </p>
              </div>

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

              {sendError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-3.5 py-2.5 font-semibold">
                  {sendError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-rose-50/40 border border-rose-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-400 focus:outline-hidden font-medium"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-rose-50/40 border border-rose-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-400 focus:outline-hidden font-medium"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-rose-50/40 border border-rose-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-400 focus:outline-hidden font-medium"
                  placeholder="parent@example.com"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-rose-50/40 border border-rose-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-400 focus:outline-hidden font-medium"
                  placeholder="Order Inquiry / Product Support"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Your Message *</label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-rose-50/40 border border-rose-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-400 focus:outline-hidden font-medium"
                  placeholder="How can we help your child's playtime?"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-800 text-white font-bold text-sm rounded-2xl shadow-md shadow-rose-600/25 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className={`w-4 h-4 ${isSending ? 'animate-pulse' : ''}`} />
                  <span>{isSending ? 'Sending...' : 'Submit Message'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
