# Google OAuth Consent Screen Setup Guide

## ✅ Required Information for OAuth Consent Screen

Use the following information when setting up your OAuth consent screen in Google Cloud Console:

### Application Information

**Application home page:**
```
https://captainsolo.ca
```

**Application privacy policy link:**
```
https://captainsolo.ca/privacy-policy
```

**Application Terms of Service link:**
```
https://captainsolo.ca/terms-of-service
```

**Authorized domains:**
```
captainsolo.ca
```

### Developer Contact Information

**Email addresses:**
- `work@captainsolo.ca` (or your primary contact email)

---

## 📋 Step-by-Step Setup

### Step 1: Add Authorized Domain

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: `skilful-mercury-425419-n8`
3. Navigate to **APIs & Services → OAuth consent screen**
4. Scroll to **Authorized domains** section
5. Click **+ ADD DOMAIN**
6. Enter: `captainsolo.ca`
7. Click **ADD**

**Note:** You may need to verify domain ownership in Google Search Console first.

### Step 2: Verify Domain Ownership (If Required)

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://captainsolo.ca`
3. Verify ownership using one of these methods:
   - HTML file upload
   - HTML tag
   - DNS record
   - Google Analytics
4. Once verified, the domain will be available in OAuth consent screen

### Step 3: Fill Out OAuth Consent Screen

1. **User Type:** External (for public access) or Internal (for workspace only)
2. **App name:** `Captain Solo Voice Tags`
3. **User support email:** `work@captainsolo.ca`
4. **Application home page:** `https://captainsolo.ca`
5. **Application privacy policy link:** `https://captainsolo.ca/privacy-policy`
6. **Application Terms of Service link:** `https://captainsolo.ca/terms-of-service`
7. **Authorized domains:** `captainsolo.ca`
8. **Developer contact information:** `work@captainsolo.ca`

### Step 4: Add Scopes

Add the following scopes:
- `https://www.googleapis.com/auth/drive.readonly` - Read files from Google Drive

### Step 5: Add Test Users (If in Test Mode)

If your app is in "Testing" status, add test users:
- Add your email address
- Add any other emails that need to test the app

### Step 6: Submit for Verification (If Needed)

If you need public access (not just test users):
1. Complete all required fields
2. Click **SUBMIT FOR VERIFICATION**
3. Google will review your app (can take several days)
4. Once approved, anyone can use your app

---

## 🔗 Direct Links

- **OAuth Consent Screen:** https://console.cloud.google.com/apis/credentials/consent?project=skilful-mercury-425419-n8
- **Google Search Console:** https://search.google.com/search-console
- **Privacy Policy:** https://captainsolo.ca/privacy-policy
- **Terms of Service:** https://captainsolo.ca/terms-of-service

---

## ✅ Checklist

- [ ] Domain `captainsolo.ca` verified in Google Search Console
- [ ] Domain added to authorized domains in OAuth consent screen
- [ ] Application home page URL added
- [ ] Privacy policy URL added
- [ ] Terms of Service URL added
- [ ] Developer contact email added
- [ ] Scopes added (`drive.readonly`)
- [ ] Test users added (if in test mode)
- [ ] App submitted for verification (if needed)

---

## 🚨 Important Notes

1. **Domain Verification:** You must verify domain ownership before it can be used
2. **Privacy Policy & Terms:** Must be publicly accessible URLs
3. **Test Mode:** In test mode, only added test users can use the app
4. **Verification:** Public apps require Google verification (review process)

---

## 📚 Resources

- [Google OAuth Consent Screen Docs](https://developers.google.com/identity/protocols/oauth2/policies)
- [Domain Verification Guide](https://support.google.com/webmasters/answer/9008080)
- [OAuth Verification Process](https://support.google.com/cloud/answer/9110914)

---

**Once set up, your OAuth consent screen will be ready for users!** 🎉

