# EMERGENCY — nothing works (3 fixes, ~20 min)

Verified from outside your network:

| Issue | Status |
|-------|--------|
| `captainsolo.ca` | Works |
| `/api/auth/session` | Returns **HTML** (broken) — Passenger config missing |
| `suburbia.captainsolo.ca` | **DNS does not exist** |
| `velare.captainsolo.ca` | **DNS does not exist** |

**cPanel Zone Editor does NOT fix subdomains** — nameservers are Namecheap (`registrar-servers.com`).

---

## FIX 1 — Auth / signup (5 min)

### Cause
Uploading the React site **replaced** `public_html/.htaccess` and **deleted** the Passenger block cPanel needs for Python `/api`.

### Steps

1. **File Manager** → `public_html` → edit **`.htaccess`**
2. At the **very top** of the file, paste this block (before `RewriteEngine On`):

```apache
# DO NOT REMOVE. CLOUDLINUX PASSENGER CONFIGURATION BEGIN
PassengerAppRoot "/home/captttyo/portfolio-backend"
PassengerBaseURI "/api"
PassengerPython "/home/captttyo/virtualenv/portfolio-backend/3.9/bin/python"
PassengerAppType wsgi
PassengerStartupFile passenger_wsgi.py
PassengerEntryPoint application
# DO NOT REMOVE. CLOUDLINUX PASSENGER CONFIGURATION END
```

3. **Save**
4. cPanel → **Setup Python App** → your `api` app → **Restart**
5. **Run Pip Install** on `requirements.txt` if you haven't

### Test
Open: `https://captainsolo.ca/api/auth/session`

- **Good:** `{"authenticated":false}`  
- **Bad:** HTML page → `.htaccess` block missing or app not restarted

**Or** upload `deploy/cpanel/zips/htaccess-only-*.zip` → extract into `public_html` (overwrites `.htaccess` only).

---

## FIX 2 — Subdomain demos (10 min)

### Cause
A records only exist in **cPanel Zone Editor**. Internet uses **Namecheap Advanced DNS**.

### Steps

1. [namecheap.com](https://www.namecheap.com) → Domain List → **captainsolo.ca** → **Advanced DNS**
2. **NOT** cPanel Zone Editor
3. Add **A Record** rows:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | `velare` | `67.223.118.113` | Automatic |
| A Record | `suburbia` | `67.223.118.113` | Automatic |
| A Record | `captain-funds` | `67.223.118.113` | Automatic |

4. Save all. Wait **15–30 minutes**.

### Test (after wait)
- https://suburbia.captainsolo.ca  
- https://velare.captainsolo.ca  

Files are already on the server — only DNS was missing.

---

## FIX 3 — Backend files (if API still 500)

1. Upload `deploy/cpanel/zips/portfolio-backend-*.zip`
2. Extract into `/home/captttyo/portfolio-backend/` (overwrite)
3. Must contain: `passenger_wsgi.py`, `server.py`, `requirements.txt`
4. Python App → Pip Install → **Restart**

---

## Order tonight

```
1. Paste Passenger block into public_html/.htaccess  →  Restart Python app
2. Test /api/auth/session
3. Add 3 A records in Namecheap Advanced DNS
4. Go to bed — subdomains work after DNS propagates
```

---

## What works without fixing

- Main site: https://captainsolo.ca  
- Netlify demos (from portfolio links): velare-site.netlify.app, suburbia-solo.netlify.app  
- Suburbia/Velare **on cPanel** — blocked only on DNS  

---

## Never do this again

When uploading `public_html` zip, **do not delete** the Passenger block at the top of `.htaccess`.  
Use the merged `.htaccess` from `public/.htaccess` in this repo (includes Passenger + SPA rules).
