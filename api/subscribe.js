/**
 * Vercel Serverless Function: Newsletter Subscription via Resend
 * RESEND_API_KEY stays server-side only - never exposed to the browser.
 */
import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { email, company } = req.body || {};

  // Honeypot: real visitors never fill this hidden field
  if (company) {
    return res.status(200).json({ success: true, message: 'Successfully joined KidzGem VIP Family!' });
  }

  const clean = typeof email === 'string' ? email.trim().toLowerCase() : '';
  if (!clean || !EMAIL_RE.test(clean)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return res.status(500).json({ success: false, message: 'Newsletter service is not configured.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromAddress = process.env.RESEND_FROM_EMAIL || 'KidzGem <onboarding@resend.dev>';
  const notifyEmail = process.env.STORE_NOTIFY_EMAIL;

  try {
    await resend.emails.send({
      from: fromAddress,
      to: clean,
      subject: 'Welcome to the KidzGem VIP Family! 🎉',
      text: `Hi there!\n\nThanks for joining the KidzGem VIP family. You'll be the first to hear about new toy drops, weekend VIP discounts, and safe play guides.\n\nUse code KIDZ20 for 20% off your first order!\n\nWith love,\nThe KidzGem Team`
    });

    if (notifyEmail) {
      await resend.emails.send({
        from: fromAddress,
        to: notifyEmail,
        subject: 'New KidzGem Newsletter Signup',
        text: `New subscriber: ${clean}\nSubmitted: ${new Date().toISOString()}`
      });
    }

    return res.status(200).json({ success: true, message: 'Successfully joined KidzGem VIP Family!' });
  } catch (err) {
    console.error('Resend subscribe error:', err);
    return res.status(502).json({ success: false, message: 'Could not send confirmation email right now. Please try again shortly.' });
  }
}
