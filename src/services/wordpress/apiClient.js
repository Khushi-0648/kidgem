/**
 * WordPress & WooCommerce REST Client
 * Handles Cart-Token persistence, CORS, timeout, and response normalization.
 */

import { WP_CONFIG } from '../../config/wordpress.js';

const CART_TOKEN_STORAGE_KEY = 'kidzgem_wc_cart_token';
const NONCE_STORAGE_KEY = 'kidzgem_wc_nonce';

class WpApiClient {
  constructor() {
    this.baseUrl = WP_CONFIG.baseUrl;
    this.cartToken = this.getCartToken();
    this.nonce = this.getNonce();
  }

  getCartToken() {
    try {
      return localStorage.getItem(CART_TOKEN_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  }

  setCartToken(token) {
    if (!token) return;
    this.cartToken = token;
    try {
      localStorage.setItem(CART_TOKEN_STORAGE_KEY, token);
    } catch (e) {
      console.warn('Could not persist cart token', e);
    }
  }

  getNonce() {
    try {
      return localStorage.getItem(NONCE_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  }

  setNonce(nonce) {
    if (!nonce) return;
    this.nonce = nonce;
    try {
      localStorage.setItem(NONCE_STORAGE_KEY, nonce);
    } catch (e) {
      console.warn('Could not persist nonce', e);
    }
  }

  async request(endpoint, options = {}) {
    if (!WP_CONFIG.enabled) {
      throw new Error('WordPress backend is disabled in configuration.');
    }

    const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), WP_CONFIG.timeoutMs);

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    if (this.cartToken) {
      headers['Cart-Token'] = this.cartToken;
    }
    if (this.nonce) {
      headers['Nonce'] = this.nonce;
    }

    try {
      let response;
      try {
        response = await fetch(url, {
          ...options,
          headers,
          signal: controller.signal
        });
      } catch (fetchErr) {
        // If absolute URL failed due to CORS in browser, retry via relative proxy endpoint
        if (typeof window !== 'undefined' && url.startsWith('http') && !endpoint.startsWith('http')) {
          response = await fetch(endpoint, {
            ...options,
            headers,
            signal: controller.signal
          });
        } else {
          throw fetchErr;
        }
      }

      clearTimeout(timeoutId);

      // Capture WooCommerce Cart-Token & Nonce from response headers
      const resCartToken = response.headers.get('cart-token');
      if (resCartToken) {
        this.setCartToken(resCartToken);
      }
      const resNonce = response.headers.get('nonce');
      if (resNonce) {
        this.setNonce(resNonce);
      }

      const contentType = response.headers.get('content-type') || '';
      let data = null;
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        const errorMsg = data?.message || response.statusText || 'API Request Failed';
        const err = new Error(errorMsg);
        err.status = response.status;
        err.data = data;
        throw err;
      }

      return data;
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new Error(`WordPress API request timed out after ${WP_CONFIG.timeoutMs}ms`);
      }
      throw err;
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: typeof body === 'string' ? body : JSON.stringify(body)
    });
  }
}

export const wpClient = new WpApiClient();
