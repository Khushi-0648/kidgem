/**
 * Per-page SEO metadata (title/description/keywords) for the KidzGem SPA.
 * Keyword lists target genuine buyer search intent in the kids-toys/kids-
 * fashion e-commerce space (what shoppers actually type into Google), the
 * same space competitors like large toy marketplaces and kids-fashion
 * retailers rank for - rather than naming competitor brands directly.
 */

const BASE_KEYWORDS =
  'kids toys online India, buy toys online, online toy store India, non-toxic toys for kids, ' +
  'certified safe kids toys, kids clothing online India, remote control cars for kids, ' +
  'STEM toys India, building blocks toys, kids gift hampers online, birthday gifts for kids, ' +
  'indoor games for kids, kids stationery online, best toys for children, KidzGem';

export const PAGE_SEO = {
  home: {
    title: 'KidzGem | Buy Kids Toys, Clothing & Gifts Online in India',
    description:
      'Shop certified non-toxic kids toys, organic kids clothing, remote control cars, STEM learning sets, and birthday gift hampers online at KidzGem. Free shipping over ₹499, zero-login guest checkout, and pan-India delivery.',
    keywords: BASE_KEYWORDS,
    path: '/'
  },
  shop: {
    title: 'Shop All Toys & Kids Essentials Online | KidzGem',
    description:
      'Browse KidzGem\'s full catalog of non-toxic toys, kids clothing, remote control cars, STEM sets, building blocks, and gifts. Filter by price and category, with free shipping over ₹499.',
    keywords: `shop kids toys online, ${BASE_KEYWORDS}`,
    path: '/shop'
  },
  categories: {
    title: 'Shop by Category | Kids Toys, Clothing & More | KidzGem',
    description:
      'Explore KidzGem\'s curated play categories - toys, remote control cars, STEM & learning sets, building blocks, kids clothing, stationery, accessories, gifts, and indoor games.',
    keywords: `kids toy categories, shop by category kids products, ${BASE_KEYWORDS}`,
    path: '/categories'
  },
  about: {
    title: 'About KidzGem | Certified Safe Kids Toys Brand',
    description:
      'Learn about KidzGem, an India-based online store for BIS-tested, non-toxic kids toys, clothing, and learning products, trusted by thousands of parents.',
    keywords: `about KidzGem, certified safe kids toys brand India, ${BASE_KEYWORDS}`,
    path: '/about'
  },
  contact: {
    title: 'Contact KidzGem | Customer Support & Help',
    description:
      'Get in touch with KidzGem customer support for order help, returns, and product questions. Call +91 99996 59104 or email welcome@kidzgem.com.',
    keywords: 'contact KidzGem, KidzGem customer support, KidzGem phone number, KidzGem email',
    path: '/contact'
  }
};

const CATEGORY_SEO = {
  clothing: {
    name: 'Kids Clothing',
    description: 'Shop organic cotton kids clothing, rompers, and pajama sets online at KidzGem. Hypoallergenic, breathable fabrics safe for sensitive skin.',
    keywords: 'kids clothing online India, organic cotton kids wear, baby rompers online, kids pajamas online'
  },
  toys: {
    name: 'Toys & Playtime Fun',
    description: 'Shop trending non-toxic kids toys online at KidzGem, including the collectible wind-up tin robot and wooden express trains.',
    keywords: 'kids toys online, non-toxic toys India, tin robot toy online, best toys for children'
  },
  'remote-car': {
    name: 'Remote Control Cars',
    description: 'Shop high-speed remote control cars for kids online at KidzGem - 4WD stunt buggies, drift cars, and off-road RC trucks.',
    keywords: 'remote control cars for kids, RC car online India, kids RC buggy, drift car toy'
  },
  stationery: {
    name: 'Art & Stationery',
    description: 'Shop safe, washable kids art and stationery supplies online at KidzGem - pastels, markers, and ergonomic gel pens.',
    keywords: 'kids stationery online, safe art supplies for kids, washable markers for children'
  },
  'learning-sets': {
    name: 'STEM & Learning Sets',
    description: 'Shop award-winning STEM learning toys online at KidzGem - magnetic tile sets, solar planetariums, and science kits.',
    keywords: 'STEM toys India, educational toys for kids, science kits for children, learning toys online'
  },
  'building-blocks': {
    name: 'Building Blocks',
    description: 'Shop building block sets online at KidzGem - food-grade ABS magnetic tiles for towers, castles, and architectural builds.',
    keywords: 'building blocks toys, magnetic tiles for kids, construction toys online'
  },
  accessories: {
    name: 'Kids Accessories',
    description: 'Shop everyday kids accessories online at KidzGem - waterproof LED watches, backpacks, and school gear.',
    keywords: 'kids accessories online, kids backpacks India, kids watches online'
  },
  'gift-items': {
    name: 'Curated Gifts',
    description: 'Shop curated birthday and celebration gift hampers for kids online at KidzGem - snow globes, night projectors, and surprise boxes.',
    keywords: 'kids gift hampers online, birthday gifts for kids, kids gift ideas India'
  },
  'indoor-games': {
    name: 'Indoor Games',
    description: 'Shop screen-free indoor family games online at KidzGem - board games, tabletop arcade sets, and puzzle challenges.',
    keywords: 'indoor games for kids, family board games online, screen-free games for children'
  }
};

export function getCategorySEO(categoryId) {
  const cat = CATEGORY_SEO[categoryId];
  if (!cat) return PAGE_SEO.categories;
  return {
    title: `${cat.name} for Kids Online | KidzGem`,
    description: cat.description,
    keywords: `${cat.keywords}, ${BASE_KEYWORDS}`,
    path: `/category/${categoryId}`
  };
}
