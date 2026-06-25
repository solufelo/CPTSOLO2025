# Agent session log

Human reviews this file to see what agents did. **One task per session.** Check off when deployed to production.

---

## How to log (agents append this block)

```markdown
### YYYY-MM-DD — TASK-ID — [Agent name]
**Scope:** one sentence
**Files changed:** list
**Build:** pass / fail
**Human action needed:** upload zip / paste Netlify URLs / none
**Test URLs:** https://captainsolo.ca/...
**Notes:** anything Solomon should know
```

---

### 2026-06-24 — TASK-PORTAL — [Cursor]
**Scope:** Built the client portal (project tracker + deliverables + notifications) on top of the existing orders system; archived Captain Funds live demo.
**Files changed:**
- `src/lib/projectStatus.js` (new) — delivery stages (intake → in-progress → review → delivered → closed) with legacy mapping
- `tools/portfolio-backend/server.py` — `POST /api/admin/create-client-project`, `POST /api/project/notify`, admin auth helpers
- `src/components/orders/DeliverablesPanel.jsx` (new) — client download list; admin add via Drive/URL link or self-hosted upload
- `src/pages/OrderDetailPage.jsx` — real deliverables panel, stage labels, project framing
- `src/pages/admin/AdminOrdersPage.jsx` — "New project" form, stage buttons, client email notify on stage change
- `src/pages/Dashboard.jsx` — client view reframed as "Your Projects" with stages
- `src/data/showcaseProjects.js` — Captain Funds → live, demoUrl `captainfunds.netlify.app`, local thumbnail
- `public/assets/projects/captainfunds.png`, `references/site-archives/captainfunds-2026-06-24.png` (new), `references/README.md`
**Build:** pass (`npm run build`, 6.5s)
**Human action needed:** none for build; portal flows (create/upload/notify) require the Python backend (cPanel) to exercise — they fall back gracefully without it.
**Test URLs:** `/dashboard/admin/orders` (admin: create project, set stage) → `/order/:id` (deliverables, chat) ; client sees `/dashboard`
**Notes:** Admin-created accounts (email + temp password shown to share). Deliverables host on your own side: Drive/URL link works immediately; file upload uses `/api/upload` (set `UPLOAD_DIR`/`UPLOAD_URL_PREFIX` on cPanel). Status-change + new-deliverable emails go out via SMTP when configured. No commerce/Stripe paths touched.

---

