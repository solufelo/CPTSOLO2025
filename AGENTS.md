# Agent orchestration — captainsoloHQ

**Human:** Solomon Olufelo · **Live site:** https://captainsolo.ca · **Repo:** `captainsoloHQ`

Agents (Antigravity IDE, Cursor, etc.) follow this loop. **One modular task per session.** Human reviews before production deploy.

---

## North star

Portfolio that sells **code + motion + video** with honest WIP labels, live Netlify demos where they exist, and a stable cPanel production site.

---

## Session protocol (every agent run)

```
1. READ   → This file + docs/ROADMAP-URGENCY-MATRIX.md + docs/AGENT-SESSION-LOG.md (latest entry)
2. PICK   → Exactly ONE task from "Active queue" below (or human-assigned P0)
3. SCOPE  → Touch only files listed in that task's "Files allowed"
4. BUILD  → npm run build must pass (see Build commands)
5. REPORT → Append session block to docs/AGENT-SESSION-LOG.md
6. STOP   → Do not deploy to cPanel unless human says "upload"
```

**Never** in one session: refactor Works + Services + Router + backend + DNS.

---

## Safety rails (do not break production)

| Rule | Detail |
|------|--------|
| **No cPanel edits** | Never edit live `public_html` directly; build locally, human uploads zip |
| **No secrets in git** | Never commit `.env`, `.env.production`, Stripe/Supabase keys |
| **No force push** | Never `git push --force` to main |
| **No DNS/hosting** | Unless task is explicitly "DNS/SSL" and human approved |
| **Preserve SSL** | Never delete `public_html/.well-known/` |
| **Minimize diff** | Smallest change that completes the task; no drive-by refactors |
| **Build gate** | If `npm run build` fails, fix or revert — do not hand off broken build |
| **Data-first portfolio** | New projects → `src/data/showcaseProjects.js` only (not scattered constants) |

---

## Build commands

```powershell
cd C:\Users\Administrator\Projects\captainsoloHQ
$env:Path = ".tools\node;$env:Path"
npm run build
```

Deploy zip (human runs when ready):

```powershell
Compress-Archive -Path dist\* -DestinationPath deploy\cpanel\zips\public_html-$(Get-Date -Format yyyyMMdd-HHmm).zip -Force
```

Python backend (separate from frontend):

- Source: `tools/portfolio-backend/`
- Live path: `~/portfolio-backend` (NOT inside `public_html`)
- Entry: `passenger_wsgi.py` → `/api`

---

## Architecture map (where things live)

| Layer | Path | Agent may edit? |
|-------|------|-----------------|
| Portfolio data | `src/data/showcaseProjects.js` | Yes (P1) |
| Homepage sections | `src/sections/*.jsx` | Yes (scoped tasks) |
| Pages / routes | `src/pages/`, `src/AppRouter.jsx` | Yes (add routes only when task says) |
| Shared UI | `src/components/` | Yes (scoped) |
| Legacy constants | `src/constants/index.js` | Prefer migrate → showcaseProjects; avoid big edits |
| Static assets | `public/` | Yes (images, .htaccess) |
| Apply pipeline | `tools/apply-pipeline/` | Yes (profile/jobs only) |
| Backend API | `tools/portfolio-backend/` | Yes (contact/Stripe tasks) |
| Deploy artifacts | `deploy/cpanel/` | Yes (zips, ssl) |
| Docs / roadmap | `docs/` | Yes |
| Live DNS/SSL docs | historical | Read-only unless DNS task |

---

## Active queue (pick ONE per session)

Update checkboxes in `docs/AGENT-SESSION-LOG.md` when human confirms deploy.

### P0 — Critical

#### TASK-P0-CONTACT — Contact form → email
- **Goal:** Contact form submits to cPanel Python API → `work@captainsolo.ca`
- **Files allowed:** `tools/portfolio-backend/`, `src/components/ContactForm.jsx`, `src/lib/*`, `.env.example` / `cpanel.env.example`
- **Files forbidden:** `Works.jsx`, `AppRouter.jsx`, DNS, unrelated sections
- **Done when:** POST `/api/contact` returns 200; human receives test email
- **Status:** [ ] Not started

