/**
 * Newsletter & Contact Form Service
 * Dispatches subscriber emails and customer queries via Resend
 * (see /api/subscribe.js and /api/contact.js).
 */

async function postJson(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
}

export const wpFormService = {
  /**
   * Submit newsletter email via Resend
   */
  async subscribeNewsletter(email, honeypot = '') {
    try {
      const data = await postJson('/api/subscribe', { email: (email || '').trim().toLowerCase(), company: honeypot });
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, message: err.message || 'Could not subscribe right now. Please try again.' };
    }
  },

  /**
   * Submit contact form via Resend
   */
  async submitContact(formData, honeypot = '') {
    try {
      const data = await postJson('/api/contact', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        subject: formData.subject || 'KidzGem Customer Query',
        message: formData.message,
        company: honeypot
      });
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, message: err.message || 'Could not send your message right now. Please try again.' };
    }
  }
};
