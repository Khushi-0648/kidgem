/**
 * Parses the free-text `ageGroup` strings used in the product catalog
 * (e.g. "5+ yrs", "3-6 yrs", "6m-3 yrs", "All Ages") into a [min, max]
 * numeric year range, so products can be matched against filter buckets.
 */
export function parseAgeRange(ageGroup) {
  if (!ageGroup) return [0, 18];
  const str = ageGroup.toLowerCase().replace(/–/g, '-'); // normalize en-dash

  if (str.includes('all ages')) return [0, 18];

  const monthMatch = str.match(/(\d+)\s*m\s*-\s*(\d+)/);
  if (monthMatch) {
    return [parseInt(monthMatch[1], 10) / 12, parseInt(monthMatch[2], 10)];
  }

  const rangeMatch = str.match(/(\d+)\s*-\s*(\d+)/);
  if (rangeMatch) {
    return [parseInt(rangeMatch[1], 10), parseInt(rangeMatch[2], 10)];
  }

  const plusMatch = str.match(/(\d+)\s*\+/);
  if (plusMatch) {
    return [parseInt(plusMatch[1], 10), 18];
  }

  return [0, 18];
}

export const AGE_BUCKETS = [
  { id: 'age-1-3', label: 'Ages 1 – 3', min: 1, max: 3 },
  { id: 'age-4-6', label: 'Ages 4 – 6', min: 4, max: 6 },
  { id: 'age-7-10', label: 'Ages 7 – 10', min: 7, max: 10 },
  { id: 'age-10-plus', label: 'Ages 10+', min: 10, max: 18 }
];

export function productMatchesAgeBucket(product, bucketId) {
  if (!bucketId || bucketId === 'all') return true;
  const bucket = AGE_BUCKETS.find((b) => b.id === bucketId);
  if (!bucket) return true;
  const [pMin, pMax] = parseAgeRange(product.ageGroup);
  return pMin <= bucket.max && pMax >= bucket.min; // ranges overlap
}
