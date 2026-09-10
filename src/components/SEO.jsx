import { useStore } from '../context/StoreContext';
import { useSEO } from '../hooks/useSEO';
import { PAGE_SEO, getCategorySEO } from '../data/seoConfig';
import { LEGAL_DOCS } from '../data/legalContent';
import { getPathForRoute, LEGAL_PAGES } from '../utils/routes';

function resolveSEO(currentPage, selectedCategory) {
  if (currentPage === 'not-found') {
    return {
      title: '404 - Page Not Found | KidzGem',
      description: 'The page you\'re looking for could not be found on KidzGem.',
      path: typeof window !== 'undefined' ? window.location.pathname : '/404',
      noindex: true
    };
  }
  if (currentPage === 'category-detail') {
    return getCategorySEO(selectedCategory);
  }
  if (currentPage === 'shop' && selectedCategory && selectedCategory !== 'all') {
    const catSeo = getCategorySEO(selectedCategory);
    return { ...catSeo, path: getPathForRoute('shop', selectedCategory) };
  }
  if (LEGAL_PAGES.includes(currentPage)) {
    const doc = LEGAL_DOCS[currentPage];
    return {
      title: `${doc.title} | KidzGem`,
      description: doc.intro,
      keywords: `${doc.title}, KidzGem policies, kids toys store policies`,
      path: `/${currentPage}`
    };
  }
  return PAGE_SEO[currentPage] || PAGE_SEO.home;
}

export const SEO = () => {
  const { currentPage, selectedCategory } = useStore();
  const seo = resolveSEO(currentPage, selectedCategory);
  useSEO(seo);
  return null;
};
