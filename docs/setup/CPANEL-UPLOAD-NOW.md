# Upload new site to cPanel — today

Build is ready at `deploy/cpanel/zips/public_html-*.zip` (latest timestamp).

## What changed in this build

- Hero + About copy aligned with profile (Creative Technologist, 1,400+ orders, WLU, Brampton/GTA)
- Profile photo: `/images/man.jpg` on About section
- Stats updated (freelance orders, 6+ years)
- Meta/OG URLs → `https://captainsolo.ca`
- `.htaccess`: www → non-www, SSL DCV, SPA routing

## Upload steps (cPanel File Manager)

1. **Backup** (optional): zip current `public_html` folder
2. Open `public_html`
3. **Keep** these folders if present:
   - `.well-known/pki-validation/` (SSL files)
   - `cgi-bin/`
4. Delete old site files: `index.html`, `assets/`, old JS/CSS — **not** `.well-known` or `cgi-bin`
5. Upload `public_html-*.zip` → **Extract** into `public_html` root
6. Confirm `index.html`, `assets/`, `.htaccess` sit directly in `public_html`

## Test

- https://captainsolo.ca
- https://captainsolo.ca/order (SPA routing)
- Contact form (needs Python `/api` + env vars)

## Still needs keys (optional for later)

Copy real values into `.env.production` and rebuild when you have them:

- `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_GOOGLE_CLIENT_ID`

Login/checkout won't work until those + cPanel Python app env are set.

## Rebuild command

```powershell
$env:Path = "C:\Users\Administrator\Projects\captainsoloHQ\.tools\node;$env:Path"
cd C:\Users\Administrator\Projects\captainsoloHQ
npm run build
```

Then re-zip `dist/*` and upload again.
