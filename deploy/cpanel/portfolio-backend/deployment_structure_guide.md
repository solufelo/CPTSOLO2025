# Clean Deployment & Directory Structure Guide

This guide details how to structure your codebase to keep development clean and ensure secure hosting on Namecheap cPanel.

---

## 📂 1. Namecheap cPanel Directory Structure (Security First)

Never upload your entire Git repository or backend servers directly into `public_html`. Keeping backend code and databases inside `public_html` is insecure because visitors can download them.

Structure your cPanel home directory (`/home/your_username/`) like this:

```
/home/your_username/
│
├── public_html/                       <-- Public Web Root (Frontend Only)
│   ├── assets/                        <-- React compiled JS/CSS bundles
│   ├── index.html                     <-- Main entry point
│   ├── resume.pdf                     <-- Publicly downloadable assets
│   └── .htaccess                      <-- SPA routing redirects (HTML5 mode)
│
├── portfolio-backend/                 <-- Private Python App Folder (Port 8081)
│   ├── server.py                      <-- Database API endpoints
│   ├── passenger_wsgi.py              <-- cPanel WSGI wrapper
│   └── portfolio.db                   <-- SQLite Database File (Secure from web)
│
└── findyou-backend/                   <-- (Optional) If hosting findYOU separately
    ├── server.py                      
    ├── passenger_wsgi.py              
    └── find_you.db                    
```

### 💡 Why this is clean and secure:
- **`public_html/`** only contains compiled static HTML/JS/CSS assets. If someone queries `yourdomain.com/portfolio.db`, the web server returns a `404 Not Found` because the database is physically located outside the web root.
- **`portfolio-backend/`** is loaded privately by cPanel's Phusion Passenger and is not directly inspectable.

---

## 🛠️ 2. Clean Git Repository Structure (Local Dev)

Your local repository `captainsoloHQ` acts as a monorepo containing source code, resumes, and backends. Here is the local structure and what gets built:

```
captainsoloHQ/ (Git Root)
├── dist/                              <-- AUTO-GENERATED: Only this gets uploaded to public_html!
├── src/                               <-- React Source Code (Vite bundles this)
├── public/                            <-- Public assets (like resume.pdf)
├── tools/
│   ├── portfolio-backend/             <-- Local SQLite Backend files
│   └── find-you/                      <-- Local SaaS Dashboard backend
├── resumes/                           <-- LaTeX resume source files (safe to ignore in build)
├── package.json                       <-- Node dependencies
├── vite.config.js                     <-- Vite/Proxy configuration
└── .gitignore                         <-- Ignores node_modules, dist/ outputs
```

### 💡 How to build:
1. Run `npm run build` locally. Vite reads `src/` and `public/` and generates the optimized production bundle in the `dist/` directory.
2. **Upload only the *contents* of `dist/` to cPanel's `public_html/`.** Do not upload the rest of the folders!
3. **Upload only the `tools/portfolio-backend/` folder to cPanel's `/home/your_username/portfolio-backend/`.**

---

## 📄 3. React Router SPA Config (`.htaccess`)
Since React uses client-side routing, you need to tell cPanel's Apache server to route all URL paths back to `index.html` so that refreshing pages (like `/dashboard` or `/order/123`) doesn't show a `404 Apache Error`.

Create a file named `.htaccess` in your cPanel `public_html/` folder with this content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
