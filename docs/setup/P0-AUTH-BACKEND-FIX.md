# P0 — Login / Signup broken (diagnosis + fix)

## What you're seeing

```
Unexpected token '<', "<!doctype "... is not valid JSON
```

**Cause:** Signup/login calls `/api/auth/signup` and `/api/auth/login`. On the live site those URLs return **HTML** (`index.html`) instead of JSON.

Verified 2026-06-23:

- `https://captainsolo.ca/api/auth/session` → returns `<!doctype html>` (wrong)
- Should return: `{"authenticated":false}` or similar JSON

The React app is fine. The **Python backend is not running** (or not mounted at `/api`).

---

## Fix (cPanel — ~20–30 min)

You already have `portfolio-backend/` on the server. Wire it up:

### 1. Setup Python App

cPanel → **Software** → **Setup Python App** → **Create Application**

| Field | Value |
|-------|--------|
| Python version | 3.10+ |
| Application root | `portfolio-backend` |
| Application URL | `api` (not `portfolio-backend`) |
| Application startup file | `passenger_wsgi.py` |
| Application entry point | `application` |

### 2. Install dependencies

On the Python app page → **Run Pip Install** → select `requirements.txt` in `portfolio-backend/`.

### 3. Restart

Click **Restart** on the Python app.

### 4. Test (must be JSON, not HTML)

Open in browser:

```
https://captainsolo.ca/api/auth/session
```

**Good:** `{"authenticated":false}` or similar JSON  
**Bad:** HTML page or React site

### 5. Re-upload `.htaccess` (if needed)

Latest build includes a rule so `/api/` is never rewritten to `index.html`. Upload `public/.htaccess` to `public_html/` if you haven't since this fix.

### 6. Try signup again

https://captainsolo.ca/login → Create Account

---

## Env vars (optional tonight, needed for email/Stripe later)

On the Python app screen:

| Variable | Purpose |
|----------|---------|
| `SMTP_HOST` | `mail.privateemail.com` or Namecheap mail host |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `work@captainsolo.ca` |
| `SMTP_PASS` | Private Email password |
| `STRIPE_SECRET_KEY` | When orders go live |
| `STRIPE_WEBHOOK_SECRET` | When Stripe webhook added |

Auth (signup/login) works **without** Stripe. Contact form needs SMTP.

---

## What does NOT fix this

- Adding Supabase keys to `.env.production` — app uses local SQLite backend, not Supabase cloud
- Uploading Velare/Suburbia zips — separate subdomains, unrelated
- Rebuilding frontend only — `VITE_API_URL` can stay empty if API is at `/api` on same domain

---

## Urgency matrix placement

| Priority | Task | Status |
|----------|------|--------|
| **P0** | Python `/api` backend live (auth + contact) | **Blocked on cPanel Python App** |
| **P1** | Velare / Suburbia subdomains | In progress — OK to continue |
| **P3** | Stripe + full orders | After P0 |

**Tonight:** Finish Velare/Suburbia DNS + upload if you have energy. **Auth fix = Python App setup** — do that before worrying about signup.
