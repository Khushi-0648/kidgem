/**
 * Minimal Supabase REST (PostgREST) client for serverless functions.
 * Uses the service_role key, which must stay server-side only - it bypasses
 * Row Level Security, so it must never be exposed to the browser.
 */

export function supabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Inserts a row into a table. Pass `onConflict` to upsert instead
 * (merges into the existing row rather than erroring on a duplicate key).
 */
export async function supabaseInsert(table, row, { onConflict } = {}) {
  const url = new URL(`${process.env.SUPABASE_URL}/rest/v1/${table}`);
  if (onConflict) url.searchParams.set('on_conflict', onConflict);

  const prefer = onConflict ? 'resolution=merge-duplicates,return=minimal' : 'return=minimal';

  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: prefer
    },
    body: JSON.stringify(row)
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Supabase insert into "${table}" failed: ${res.status} ${text}`);
  }
}

/**
 * Counts rows from a given IP created within the last `windowMinutes`.
 * Used to rate-limit public form endpoints - without this, anyone can
 * script unlimited requests against /api/contact or /api/subscribe to
 * burn through the Resend quota or spam arbitrary recipients using the
 * store's sender identity.
 */
export async function supabaseCountRecentByIp(table, ip, windowMinutes) {
  const since = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString();
  const url = new URL(`${process.env.SUPABASE_URL}/rest/v1/${table}`);
  url.searchParams.set('select', 'id');
  url.searchParams.set('ip', `eq.${ip}`);
  url.searchParams.set('created_at', `gte.${since}`);

  const res = await fetch(url.toString(), {
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: 'count=exact',
      Range: '0-0'
    }
  });

  if (!res.ok) {
    // Fail open on our own infra hiccup - a broken rate-limit check
    // shouldn't take down the whole contact form.
    return 0;
  }

  const contentRange = res.headers.get('content-range'); // e.g. "0-0/3"
  const total = contentRange ? parseInt(contentRange.split('/')[1], 10) : NaN;
  return Number.isFinite(total) ? total : 0;
}

export function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}
