/**
 * Routing and URL path mapping utilities for KidzGem Store
 */

import { CATEGORIES } from '../data/products';

export const LEGAL_PAGES = ['privacy-policy', 'terms-conditions', 'shipping-policy', 'refund-policy'];

const VALID_CATEGORY_IDS = CATEGORIES.map((c) => c.id);

export const parseUrlRoute = () => {
  if (typeof window === 'undefined') return { page: 'home', category: 'all' };
  const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const searchParams = new URLSearchParams(window.location.search);

  if (pathname === '' || pathname === '/' || pathname === '/home') {
    return { page: 'home', category: 'all' };
  }
  if (pathname === '/categories') {
    return { page: 'categories', category: 'all' };
  }
  if (pathname.startsWith('/category/')) {
    const catId = pathname.replace('/category/', '').trim();
    if (!VALID_CATEGORY_IDS.includes(catId)) {
      return { page: 'not-found', category: 'all' };
    }
    return { page: 'category-detail', category: catId };
  }
  if (pathname === '/shop') {
    const catParam = searchParams.get('category');
    return { page: 'shop', category: catParam || 'all' };
  }
  if (pathname === '/about') {
    return { page: 'about', category: 'all' };
  }
  if (pathname === '/contact') {
    return { page: 'contact', category: 'all' };
  }
  if (pathname === '/backend' || pathname === '/admin/backend') {
    return import.meta.env.DEV ? { page: 'backend', category: 'all' } : { page: 'not-found', category: 'all' };
  }
  const legalMatch = LEGAL_PAGES.find((key) => pathname === `/${key}`);
  if (legalMatch) {
    return { page: legalMatch, category: 'all' };
  }
  return { page: 'not-found', category: 'all' };
};

export const getPathForRoute = (page, category = null) => {
  if (page === 'home') return '/';
  if (page === 'categories') return '/categories';
  if (page === 'category-detail') {
    return category && category !== 'all' ? `/category/${category}` : '/categories';
  }
  if (page === 'shop') {
    return category && category !== 'all' ? `/shop?category=${category}` : '/shop';
  }
  if (page === 'about') return '/about';
  if (page === 'contact') return '/contact';
  if (page === 'backend') return '/backend';
  if (LEGAL_PAGES.includes(page)) return `/${page}`;
  return '/';
};
