/**
 * Routing and URL path mapping utilities for KidzGem Store
 */

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
    return { page: 'category-detail', category: catId || 'toys' };
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
  return { page: 'home', category: 'all' };
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
  return '/';
};
