# Portfolio demos — Netlify now, cPanel subdomains later

Three-phase plan aligned with site overhaul:

1. **Netlify live** — wire `demoUrl` on captainsolo.ca Works section (today)
2. **Polish repos** — fix builds, env, UX per project
3. **cPanel migrate** — static zips to subdomains, then flip `demoUrl` to `*.captainsolo.ca`

Registry: `src/data/portfolioDemos.js` (Netlify URL, planned subdomain, build notes).

---

## Netlify sites (verified)

| Showcase ID | Netlify site | Live URL | Status |
|-------------|--------------|----------|--------|
| velare | velare-site | https://velare-site.netlify.app | OK |
| suburbia | suburbia-solo | https://suburbia-solo.netlify.app | OK |
| cinemaverse | cinemaverse-solo | https://cinemaverse-solo.netlify.app | OK |
| captainsolo-site | captainsolo | https://captainsolo.netlify.app | OK (legacy; prod is captainsolo.ca) |
| captain-funds | captainfunds | **404** — copy URL from Netlify dashboard | Broken / redeploying |
| sparkling-llama | sparkling-llama-2a5477 | https://sparkling-llama-2a5477.netlify.app | Archive (not in showcase) |

---

## cPanel subdomain map (planned)

| Subdomain | Project | Build | Zip script |
|-----------|---------|-------|------------|
| `velare.captainsolo.ca` | velare-site | Next static export | `prepare-portfolio-subdomain.ps1 -Project velare` |
| `suburbia.captainsolo.ca` | suburbia-solo | Next static (Prismic at build time) | `-Project suburbia` |
| `funds.captainsolo.ca` | CAPTAIN-FUNDS client | Vite SPA (UI only) | `-Project captain-funds` |
| cinemaverse | — | Wasp + Postgres | **Netlify only** until backend plan |

DNS pattern (Namecheap Advanced DNS): **A** `velare` → `67.223.118.113` (same for each subdomain host).

---

## Build commands

```powershell
cd C:\Users\Administrator\Projects\captainsoloHQ
$env:Path = ".tools\node;$env:Path"

# One project
.\scripts\prepare-portfolio-subdomain.ps1 -Project velare

# All static-capable demos
.\scripts\prepare-portfolio-subdomain.ps1 -Project all
```

Output: `deploy/cpanel/zips/{velare|suburbia|captain-funds}-YYYYMMDD-HHmm.zip`

### Upload (per subdomain)

1. cPanel → Subdomains → create host → docroot e.g. `/home/captttyo/velare`
2. Namecheap A record for subdomain → `67.223.118.113`
3. Upload zip → extract to subdomain folder
4. AutoSSL for subdomain
5. Test HTTPS, then update `showcaseProjects.js` `demoUrl` + `status: 'live'`
6. Rebuild + upload main `public_html` zip

---

## Project-specific notes

### Velare
- Next.js + R3F, ~106 MB (GLB + video)
- See also `docs/setup/VELARE-SUBDOMAIN-DEPLOY.md`

### Suburbia
- Prismic CMS content fetched at **build** time (static HTML)
- Deploy script temporarily moves `src/app/api` and `slice-simulator` out (not compatible with static export)
- Rebuild when Prismic content changes

### Captain Funds
- MERN stack: **client** static on cPanel; API needs separate host (Vercel/Railway/cPanel Node)
- `npx vite build` (skip `tsc` until TS errors fixed in repo)
- Netlify site `captainfunds` returned 404 — check Netlify deploy logs / site URL

### CinemaVerse
- Wasp full-stack — keep https://cinemaverse-solo.netlify.app
- cPanel migration needs Postgres + Node (Phase 3+)

---

## Showcase data workflow

Edit `src/data/showcaseProjects.js`:

```js
demoUrl: 'https://suburbia-solo.netlify.app',  // until subdomain live
status: 'wip',  // → 'live' after you verify demo
```

After cPanel subdomain works:

```js
demoUrl: 'https://suburbia.captainsolo.ca',
status: 'live',
```

Then `npm run build` → upload main site zip.

---

## Polish backlog (per repo)

| Repo | Before cPanel flip |
|------|------------------|
| CAPTAIN-FUNDS-MERN | Fix TS build; deploy API; fix Netlify 404 |
| suburbia-solo | Optional: remove preview routes from prod build in repo |
| velare-site | Already exports; optional asset compression |
| CinemaVerse | Wasp deploy health on Netlify |
