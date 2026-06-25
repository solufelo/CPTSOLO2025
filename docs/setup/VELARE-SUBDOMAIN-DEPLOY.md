# Velare subdomain — velare.captainsolo.ca

3D motorbike demo (Next.js static export) hosted on Namecheap Stellar as a subdomain.

## One-time cPanel + DNS setup

### 1. Create subdomain (cPanel)

1. Log in to cPanel → **Domains** → **Subdomains** (or **Create A New Domain** on newer themes)
2. Subdomain: `velare` on `captainsolo.ca`
3. Document root: `/home/captttyo/velare` (default `velare.captainsolo.ca` folder is fine)
4. Create

### 2. DNS (Namecheap Advanced DNS)

Domain must use **BasicDNS** (same as main site).

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | `velare` | `67.223.118.113` | Automatic |

Wait 5–30 minutes for propagation.

### 3. SSL

After DNS resolves:

- cPanel → **SSL/TLS Status** → run **AutoSSL** for `velare.captainsolo.ca`, or
- Namecheap **SSL** plugin → include subdomain on existing cert, or
- Support ticket if AutoSSL stalls (same DCV pattern as apex — ensure A record points to cPanel IP)

## Build + upload (repeat for updates)

```powershell
cd C:\Users\Administrator\Projects\captainsoloHQ
.\scripts\prepare-portfolio-subdomain.ps1 -Project velare
# or: -Project all
```

Output: `deploy/cpanel/zips/velare-YYYYMMDD-HHmm.zip` (~127 MB — GLB + video assets).

### cPanel File Manager

1. Open `/home/captttyo/velare/` (subdomain docroot)
2. Delete old files if re-deploying (keep nothing special unless you added analytics)
3. Upload zip → **Extract** into `velare/` root
4. Confirm `index.html`, `_next/`, `models/`, `.htaccess` are directly in `velare/`

### Test

- https://velare.captainsolo.ca
- https://velare.captainsolo.ca/about/
- https://velare.captainsolo.ca/ion/
- 3D model loads (WebGL + `/models/*.glb`)

## Portfolio link

After live, `src/data/showcaseProjects.js` should have:

```js
demoUrl: 'https://velare.captainsolo.ca',
status: 'live',
```

Rebuild main site (`npm run build` + upload `public_html` zip) so Works section **Demo** button works.

## Source repo

- Local: `C:\Users\Administrator\Projects\velare-site`
- GitHub: https://github.com/solufelo/velare-site
- Static export config: `next.config.ts` → `output: 'export'`, `trailingSlash: true`

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 404 on `/about` | Use trailing slash `/about/` or rely on `.htaccess` redirect |
| GLB won't load | Check `.htaccess` `AddType model/gltf-binary .glb` |
| Huge upload timeout | Use cPanel zip extract, or FTP; split is not needed if zip < 500 MB |
| Blank 3D canvas | Browser WebGL; check console for failed `/models/` paths |
| SSL warning | DNS must point to `67.223.118.113` before AutoSSL |
