# Inbetween Workshops

A Next.js rebuild of the Inbetween Workshops site with a built-in `/admin` CMS.
One deployment serves both:

- the public site — `/`, `/workshops`, `/schedule`, `/stories`, `/about`
- the admin panel — `/admin` (password-protected)

Content lives in Supabase (Postgres). Editing something in `/admin` updates
the database and the public pages immediately — no redeploy needed.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free project.
2. In **Project Settings → API**, copy:
   - Project URL
   - `anon` `public` key
   - `service_role` key (keep this secret — server-side only)

## 2. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

- `ADMIN_PASSWORD` is whatever password you want to log into `/admin` with.
- `ADMIN_SESSION_SECRET` should be a long random string, e.g. generate one with:
  ```
  openssl rand -base64 32
  ```

## 3. Create the database schema

In the Supabase dashboard, open **SQL Editor**, paste the contents of
[`supabase/schema.sql`](supabase/schema.sql), and run it. This creates every
content table with public read access (row-level security) and seeds one
empty row for each singleton section (hero, about, settings).

## 4. Seed real starter content (optional but recommended)

```bash
npm install
npm run seed
```

This downloads the real photos from the reference site, re-hosts them in a
Supabase Storage bucket called `content-images`, and fills every table with
the actual copy from that site (workshops, the Sep 5 schedule session,
stories, Instagram grid, etc.) so the site isn't empty on first run.

## 5. Run it

```bash
npm run dev
```

- Public site: http://localhost:3000
- Admin panel: http://localhost:3000/admin (redirects to `/admin/login`)

## Deploying

Deploy like any Next.js app (Vercel, Railway, Render, a Node server, etc.)
and set the same environment variables in your host's dashboard. Because
content lives in Supabase rather than in the codebase, editing the live site
through `/admin` never requires a redeploy.

## How the admin panel maps to the site

| Admin section (`/admin/...`) | Live page it controls |
| --- | --- |
| `/admin/home` | Home page hero banner |
| `/admin/workshops` | `/workshops` — the full workshop list (first 3 also show on the homepage) |
| `/admin/schedule` | `/schedule` — dated sessions |
| `/admin/stories` | `/stories` — blog posts |
| `/admin/about` | `/about` — story & three pillars |
| `/admin/settings` | Site-wide: nav logo, footer, contact info, and the WhatsApp/Instagram link every "Book a seat" button uses |

Every editor page repeats this mapping at the top so it's always clear what
a save affects, with a "View live page" link to check the result.

## Notes

- Images are edited as a URL (paste any hosted image link) — there's no
  upload button. `npm run seed` re-hosts the original site's photos in
  Supabase Storage so you have real starting URLs to replace over time.
- "Book a seat" buttons open a WhatsApp or Instagram DM (configurable in
  `/admin/settings`) — there's no in-app booking form or payment processing.
