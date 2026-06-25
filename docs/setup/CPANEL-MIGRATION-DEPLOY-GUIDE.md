# Step-by-Step cPanel Deployment & SSL Configuration Guide

This guide describes how to complete the Domain Control Validation (DCV) for your SSL certificate, configure URL routing, and deploy your site to Namecheap cPanel (moving permanently away from Netlify and GitHub).

---

## 1. Domain Control Validation (DCV) for SSL

To activate the SSL certificate for `captainsolo.ca` and `www.captainsolo.ca`, you must place the DCV validation file in the correct directory.

### Step-by-Step:
1. Log in to your **cPanel File Manager**.
2. Double-click the **`public_html`** folder on the left pane or double-click it in the main table.
3. Click the **`+ Folder`** button in the top menu bar.
4. Set the New Folder Name to: `.well-known` and click **Create New Folder**.
   * *Note: If the folder is hidden after creation, click **Settings** (top right corner of File Manager), tick the check box for **"Show Hidden Files (dotfiles)"**, and click **Save**.*
5. Double-click to enter the `.well-known` folder.
6. Click the **`+ Folder`** button again and create a folder named: `pki-validation`
7. Double-click to enter the `pki-validation` folder.
8. Click the **`Upload`** button in the top menu bar.
9. Select and upload the file you downloaded from Namecheap:
   `ADA74535102569C97541A0CDBE1BA3EB.txt`
10. Verify that it is accessible in your web browser by navigating to:
    `http://www.captainsolo.ca/.well-known/pki-validation/ADA74535102569C97541A0CDBE1BA3EB.txt`

Once Namecheap's SSL provider verifies this file, your certificate will be issued and installed automatically on your domain.

---

## 2. Directory Layout & Base of Operations

To ensure database security and isolate front-end static files, we use the following directory layout:

```text
/home/captttyo/                       <-- Your cPanel Home directory
├── portfolio-backend/                <-- Backend Python App (securely outside public_html)
│   ├── passenger_wsgi.py             <-- Phusion Passenger App Entry Point
│   ├── server.py                     <-- Main API server logic
│   ├── requirements.txt              <-- Python packages (stripe, etc.)
│   └── portfolio.db                  <-- SQLite database (securely holds orders & contacts)
└── public_html/                      <-- Frontend static document root
    ├── index.html                    <-- React Root entry point
    ├── favicon.svg                   <-- Logo asset
    ├── .htaccess                     <-- SSL redirect and React router rewrites
    └── assets/                       <-- Transpiled React JS and CSS bundle files
```

---

## 3. Configuring the Python Backend (cPanel)

cPanel uses Phusion Passenger to serve Python scripts via WSGI.

### Step-by-Step:
1. Under cPanel's **Software** section, search for and click **Setup Python App**.
2. Click **Create Application**.
3. Choose the Python version: **3.10** (or latest 3.x available).
4. Set the **Application root**: `portfolio-backend`
5. Set the **Application URL**: `api` (this configures routing so requests to `captainsolo.ca/api/...` execute the Python script).
6. Set the **Application startup file**: `passenger_wsgi.py`
7. Set the **Application entry point**: `application`
8. Click **Create**.

### Install Dependencies:
1. Under **Configuration files** inside the setup screen, enter `requirements.txt` and click **Add**.
2. Click **Run Pip Install** and select `requirements.txt`. This will install `stripe` and other Python library requirements in your virtual environment.

### Set Environment Variables:
At the bottom of the python application configuration screen, add the following environment variables:
* `STRIPE_SECRET_KEY`: Your live Stripe secret key (starts with `sk_live_...`).
* `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook signing secret (starts with `whsec_...`).
* `URL`: `https://www.captainsolo.ca`
* `SMTP_HOST`: `mail.captainsolo.ca` (or your SMTP host provider).
* `SMTP_PORT`: `587`
* `SMTP_USER`: `work@captainsolo.ca`
* `SMTP_PASS`: Your email account password.

Click **Save** and click **Restart** at the top of the Setup Python App page to apply.

---

## 4. Deploying the Frontend (React SPA)

Your React frontend compiles into optimized HTML, JS, and CSS static files.

### Step-by-Step:
1. Build the production files on your local computer by running:
   ```bash
   npm run build
   ```
2. This creates a `dist/` folder in your project root containing:
   * `index.html`
   * `favicon.svg`
   * `.htaccess` (forces SSL redirection and handles React SPA routing fallback)
   * `assets/` (Javascript & CSS files)
3. ZIP the contents of the `dist/` directory (not the `dist` folder itself, but the files *inside* it).
4. Go to cPanel **File Manager** -> **`public_html`**.
5. Upload the ZIP file and click **Extract**.
6. Move the files out of any subfolder directly into the `public_html/` root if needed.

---

## 5. Summary of Automated Routing and SSL Redirection

* The `.htaccess` file in `public_html/` automatically forces all browsers accessing `http://` to redirect to `https://`.
* When a user visits `https://captainsolo.ca/order/voice-tag`, Apache checks if `/order/voice-tag` exists as a file. Since it's a virtual React route, Apache rewrites the URL internal pointer to `/index.html` to prevent 404 errors, allowing React Router to successfully mount the page.
* When the client makes an API call (e.g. to `/api/contact/submit`), cPanel catches the prefix `/api` and routes the request directly to Phusion Passenger, which executes our Python WSGI handlers inside `passenger_wsgi.py`.
