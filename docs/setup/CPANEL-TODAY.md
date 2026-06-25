# cPanel migration — do this today

**Goal:** Move `captainsolo.ca` from Netlify → Namecheap cPanel.  
**Time:** ~45–60 min (DNS may take longer to propagate).

---

## Phase 0 — Ignore the wrong SSL screen

If **Security → SSL/TLS → Status** says *"There are no SSL/TLS products available"*, that is **normal on Namecheap**. That screen is for cPanel's AutoSSL marketplace — Namecheap uses its own plugin instead.

Use **Namecheap SSL** (home page → section **Exclusive for Namecheap Customers** → **Namecheap SSL**).  
Your server IP for DNS: **`67.223.118.113`**

---

## Phase 1 — SSL validation (do first, in browser)

1. Log in to **Namecheap cPanel** (hosting account for `captttyo` / captainsolo.ca).
2. Open **File Manager** → `public_html`.
3. Create folders: `.well-known` → `pki-validation`  
   (Settings → show hidden dotfiles if needed).
4. Upload this file from your PC:

   ```
   deploy/cpanel/ssl/ADA74535102569C97541A0CDBE1BA3EB.txt
   ```

   Into: `public_html/.well-known/pki-validation/`

5. Test in browser:

   ```
   http://www.captainsolo.ca/.well-known/pki-validation/ADA74535102569C97541A0CDBE1BA3EB.txt
   ```

   You should see one line of text (comodoca validation). SSL issues within ~15 min after that.

---

## Phase 2 — DNS (point domain at cPanel)

1. Namecheap → **Domain List** → `captainsolo.ca` → **Advanced DNS**.
2. Remove or disable **Netlify** A/CNAME records.
3. Add (values from cPanel → **Server Information** → Shared IP):

   | Type | Host | Value |
   |------|------|-------|
   | A | @ | `67.223.118.113` |
   | CNAME | www | captainsolo.ca |

4. Wait 15 min–2 hrs. Check: `ping captainsolo.ca` should show cPanel IP (not Netlify).

**Do not delete Netlify site until cPanel site works.**

---

## Phase 3 — Build frontend on your PC

You need **Node.js** once (install from https://nodejs.org — LTS).

```powershell
cd C:\Users\Administrator\Projects\captainsoloHQ
copy cpanel.env.example .env.production
# Edit .env.production — paste your real VITE_SUPABASE_URL, VITE_STRIPE_PUBLISHABLE_KEY, etc.
# (copy from old Netlify env or netlify.env if you have it)

.\scripts\prepare-cpanel-upload.ps1
```

This creates zips in `deploy/cpanel/zips/`:
- `public_html-*.zip` → upload to `public_html`
- `portfolio-backend-*.zip` → upload to home folder `portfolio-backend`
- `ssl-dcv-*.zip` → if you skipped Phase 1

---

## Phase 4 — Upload site files

### Frontend (`public_html`)
1. File Manager → `public_html` → Upload `public_html-*.zip` → **Extract**.
2. Files should sit directly in `public_html`: `index.html`, `assets/`, `.htaccess`.

### Backend (`portfolio-backend` — outside public_html)
1. Go to **home** directory (one level above `public_html`).
2. Create folder `portfolio-backend` if missing.
3. Upload `portfolio-backend-*.zip` → Extract there.

---

## Phase 5 — Python API (Stripe, auth, contact form)

cPanel → **Setup Python App** → **Create Application**

| Field | Value |
|-------|-------|
| Python version | 3.10+ |
| Application root | `portfolio-backend` |
| Application URL | `api` |
| Startup file | `passenger_wsgi.py` |
| Entry point | `application` |

**Environment variables** (cPanel Python app screen):

| Variable | Example |
|----------|---------|
| `URL` | `https://www.captainsolo.ca` |
| `STRIPE_SECRET_KEY` | `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` |
| `SMTP_HOST` | `mail.captainsolo.ca` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `work@captainsolo.ca` |
| `SMTP_PASS` | *email password* |

Click **Run Pip Install** on `requirements.txt` → **Restart** app.

Test: `https://www.captainsolo.ca/api/auth/session` (should return JSON, not 404).

---

## Phase 6 — Stripe webhook (after API live)

Stripe Dashboard → Webhooks → Add endpoint:

```
https://www.captainsolo.ca/api/stripe/webhook
```

Copy signing secret → cPanel env `STRIPE_WEBHOOK_SECRET` → Restart Python app.

---

## Phase 7 — Supabase + Google OAuth (after domain live)

Update redirect URLs to `https://www.captainsolo.ca` in:
- Supabase → Authentication → URL configuration
- Google Cloud → OAuth consent + credentials

Guides: `docs/setup/SUPABASE-SETUP-INSTRUCTIONS.md`, `docs/setup/GOOGLE-OAUTH-CONSENT-SETUP.md`

---

## Checklist

- [ ] SSL DCV file uploaded
- [ ] DNS points to cPanel IP
- [ ] `public_html` has React build + `.htaccess`
- [ ] `portfolio-backend` outside `public_html`
- [ ] Python app running at `/api`
- [ ] Site loads at `https://www.captainsolo.ca`
- [ ] Contact form / login tested
- [ ] Then remove Netlify DNS / archive Netlify site

---

## If stuck

Tell me which step number you're on and what you see (screenshot or error text).
