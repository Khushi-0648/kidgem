-- Run this in the Supabase SQL Editor (Project -> SQL Editor -> New query)
-- for the KidzGem contact form and newsletter signups.
-- Safe to re-run: every statement is additive/idempotent.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  phone text,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  created_at timestamptz not null default now()
);

-- IP column + index, used server-side to rate-limit submissions per IP
-- (see api/_lib/supabase.js: supabaseCountRecentByIp). Not exposed to
-- the client and never linked to a person's identity beyond that.
alter table public.contact_messages add column if not exists ip text;
alter table public.newsletter_subscribers add column if not exists ip text;

create index if not exists contact_messages_ip_created_idx
  on public.contact_messages (ip, created_at);
create index if not exists newsletter_subscribers_ip_created_idx
  on public.newsletter_subscribers (ip, created_at);

-- Row Level Security is enabled with NO policies, so only the service_role
-- key (used exclusively by the server-side /api functions, never exposed
-- to the browser) can read/write these tables - the anon/public key can't
-- touch them at all.
alter table public.contact_messages enable row level security;
alter table public.newsletter_subscribers enable row level security;
