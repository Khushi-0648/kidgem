/**
 * Vercel Serverless Function: Contact Form via Resend
 * RESEND_API_KEY stays server-side only - never exposed to the browser.
 */
import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str = '') {
  return str.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, phone, subject, message, company } = req.body || {};

  // Honeypot: real visitors never fill this hidden field
  if (company) {
    return res.status(200).json({ success: true, message: 'Your message has been received!' });
  }

  const cleanName = typeof name === 'string' ? name.trim().slice(0, 200) : '';
  const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const cleanPhone = typeof phone === 'string' ? phone.trim().slice(0, 40) : '';
  const cleanSubject = typeof subject === 'string' && subject.trim() ? subject.trim().slice(0, 200) : 'KidzGem Customer Query';
  const cleanMessage = typeof message === 'string' ? message.trim().slice(0, 5000) : '';

  if (!cleanEmail || !EMAIL_RE.test(cleanEmail) || !cleanMessage) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email and message.' });
  }

  if (!process.env.RESEND_API_KEY || !process.env.STORE_NOTIFY_EMAIL) {
    console.error('RESEND_API_KEY or STORE_NOTIFY_EMAIL is not configured');
    return res.status(500).json({ success: false, message: 'Contact service is not configured.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromAddress = process.env.RESEND_FROM_EMAIL || 'KidzGem <onboarding@resend.dev>';

  try {
    await resend.emails.send({
      from: fromAddress,
      to: process.env.STORE_NOTIFY_EMAIL,
      replyTo: cleanEmail,
      subject: `[KidzGem Contact] ${cleanSubject}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\nPhone: ${cleanPhone}\n\nMessage:\n${cleanMessage}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(cleanName)}</p><p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p><p><strong>Phone:</strong> ${escapeHtml(cleanPhone)}</p><p><strong>Message:</strong><br/>${escapeHtml(cleanMessage).replace(/\n/g, '<br/>')}</p>`
    });

    await resend.emails.send({
      from: fromAddress,
      to: cleanEmail,
      subject: 'We received your message - KidzGem Support',
      text: `Hi ${cleanName || 'there'},\n\nThanks for reaching out to KidzGem! Our support team will get back to you within 24 hours.\n\nYour message:\n${cleanMessage}\n\nWith love,\nThe KidzGem Team`
    });

    return res.status(200).json({ success: true, message: 'Your message has been received! Our support team will reply within 24 hours.' });
  } catch (err) {
    console.error('Resend contact error:', err);
    return res.status(502).json({ success: false, message: 'Could not send your message right now. Please try again shortly.' });
  }
}
