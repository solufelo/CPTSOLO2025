# Captain Solo Site — Urgency Matrix & Top-Down Roadmap

**Agent orchestration:** see `AGENTS.md` + `docs/AGENT-SESSION-LOG.md`

---

## Urgency matrix (do first → do later)

| Priority | Impact | Effort | Task |
|----------|--------|--------|------|
| **P0** | Critical | Low | Fix Works showcase: dual links (Demo + GitHub), reliable hover | ✅ Done — upload showcase zip |
| **P0** | Critical | Med | Python `/api` backend → login, signup, contact form | See `docs/setup/P0-AUTH-BACKEND-FIX.md` |
| **P0** | Critical | Med | Contact form → cPanel Python `/api` + `work@captainsolo.ca` | Same as auth backend |
| **P1** | High | Low | Add Netlify demo URLs to `src/data/showcaseProjects.js` | ✅ Done — captainfunds pending |
| **P1** | High | Med | Filter tabs on Works: All / Code / Video / WIP | ✅ Done — upload showcase zip |
| **P1** | High | Low | Link `/demo` from navbar + Works CTA | ✅ Done |
| **P2** | High | Med | `/work/code` and `/work/video` dedicated pages (thin wrappers first) |
| **P2** | Med | Low | Remove redundant homepage sections (see cut list) | 🔄 Pricing + ServiceSummary off homepage |
| **P2** | Med | Med | Services hover → same card pattern as Works (no cursor-chase) | ✅ Done |
| **P3** | Med | High | Stripe + Supabase keys → orders/login live |
| **P3** | Med | Med | Migration case study blog post |
| **P4** | Low | Med | Photography gallery page |
| **P4** | Low | High | Admin dashboard (hide until auth works) |

---

## Top-down phases

### Phase 1 — Trust & navigation (this week)
- [x] Site live on cPanel
- [ ] Showcase cards with **Live Demo** + **GitHub** + status badge (WIP/Live)
- [ ] Contact form working
- [ ] Navbar: Work, Demos (`/demo`), Contact

### Phase 2 — Portfolio clarity (next)
- [ ] Fill all `demoUrl` fields (Netlify links from your repos)
- [ ] One sentence + stack per project in data file
- [ ] Video row: Instagram/embed or self-hosted reel
- [ ] Internal case study: captainsolo.ca migration

### Phase 3 — Dedicated lanes (modular pages)
```
/work           → filtered showcase (all)
/work/code      → dev + Netlify demos + GitHub
/work/video     → reels + WLU + client work
/work/motion    → motion design / 3D (Velare, planet, etc.)
/demo           → interactive walkthroughs (already exists)
```

### Phase 4 — Cut & polish
- Remove redundant features (below)
- Services hover refactor
- SEO per lane page

---

## Redundant features — cut or hide (not delete code yet)

| Feature | Action | Why |
|---------|--------|-----|
| Duplicate static blog routes in `AppRouter.jsx` | Hide later | `/blog/:slug` handles them |
| Admin routes (`/dashboard/admin/*`) | Hide from nav | No live auth/keys yet |
| Order flow without Stripe | De-emphasize | Link to contact until P3 |
| `ServiceSummary` + `Services` overlap | Merge copy | Two marquees = noise |
| Placeholder testimonials | Remove from UI | Hurts trust |
| Voice-tags as primary nav | Secondary link | Keep for SEO, not hero CTA |
| GSAP cursor-following previews | **Replace** | Broken/fragile on mobile + React 19 |

---

## Data workflow (one file to rule projects)

Edit **`src/data/showcaseProjects.js`** only for portfolio entries:

```js
{
  id: 'velare',
  name: 'Velare',
  category: 'development',  // development | video | motion
  status: 'wip',            // live | wip | archived
  demoUrl: 'https://velare-xxx.netlify.app',
  githubUrl: 'https://github.com/solufelo/velare-site',
  image: '/assets/projects/velare.jpg',
  video: null,
  stack: ['Next.js', 'Three.js', 'GSAP'],
  blurb: '3D motorbike landing — immersive WebGL.',
}
```

Then: `npm run build` → upload zip → cPanel.

---

## Marketing each project type

| Type | Show | Link pattern |
|------|------|--------------|
| **Code / full-stack** | Screenshot + stack | Live Demo (Netlify) + GitHub |
| **WIP** | Same + **WIP badge** | Demo if deploy exists; always GitHub |
| **Video** | Inline video or poster | Instagram + optional self-hosted |
| **Motion** | Loop / GIF / video | Demo + GitHub or Behance later |
| **Internal tools** | `/demo` tab | Interactive widget + architecture |

**Honest WIP framing:** *"Active build — live preview may be incomplete. Source on GitHub."*

---

## Your update loop (repeat forever)

```
1. Edit src/data/showcaseProjects.js (or pages/components)
2. npm run build  (use .tools/node)
3. Zip dist/* → upload public_html (keep .well-known)
4. Test https://captainsolo.ca
```

---

## Next session pick-one

1. Fill Netlify URLs together (you paste, I update data file)
2. Wire contact form API
3. Build `/work/code` page shell