#### TASK-P0-SHOWCASE-DEPLOY — Ship showcase UI to production
- **Goal:** Human uploads latest showcase build; verify `#work` filters + cards on live site
- **Files allowed:** none (deploy only) OR fix build blockers in showcase files
- **Done when:** https://captainsolo.ca/#work shows filter tabs + Demo/GitHub buttons
- **Status:** [ ] Build ready — human must upload `public_html-showcase-*.zip`

### P1 — High (modular, safe)

#### TASK-P1-NETLIFY-URLS — Fill demo URLs
- **Goal:** Add Netlify `demoUrl` for each WIP dev project in showcaseProjects
- **Files allowed:** `src/data/showcaseProjects.js` only
- **Done when:** Each dev project has `demoUrl` or explicit `null` with comment why
- **Status:** [ ] Waiting on human to paste URLs

#### TASK-P1-SERVICES-HOVER — Replace Services cursor-hover
- **Goal:** Same card/hover pattern as Works (no GSAP cursor chase)
- **Files allowed:** `src/sections/Services.jsx`, optional small shared component
- **Forbidden:** Works.jsx, Router, backend
- **Done when:** Service items show stable hover preview; build passes
- **Status:** [ ] Not started

#### TASK-P1-CUT-REDUNDANT — Hide dead UI
- **Goal:** Remove placeholder testimonials; hide admin/login from nav when no auth keys
- **Files allowed:** `src/constants/index.js` (testimonials), `src/sections/Navbar.jsx`, `App.jsx` (only if removing ServiceSummary)
- **Done when:** No fake testimonials visible; nav cleaner
- **Status:** [ ] Not started

### P2 — Medium (new pages, thin shells)

#### TASK-P2-WORK-CODE — `/work/code` page
- **Goal:** Route + page that renders `filterShowcaseProjects(..., 'development')`
- **Files allowed:** `src/pages/WorkCodePage.jsx` (new), `AppRouter.jsx` (one route), reuse `ProjectShowcaseCard`
- **Forbidden:** Backend, constants overhaul
- **Status:** [ ] Not started

#### TASK-P2-WORK-VIDEO — `/work/video` page
- **Same pattern as WORK-CODE** with category `video`
- **Status:** [ ] Not started

#### TASK-P2-CASE-STUDY-BLOG — Migration case study post
- **Goal:** Blog post: Netlify → cPanel migration (SEO + credibility)
- **Files allowed:** `src/pages/blog/` (new post), `AppRouter.jsx` (one route)
- **Status:** [ ] Not started

### P3 — Later (needs human keys)

#### TASK-P3-STRIPE-SUPABASE — Payments + auth
- **Blocked until:** Human provides `.env.production` keys
- **Files allowed:** env examples, backend env docs, order pages (minimal)
- **Status:** [ ] Blocked

---

## Modular page roadmap (do not build all at once)

```
Phase A (now)     #work filters + showcaseProjects data
Phase B           /work/code, /work/video (thin wrappers)
Phase C           /work/motion
Phase D           Cut redundant sections
Phase E           Stripe/auth when keys exist
```

---

## Definition of done (all tasks)

- [ ] `npm run build` exits 0
- [ ] Change matches single task scope
- [ ] Session logged in `docs/AGENT-SESSION-LOG.md`
- [ ] Human told: what changed, what to test, whether upload needed
- [ ] No secrets committed

---

## Human review checklist (before upload)

1. Open `https://captainsolo.ca` — homepage loads
2. `#work` — filters, cards, links work
3. `/demo` — interactive dashboard loads
4. Contact form — only after P0-CONTACT deployed
5. `.well-known` still present in cPanel (do not delete on upload)

---

## Source of truth for copy/facts

| Facts (jobs, bio, dates) | `tools/apply-pipeline/profile.yml` |
| Portfolio entries | `src/data/showcaseProjects.js` |
| Contact email | `work@captainsolo.ca` |
| Priority order | `docs/ROADMAP-URGENCY-MATRIX.md` |

---

## Antigravity / agent prompt starter (copy-paste)

```
You are working on captainsoloHQ. Read AGENTS.md and docs/ROADMAP-URGENCY-MATRIX.md first.
Pick ONE task from Active queue (or human-assigned task ID).
Follow Safety rails. Run npm run build before finishing.
Log your session in docs/AGENT-SESSION-LOG.md.
Do not deploy to cPanel. Report what Solomon should test.
```
