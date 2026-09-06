-- Inbetween Workshops content schema.
-- Run this once in the Supabase SQL editor (or `supabase db push`) for a fresh project.

create extension if not exists "pgcrypto";

-- ---------- site_settings (singleton) ----------
create table if not exists site_settings (
  id int primary key default 1 check (id = 1),
  logo_text text not null default 'Inbetween Workshops',
  footer_tagline text not null default 'Small-batch craft workshops across Bangalore. Made in the hours inbetween.',
  contact_email text not null default 'hello@inbetweenworkshops.in',
  address_line text not null default 'Indiranagar, Bangalore',
  whatsapp_number text not null default '',
  instagram_handle text not null default 'inbetweenworkshops',
  instagram_url text not null default 'https://instagram.com/inbetweenworkshops',
  primary_booking_method text not null default 'instagram' check (primary_booking_method in ('whatsapp', 'instagram'))
);

-- ---------- hero_section (singleton) ----------
create table if not exists hero_section (
  id int primary key default 1 check (id = 1),
  heading text not null default 'Photo Embroidery',
  subheading text not null default 'Bring a printed photograph and stitch into it — thread halos, confetti skies, little embroidered notes. No stitching experience needed, we start from the very first knot.',
  featured_title text not null default 'Photo Embroidery',
  featured_date text not null default '5 Sep 2026',
  featured_time text not null default '3:30 PM',
  featured_location text not null default 'Sable Cafe, Indiranagar',
  image_url text not null default '',
  primary_cta_label text not null default 'Book a seat',
  secondary_cta_label text not null default 'All workshops',
  secondary_cta_link text not null default '/workshops'
);

-- ---------- workshops ----------
create table if not exists workshops (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text not null,
  image_url text not null default '',
  sort_order int not null default 0,
  is_active boolean not null default true
);

-- ---------- schedule_events ----------
create table if not exists schedule_events (
  id uuid primary key default gen_random_uuid(),
  workshop_title text not null,
  date text not null,
  time text not null,
  location text not null,
  price_label text not null default '',
  seats_total int not null default 12,
  status text not null default 'open' check (status in ('open', 'waitlist', 'closed')),
  description text not null default '',
  image_url text not null default '',
  is_featured boolean not null default false,
  sort_order int not null default 0
);

-- ---------- stories ----------
create table if not exists stories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  published_date text not null,
  excerpt text not null,
  body text,
  image_url text not null default '',
  sort_order int not null default 0
);

-- ---------- about_page (singleton) ----------
create table if not exists about_page (
  id int primary key default 1 check (id = 1),
  heading text not null default 'Made in the hours inbetween',
  intro_paragraph text not null default 'Inbetween Workshops is a Bangalore-based craft studio for accessible, intimate creative evenings.',
  story_paragraph text not null default 'We started in 2024 with one embroidery evening and eight strangers.',
  image_url text not null default '',
  pillar_1_title text not null default 'Small tables',
  pillar_1_desc text not null default 'Groups capped at 12 so everyone gets real instruction.',
  pillar_2_title text not null default 'Everything included',
  pillar_2_desc text not null default 'All materials, tools and your finished piece are part of the fee.',
  pillar_3_title text not null default 'Absolute beginners',
  pillar_3_desc text not null default 'No prior craft experience needed, ever.'
);

-- ---------- instagram_gallery ----------
create table if not exists instagram_gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  link text not null default '',
  sort_order int not null default 0
);

-- ---------- Row Level Security ----------
-- Public (anon) can read everything. All writes happen server-side with the
-- service-role key from /api/admin/* routes, which are gated by our own
-- signed session cookie (see src/middleware.ts) — so no client write policy exists.
alter table site_settings enable row level security;
alter table hero_section enable row level security;
alter table workshops enable row level security;
alter table schedule_events enable row level security;
alter table stories enable row level security;
alter table about_page enable row level security;
alter table instagram_gallery enable row level security;

create policy "public read" on site_settings for select using (true);
create policy "public read" on hero_section for select using (true);
create policy "public read" on workshops for select using (true);
create policy "public read" on schedule_events for select using (true);
create policy "public read" on stories for select using (true);
create policy "public read" on about_page for select using (true);
create policy "public read" on instagram_gallery for select using (true);

-- ---------- Seed singleton rows (content itself is populated by scripts/seed.ts) ----------
insert into site_settings (id) values (1) on conflict (id) do nothing;
insert into hero_section (id) values (1) on conflict (id) do nothing;
insert into about_page (id) values (1) on conflict (id) do nothing;
