# 🔒 SECURITY ALERT: Rotate Exposed Credentials

## ⚠️ Action Required

Your Google API credentials were exposed in a public commit. You **MUST** rotate them immediately.

## 🔄 Steps to Rotate Credentials

### 1. Rotate Google API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services → Credentials**
3. Find your **API Key** (`AIzaSy...`)
4. Click on the key
5. Click **DELETE** or **RESTRICT KEY**
6. Click **CREATE CREDENTIALS → API Key**
7. Copy the new API key
8. Update `.env.local` with the new key:
   ```env
   VITE_GOOGLE_API_KEY=your-new-api-key-here
   ```

### 2. Regenerate OAuth Client Secret

1. Go to **APIs & Services → Credentials**
2. Find your **OAuth 2.0 Client ID**
3. Click on it
4. Click **RESET SECRET** (or delete and create new)
5. Copy the new client secret
6. Update `.env.local` with the new secret:
   ```env
   VITE_GOOGLE_CLIENT_SECRET=your-new-client-secret-here
   ```

### 3. Restrict API Key (Recommended)

To prevent abuse, restrict your API key:

1. Click on your API key
2. Under **API restrictions**, select **Restrict key**
3. Select only: **Google Drive API**
4. Under **Application restrictions**, restrict by:
   - HTTP referrers (for web apps)
   - Or IP addresses (for server-side)
5. Click **SAVE**

### 4. Review OAuth Client Settings

1. Go to **OAuth 2.0 Client ID** settings
2. Review **Authorized redirect URIs**
3. Remove any unauthorized URIs
4. Ensure only your domains are listed:
   - `http://localhost:5173` (development)
   - `https://captainsolo.ca` (production)

### 5. Update Environment Variables

Update your `.env.local` file with new credentials:

```env
# Google Drive API Configuration
VITE_GOOGLE_CLIENT_ID=your-client-id-here
VITE_GOOGLE_CLIENT_SECRET=your-new-client-secret-here
VITE_GOOGLE_API_KEY=your-new-api-key-here
VITE_GOOGLE_PROJECT_ID=your-project-id-here
```

### 6. Deploy Updated Credentials

1. Update `.env.local` locally
2. Update environment variables in Netlify (or your hosting):
   - Go to Netlify Dashboard → Site Settings → Environment Variables
   - Update all Google credentials
3. Redeploy your site

## 🛡️ Prevent Future Exposure

### ✅ Best Practices

1. **Never commit credentials to git**
   - All credentials should be in `.env.local`
   - `.env.local` is in `.gitignore`

2. **Use environment variables**
   - Always use `import.meta.env.VITE_*` in code
   - Never hardcode credentials

3. **Review files before committing**
   - Check for API keys, secrets, tokens
   - Use tools like `git-secrets` or `truffleHog`

4. **Use secret scanning**
   - Enable GitHub secret scanning
   - Use services like GitGuardian

5. **Rotate keys regularly**
   - Rotate API keys every 90 days
   - Rotate after any exposure

## 🔍 Check for Other Exposed Secrets

Search your repository for:
- API keys: `AIzaSy`, `sk_`, `pk_`
- Client secrets: `GOCSPX-`
- Access tokens
- Database credentials
- Other secrets

## 📚 Resources

- [Google Cloud Console](https://console.cloud.google.com/)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [OWASP Secret Management](https://owasp.org/www-community/vulnerabilities/Use_of_hard-coded_cryptographic_key)

## ✅ Checklist

- [ ] Old API key deleted/restricted
- [ ] New API key created
- [ ] OAuth client secret regenerated
- [ ] API key restricted to Google Drive API only
- [ ] `.env.local` updated with new credentials
- [ ] Netlify environment variables updated
- [ ] Site redeployed
- [ ] Tested Google Drive upload functionality
- [ ] Reviewed git history for other exposed secrets

---

**Complete these steps immediately to secure your application!** 🔒