### 2026-06-24 — TASK-PERF — [Cursor]
**Scope:** Global marquee overlap fix + site-wide load/caching efficiency, no regressions.
**Files changed:**
- `src/components/Marquee.jsx` — build the loop only after `document.fonts.ready` (+rAF) so text widths are measured correctly (root cause of overlap); rebuild on resize; `clearProps` on every (re)build and teardown so re-inits can't compound; null-safe refs. Used everywhere a marquee appears (ContactSummary ×2, Contact, ContactPage) → one global fix.
- `src/AppRouter.jsx` — route-based code splitting via `React.lazy` + `Suspense` for every non-homepage route (blog, admin, orders, dashboard, demo, legal). Homepage stays eager for instant first paint.
- `public/.htaccess` — `Cache-Control: immutable` (1yr) for fingerprinted assets, `no-cache` for index.html, `no-store` for /api, plus gzip via mod_deflate.
**Build:** pass — initial homepage JS 2,061 kB → **472 kB** (gzip 552 → 159 kB). Per-route chunks (7–50 kB) + three.js split into its own `PlanetScene` chunk (1,003 kB) loaded after first paint.
**Also changed:** `src/components/PlanetScene.jsx` (new — extracted Hero's 3D scene), `src/sections/Hero.jsx` (lazy-loads PlanetScene via Suspense, no longer pulls three.js into the main bundle).
**Human action needed:** none for build. On next cPanel upload the new `.htaccess` ships automatically (it's in `public/`); repeat visits will hit cache. Keep the Passenger block intact (preserved).
**Test URLs:** homepage marquees (Ship/Build/Edit/Deploy + email band) verified seamless at rest and under rapid scroll; hero planet renders via lazy load; lazy routes load with a brief spinner.
**Notes:** Did NOT add manual vendor chunking for react/react-dom — the config has an explicit React-19 load-order warning against it. three.js is now component-lazy (safe) instead, which is where most of the homepage weight was.

---

### 2026-06-24 — TASK-A11Y — [Cursor]
**Scope:** Accessibility pass A→Z + lock white/blue (light) as the default theme. Ship-ready.
**Files changed:**
- `index.html` — pre-paint inline script applies saved/`light` theme to `<html>` (no flash); `color-scheme: light`; `theme-color` → `#fafafa`.
- `src/context/ThemeContext.jsx` — keeps native `color-scheme` in sync on theme change (default already `light`).
- `src/index.css` — `.skip-link` (hidden until focused), global `:focus-visible` ring (theme-accent), `@media (prefers-reduced-motion: reduce)` killing transitions/animations/smooth-scroll.
- `src/AppRouter.jsx` — "Skip to content" link + single `<main id="main-content">` landmark wrapping all routes.
- `src/sections/Navbar.jsx` — hamburger `<div>` → `<button>` with `aria-label`/`aria-expanded`/`aria-controls`; nav labeled landmark (`aria-label="Main navigation"`); Escape closes + returns focus; decorative bars `aria-hidden`.
- `src/components/ContactForm.jsx` — status message is a live region (`role=alert/status`, `aria-live`).
- `src/components/ProjectShowcaseCard.jsx` — unique link names ("Live demo — <project>"), decorative icons `aria-hidden`, preview img alt + `loading="lazy"`, decorative video `aria-hidden`.
- `src/components/Marquee.jsx` — respects reduced-motion (renders static), decorative marquee `aria-hidden` so SR doesn't read repeated text.
**Build:** pass — initial homepage JS ~473 kB (gzip ~160 kB), unchanged from prior perf pass.
**Human action needed:** none for build. Verified in browser: default theme = white/blue (planet ring blue), nav/links/landmarks correct in the a11y tree, hamburger exposes expanded state, project links uniquely named, marquee text removed from SR tree.
**Notes:** Skip-link `:focus` reveal couldn't be screenshotted (automation window-focus quirk) but uses the standard pattern with correct specificity. Light palette already meets ~AA; added visible focus rings everywhere.

---

### 2026-06-24 — TASK-DEPLOY — [Cursor]
**Scope:** Production build + cPanel deploy zip; marquee motion restored (a11y pass had blocked GSAP loop when `prefers-reduced-motion` matched).
**Files changed:** `src/components/Marquee.jsx` (always run loop; scroll boost only when motion OK; ref retry)
**Build:** pass
**Deploy zip:** `deploy/cpanel/zips/public_html-20260624-1931.zip` (~398 MB — includes video assets)
**Human action needed:** Upload zip to cPanel `public_html` (see instructions in chat). Restart Python app after upload.

---

## Production deploy log (human)

| Date | Zip uploaded | Verified by Solomon | Notes |
|------|--------------|---------------------|-------|
| 2026-06-23 | public_html-20260623-1559.zip | Yes | Initial cPanel React deploy |
| | velare-20260623-1729.zip | Pending | Velare subdomain — DNS + cPanel first |

---

## Task status (sync with AGENTS.md)

| Task ID | Status | Last agent | Notes |
|---------|--------|------------|-------|
| P0-SHOWCASE-DEPLOY | Build ready | Cursor | Upload showcase zip |
| P0-CONTACT | Not started | — | |
| P1-NETLIFY-URLS | Done (CF pending) | Cursor | Velare/Suburbia/CinemaVerse wired; captainfunds 404 |
| P1-SERVICES-HOVER | Done | Cursor | Inline preview cards; data in servicesData.js |
| P1-CUT-REDUNDANT | Partial | Cursor | Pricing + ServiceSummary removed; auth nav gated; fake testimonials cleared |
| P2-WORK-CODE | Not started | — | |
| P2-WORK-VIDEO | Not started | — | |
| P2-CASE-STUDY-BLOG | Not started | — | |
| P3-STRIPE-SUPABASE | Blocked | — | Needs env keys |

---

## Sessions

### 2026-06-23 — P0-SHOWCASE + ROADMAP — Cursor
**Scope:** Rebuilt Works with ProjectShowcaseCard, showcaseProjects data, filters, navbar demos link
**Files changed:** `src/data/showcaseProjects.js`, `src/components/ProjectShowcaseCard.jsx`, `src/sections/Works.jsx`, `src/sections/Navbar.jsx`, `docs/ROADMAP-URGENCY-MATRIX.md`
**Build:** pass (`index-fM8RCQUC.js`)
**Human action needed:** Upload `deploy/cpanel/zips/public_html-showcase-20260623-1704.zip`
**Test URLs:** https://captainsolo.ca/#work , https://captainsolo.ca/demo
**Notes:** Fill `demoUrl` in showcaseProjects when Netlify URLs available

---

### 2026-06-23 — P1-VELARE-SUBDOMAIN — Cursor
**Scope:** Cloned velare-site, static export build, cPanel subdomain deploy zip + docs
**Files changed:** `velare-site/next.config.ts`, `velare-site/package.json`, `deploy/cpanel/velare/.htaccess`, `scripts/prepare-velare-subdomain.ps1`, `docs/setup/VELARE-SUBDOMAIN-DEPLOY.md`, `src/data/showcaseProjects.js`
**Build:** pass (Next static export, 9 pages)
**Human action needed:** (1) cPanel subdomain `velare` (2) DNS A `velare` → `67.223.118.113` (3) upload `velare-20260623-1729.zip` (4) SSL AutoSSL (5) rebuild main site after live
**Test URLs:** https://velare.captainsolo.ca , https://velare.captainsolo.ca/ion/
**Notes:** ~106 MB zip (GLB + video). Status stays `wip` until subdomain verified.

<!-- Agents: append new sessions below -->

### 2026-06-24 — SHOWCASE-CMS — Cursor
**Scope:** Data-driven portfolio showcase — add/edit Works projects from an admin UI (no code edits). Reuses the existing `/api/db` CRUD + auth + blog-editor pattern, with a static fallback so the public site never breaks.
**Files changed:** `tools/portfolio-backend/server.py` (new `projects` table, public read for `published=1`, `POST /api/upload` base64 image/video endpoint), `src/data/showcaseProjects.js` (`mapProjectRow` + `loadShowcaseProjects` loader with fallback), `src/sections/Works.jsx` (loads from API, static initial state), `src/pages/admin/AdminProjectsPage.jsx` (new — CRUD, image upload, publish, sort, seed button), `src/AppRouter.jsx` (`/dashboard/admin/projects` route), `src/pages/admin/AdminDashboard.jsx` (Projects/Showcase tile)
**Build:** pass (`npm run build` → `index-Cr_7zIqJ.js`, built in 7.28s); homepage `#work` verified rendering in browser via static fallback (backend not running locally — no Python on box)
**Human action needed:** (1) Deploy build to cPanel. (2) On cPanel set backend env: `UPLOAD_DIR=~/public_html/assets/projects/uploads` and `UPLOAD_URL_PREFIX=/assets/projects/uploads` so admin image uploads land in a web-served dir. (3) Log in as admin → `/dashboard/admin/projects` → click **Seed built-in projects** once to populate the table, then manage from the UI. (4) Set `VITE_ENABLE_AUTH=true` for the admin login to show.
**Test URLs:** http://localhost:5173/#work (fallback render OK), /dashboard/admin/projects (needs backend + admin login)
**Notes:** Public read is gated to `published=1` only (same carve-out as blog_posts). If no projects are published/seeded, the site falls back to the static `showcaseProjects` array — so it always renders. Admin check is email-based (existing pattern). Python not installed locally → backend/upload/seed flows must be verified on cPanel (or a box with Python). Client-portal CMS (deliverables/notifications) remains separate future work in `docs/CMS-PLAN.md`.

### 2026-06-24 — SOURCE-ARCHIVE + CMS-PLAN — Cursor
**Scope:** Archived own copies of live-demo source content (reduce dependence on third-party hosts/posts) and wrote the project-CMS implementation plan for later
**Files changed:** `references/README.md` (new), `references/site-archives/*.png` (new: cinemaverse/velare/suburbia visual archives), `docs/CMS-PLAN.md` (new), `docs/AGENT-SESSION-LOG.md`
**Build:** n/a (docs + reference assets only; `references/` kept out of `dist`)
**Human action needed:** Paste live Captain Funds Netlify URL so it can be snapshotted/archived; confirm CMS is a *post-deploy* task
**Test URLs:** none (no app code changed)
**Notes:** Confirmed reel `.mp4`s + project thumbnails are already self-hosted, so cards survive if an IG post / Netlify demo dies (only outbound `demoUrl` links break). Verified both `suburbia-solo` and `suburbia-skate` Netlify sites are live (demoUrl is fine). **CMS scope corrected per Solomon:** it's a *client project tracker + deliverables + notifications* (self-hosted via Drive/cPanel), NOT a portfolio uploader — `docs/CMS-PLAN.md` rewritten to reuse the existing orders/order_files/order_messages/revisions + email-notification infra (~70% already built; mostly reframe order→project + add deliverable upload/download + status/delivery notifications).

### 2026-06-24 — LIVE-THUMBNAILS — Cursor
**Scope:** Captured real screenshots of every live/hosted project and wired them as Works card thumbnails (previous `/assets/projects/*.jpg` paths were all broken — that folder was empty)
**Files changed:** `src/data/showcaseProjects.js`, new images in `public/assets/projects/` (cinemaverse.png, velare.png, suburbia.png, captainsolo.png, findyou.png, light-years.png)
**Build:** pass (`index-DT6M268b.js`, `built in 6.40s`); 6 snapshots confirmed copied into `dist/assets/projects/`
**Human action needed:** Provide live URL for **Captain Funds** (Netlify "captainfunds" currently 404) so I can snapshot it — still using `/images/captainfunds1.png` placeholder. Then upload new build zip to cPanel.
**Test URLs:** http://localhost:5173/#work (hover cards / mobile shows previews)
**Notes:** Snapshots taken live from cinemaverse-solo / velare-site / suburbia-solo netlify + localhost hero + /demo widgets (findYOU, Light Years). Video reels still use Instagram-sourced jpgs (can't auto-snapshot reels behind login).

### 2026-06-24 — ELEGANCE-PASS (About + Contact + meta + CSS fix) — Cursor
**Scope:** Site-wide elegance/redundancy pass — real portrait + restructured bio in About, simplified contact form (dropped Pricing-era package options + dead auto-fill), polished subtitles/SEO, removed remaining Laurier claim, fixed CSS `@import` build-breaker
**Files changed:** `src/sections/About.jsx`, `src/components/ContactForm.jsx`, `src/sections/Works.jsx`, `src/data/showcaseProjects.js`, `src/index.css`, `index.html`, `public/images/solomon-portrait.png` (new)
**Build:** verified via Vite dev server HMR (clean compile, prior `@import` PostCSS error resolved); `npm run build` not run — Shell tool was non-responsive this session
**Human action needed:** Run `npm run build` to produce dist + zip when Shell works; then upload to cPanel
**Test URLs:** http://localhost:5173/#about , http://localhost:5173/ , http://localhost:5173/demo
**Notes:** Fonts (Oswald + IBM Plex Sans) now loaded via `<link>` in index.html instead of CSS `@import` (Tailwind v4 inlines `@import "tailwindcss"` and pushed the font import out of valid order). Contact form options are now generic (Web app / Website / Video / Other). Portrait is a placeholder swap as requested.

### 2026-06-24 — P1-DEBLOAT + SERVICES — Cursor
**Scope:** Removed pricing/packages bloat; Services hover → stable inline cards; auth UI gated until API live
**Files changed:** `src/App.jsx`, `src/sections/Services.jsx`, `src/sections/Hero.jsx`, `src/sections/Contact.jsx`, `src/sections/Navbar.jsx`, `src/pages/ContactPage.jsx`, `src/data/servicesData.js`, `src/components/ServiceCard.jsx`, `src/lib/featureFlags.js`, `src/constants/index.js`, `.env.example`, `package.json`
**Build:** pass (`index-DwKv8Eh_.js`)
**Human action needed:** Local test `npm run dev` + `npm run dev:api`; set `VITE_ENABLE_AUTH=true` in `.env.local` to test login; upload zip when satisfied
**Test URLs:** http://localhost:5173/#services , http://localhost:5173/#work , http://localhost:8081/api/auth/session (with dev:api)
**Notes:** Pricing.jsx kept on disk (not mounted). Order routes still exist behind auth flag.

### 2026-06-23 — P1-PORTFOLIO-DEMOS — Cursor
**Scope:** Netlify demo URLs + cPanel zip pipeline for velare, suburbia, captain-funds
**Files changed:** `src/data/showcaseProjects.js`, `src/data/portfolioDemos.js`, `scripts/prepare-portfolio-subdomain.ps1`, `docs/setup/PORTFOLIO-DEMOS-PIPELINE.md`, suburbia/velare next.config in sibling repos
**Build:** pass — zips: velare-20260623-1737 (106MB), suburbia (72MB), captain-funds (0.8MB)
**Human action needed:** Upload showcase zip to main site; fix captainfunds Netlify 404; paste CF URL; cPanel subdomains when ready
**Test URLs:** velare-site.netlify.app, suburbia-solo.netlify.app, cinemaverse-solo.netlify.app
**Notes:** CinemaVerse stays Netlify (Wasp). sparkling-llama archived reference only.

