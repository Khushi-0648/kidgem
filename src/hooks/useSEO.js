import { useEffect } from 'react';

const SITE_URL = 'https://kidzgem.com';
const DEFAULT_OG_IMAGE = 'https://kidzgem.com/wp-content/uploads/2025/11/bubble-gun.webp';

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Updates document title, meta description/keywords, Open Graph, Twitter
 * card tags, and the canonical link for the current SPA "page". There is
 * no server-side router here, so this is the practical way to keep each
 * view's <title>/<meta> accurate for search engines and link previews.
 */
export function useSEO({ title, description, keywords, path = '/', noindex = false }) {
  useEffect(() => {
    if (title) document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'keywords', keywords);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', `${SITE_URL}${path}`);
    upsertMeta('property', 'og:image', DEFAULT_OG_IMAGE);
    upsertMeta('property', 'og:site_name', 'KidzGem');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', DEFAULT_OG_IMAGE);

    // A 404's URL isn't a real canonical page - leave any existing canonical
    // (e.g. from the previous route) rather than pointing it at a bad URL.
    if (!noindex) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', `${SITE_URL}${path}`);
    }
  }, [title, description, keywords, path, noindex]);
}
