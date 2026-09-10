import { Sparkles, Shirt, Smile, Car, PenTool, BookOpen, Boxes, Watch, Gift, Gamepad2 } from 'lucide-react';

/**
 * Shared category -> icon mapping, matching the icon names already used
 * in CATEGORIES (src/data/products.js), so every part of the site renders
 * the same icon for a given category instead of ad-hoc emoji per component.
 */
export const CATEGORY_ICONS = {
  all: Sparkles,
  clothing: Shirt,
  toys: Smile,
  'remote-car': Car,
  stationery: PenTool,
  'learning-sets': BookOpen,
  'building-blocks': Boxes,
  accessories: Watch,
  'gift-items': Gift,
  'indoor-games': Gamepad2
};

export function getCategoryIcon(categoryId) {
  return CATEGORY_ICONS[categoryId] || Sparkles;
}
