# Troubleshooting SSL Issues for captainsolo.ca

## 🚨 Critical Error: "Unable to verify challenge for *.captainsolo.ca"

If you see the error:
> `SniCertificate::CertificateNonvalidError: Unable to verify challenge for *.captainsolo.ca: DNS problem: NXDOMAIN looking up TXT for _acme-challenge.captainsolo.ca`

This means Netlify is trying to renew a **Wildcard Certificate** (`*.captainsolo.ca`) using a DNS check, but it cannot find the required verification record in your Namecheap DNS.

### Why is this happening?
*   **Wildcard Certificates** (certificates for `*.yourdomain.com`) generally require you to use **Netlify DNS** (pointing your Nameservers to Netlify).
*   You are likely using **Namecheap DNS** (External DNS) but Netlify is still trying to verify a wildcard certificate.
*   Because Netlify doesn't control your DNS, it can't automatically add the `_acme-challenge` TXT record needed for verification.

### Solution 1: Switch to Netlify DNS (Easiest & Recommended)
This method lets Netlify manage your records automatically.

1.  **In Netlify:**
    *   Go to **Domain Management** > **DNS Panel**.
    *   Click "Add domain" or check your existing zone.
    *   Note the **4 Nameservers** listed (e.g., `dns1.p01.nsone.net`, etc.).
2.  **In Namecheap:**
    *   Go to **Domain List** > `captainsolo.ca` > **Manage**.
    *   Find **Nameservers**.
    *   Change "Namecheap BasicDNS" to **Custom DNS**.
    *   Enter the 4 nameservers from Netlify.
    *   Save.
3.  **Wait:** DNS propagation takes up to 24-48 hours (usually faster). Netlify will then automatically renew the certificate.

### Solution 2: Keep Namecheap DNS (Standard Certificate)
If you prefer to keep your DNS at Namecheap, you must ensure Netlify stops trying to validate a wildcard and validates just the root and www domains instead.

1.  **Verify DNS Records in Namecheap:**
    Ensure you have *only* these records in Namecheap **Advanced DNS**:
    *   **A Record** | `@` | `75.2.60.5`
    *   **CNAME Record** | `www` | `[your-app-name].netlify.app`
2.  **Reset Netlify SSL:**
    *   In Netlify, go to **Domain management** > **HTTPS**.
    *   If you can, try to **Disable SSL** (if the option exists) and then **Enable SSL** again.
    *   If you can't disable it, try clicking **"Renew certificate"**.
    *   *Note: If it persists in trying for a wildcard (*.captainsolo.ca), you may need to contact Netlify support to "reset the certificate type to non-wildcard" or ensure your DNS records are correct so the HTTP validation works.*

### Solution 3: Manual DNS Verification (Not Recommended)
You technically *can* add the TXT record manually in Namecheap, but you would have to do this **every 3 months** when the certificate expires. We do not recommend this.

---

## Standard DNS Setup (Namecheap + Netlify)

If you are NOT using Netlify Nameservers (Solution 2), your Namecheap configuration should look exactly like this:

| Type | Host | Value | TTL |
| :--- | :--- | :--- | :--- |
| **A Record** | `@` | `75.2.60.5` | Automatic/30min |
| **CNAME Record** | `www` | `awwwards-portfolio.netlify.app` (or your specific site URL) | Automatic/30min |

**Delete** any other A records for `@` or `www` to avoid conflicts.

## How to Check if it's Working

Since you cannot run `dig` in your current terminal, use an online tool like [whatsmydns.net](https://www.whatsmydns.net/) or Google's [Dig tool](https://toolbox.googleapps.com/apps/dig/):

1.  Search for `captainsolo.ca` (A Record). It should show `75.2.60.5`.
2.  Search for `www.captainsolo.ca` (CNAME Record). It should point to `netlify.app`.

Once these records are correct and propagated, click **Renew Certificate** in Netlify.
