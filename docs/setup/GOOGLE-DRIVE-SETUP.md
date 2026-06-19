# Google Drive API Setup Guide

## ⚠️ SECURITY NOTICE

**IMPORTANT:** If you see this guide in a public repository, your Google API credentials may have been exposed. 

**You MUST:**
1. Rotate your Google API key in Google Cloud Console
2. Regenerate your OAuth client secret
3. Update credentials in `.env.local` (never commit credentials to git)

## ✅ Credentials Configuration

Add your Google Drive API credentials to `.env.local` (this file is gitignored):

```env
VITE_GOOGLE_CLIENT_ID=your-client-id-here
VITE_GOOGLE_CLIENT_SECRET=your-client-secret-here
VITE_GOOGLE_API_KEY=your-api-key-here
VITE_GOOGLE_PROJECT_ID=your-project-id-here
```

**Get your credentials from:**
- Google Cloud Console → APIs & Services → Credentials
- Project ID: Check your project settings

## 🔧 Additional Setup Required

### Step 1: Enable Google Drive API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: `skilful-mercury-425419-n8`
3. Navigate to **APIs & Services → Library**
4. Search for "Google Drive API"
5. Click **Enable**

### Step 2: Configure OAuth Consent Screen

1. Go to **APIs & Services → OAuth consent screen**
2. Configure consent screen:
   - User Type: **External** (for testing) or **Internal** (for workspace)
   - App name: `Captain Solo Voice Tags`
   - User support email: Your email
   - Developer contact: Your email
3. Add scopes:
   - `https://www.googleapis.com/auth/drive.readonly`
4. Add test users (if external):
   - Add your email for testing

### Step 3: Configure Authorized Redirect URIs

1. Go to **APIs & Services → Credentials**
2. Click on your OAuth 2.0 Client ID
3. Add authorized redirect URIs:
   - `http://localhost:5173` (for local development)
   - `http://localhost:3000` (if using different port)
   - `https://captainsolo.ca` (for production)
   - `https://yourdomain.com` (your production domain)

### Step 4: Authorized JavaScript Origins

Add these to your OAuth 2.0 Client ID:
- `http://localhost:5173`
- `http://localhost:3000`
- `https://captainsolo.ca`
- `https://yourdomain.com`

## 🧪 Testing

1. **Restart your dev server** (if running):
   ```bash
   npm run dev
   ```

2. **Test Google Drive Upload**:
   - Go to `/order/voice-tag`
   - Fill out the form
   - Click "Upload from Google Drive"
   - Sign in with Google
   - Select a file from your Drive
   - File should upload to Supabase Storage

## 🔄 How It Works

1. User clicks "Upload from Google Drive"
2. Google OAuth authentication flow starts
3. User grants permission to access Drive
4. Google Picker opens (file selection UI)
5. User selects file(s) from Drive
6. File is downloaded from Drive
7. File is uploaded to Supabase Storage
8. File URL is stored with order

## 📋 API Scopes Required

- `https://www.googleapis.com/auth/drive.readonly` - Read files from Drive
- `https://www.googleapis.com/auth/drive.file` - Upload files to Drive (if needed)

## 🚨 Important Notes

1. **OAuth Consent Screen**: Must be configured before users can use it
2. **Redirect URIs**: Must match exactly (including http/https, port, trailing slashes)
3. **Test Mode**: In test mode, only added test users can use the app
4. **Production**: Submit for verification if you want public access

## 🔗 Useful Links

- [Google Cloud Console](https://console.cloud.google.com/)
- [OAuth Consent Screen](https://console.cloud.google.com/apis/credentials/consent)
- [Credentials](https://console.cloud.google.com/apis/credentials)
- [Google Drive API Docs](https://developers.google.com/drive/api)

## 🐛 Troubleshooting

### Error: "Redirect URI mismatch"
- Check authorized redirect URIs in Google Cloud Console
- Ensure URI matches exactly (including protocol, port, path)

### Error: "Access blocked"
- Check OAuth consent screen configuration
- Add your email as a test user (if in test mode)
- Verify scopes are added

### Error: "API not enabled"
- Enable Google Drive API in Google Cloud Console
- Wait a few minutes for changes to propagate

### Picker not loading
- Check browser console for errors
- Verify Google APIs script is loading
- Check network tab for API calls

## ✅ Checklist

- [ ] Google Drive API enabled
- [ ] OAuth consent screen configured
- [ ] Authorized redirect URIs added
- [ ] Authorized JavaScript origins added
- [ ] Test user added (if in test mode)
- [ ] Scopes added to consent screen
- [ ] Tested file upload flow

---

**Google Drive integration is now configured!** 🎉

Users can now upload files directly from their Google Drive when placing orders.

