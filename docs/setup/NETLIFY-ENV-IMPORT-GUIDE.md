# 📥 Netlify Environment Variables Import Guide

## 🎯 Quick Import Method

### Option 1: Import from File (Easiest)

1. **Fill in your secrets:**
   ```bash
   # Copy the template
   cp netlify.env.example netlify.env
   
   # Edit with your actual secrets
   nano netlify.env  # or use your favorite editor
   ```

2. **Import to Netlify:**
   - Go to: **Netlify Dashboard → Your Site → Site settings → Environment variables**
   - Click **"Import from file"** or **"Import from .env file"**
   - Select your `netlify.env` file
   - Click **"Import"**

3. **Verify:**
   - Check that all variables are imported
   - Make sure no values are empty

4. **Deploy:**
   - Go to: **Deploys → Trigger deploy → Deploy site**
   - Wait for deployment to complete

---

### Option 2: Manual Entry (More Control)

1. **Go to Netlify Dashboard:**
   - Your Site → **Site settings → Environment variables**

2. **Add each variable one by one:**
   - Click **"Add a variable"**
   - Enter variable name and value
   - Click **"Save"**
   - Repeat for each variable

3. **Required Variables (Minimum):**
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   VITE_SUPABASE_URL=https://...
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```

---

## 📋 Required Variables Checklist

### ✅ Minimum Required (Must Have)
- [ ] `STRIPE_SECRET_KEY` - Stripe secret key
- [ ] `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- [ ] `VITE_SUPABASE_URL` - Supabase project URL
- [ ] `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

### 🔧 Recommended (For Full Functionality)
- [ ] `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret (for order updates)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (for webhooks)
- [ ] `SUPABASE_URL` - Supabase URL (for server-side functions)

### 🎁 Optional (For Google Drive Integration)
- [ ] `VITE_GOOGLE_CLIENT_ID` - Google OAuth client ID
- [ ] `VITE_GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- [ ] `VITE_GOOGLE_API_KEY` - Google API key
- [ ] `VITE_GOOGLE_PROJECT_ID` - Google project ID

---

## 🔑 Where to Get Your Keys

### Stripe Keys
1. Go to: **Stripe Dashboard → Developers → API keys**
2. Copy:
   - **Secret key** (starts with `sk_test_` or `sk_live_`)
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
3. **Webhook Secret:**
   - Go to: **Stripe Dashboard → Developers → Webhooks**
   - Click your webhook endpoint
   - Copy **"Signing secret"** (starts with `whsec_`)

### Supabase Keys
1. Go to: **Supabase Dashboard → Project Settings → API**
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - **Keep this secret!**

### Google Drive Keys
1. Go to: **Google Cloud Console → APIs & Services → Credentials**
2. Create OAuth 2.0 Client ID (if not already created)
3. Copy:
   - **Client ID** (ends with `.apps.googleusercontent.com`)
   - **Client Secret** (starts with `GOCSPX-`)
   - **API Key** (from API Keys section)

---

## 🧪 Testing Your Setup

### 1. Verify Environment Variables
```bash
# Check if variables are set (after deployment)
# Go to: Netlify Dashboard → Site settings → Environment variables
# All variables should show their values (masked for security)
```

### 2. Test Payment Flow
1. Go to your site: `https://your-site.netlify.app/order/voice-tag`
2. Fill out the order form
3. Click "Pay"
4. Use test card: `4242 4242 4242 4242`
5. Complete payment
6. Check if order is created in Supabase

### 3. Test Webhook
1. Complete a test payment
2. Go to: **Stripe Dashboard → Developers → Webhooks**
3. Click your webhook endpoint
4. Check **"Recent events"** - should show `checkout.session.completed`
5. Check Supabase `orders` table - status should be `paid`

---

## 🚨 Troubleshooting

### Issue: "Stripe key not found"
**Solution:**
- Check `VITE_STRIPE_PUBLISHABLE_KEY` is set in Netlify
- Rebuild the site after adding variables
- Check browser console for errors

### Issue: "Supabase connection failed"
**Solution:**
- Check `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Verify URLs don't have trailing slashes
- Check Supabase project is active

### Issue: "Webhook not receiving events"
**Solution:**
- Check `STRIPE_WEBHOOK_SECRET` is set correctly
- Verify webhook URL in Stripe matches your Netlify site
- Check webhook endpoint is enabled in Stripe
- Check Netlify function logs for errors

### Issue: "Environment variables not updating"
**Solution:**
- **You MUST redeploy after adding/updating variables**
- Go to: **Deploys → Trigger deploy → Deploy site**
- Clear browser cache and hard refresh

---

## 📝 Notes

### Variable Naming
- **`VITE_` prefix:** Exposed to frontend (browser)
  - Use for: Public URLs, publishable keys
  - Example: `VITE_SUPABASE_URL`, `VITE_STRIPE_PUBLISHABLE_KEY`
  
- **No prefix:** Server-side only (Netlify Functions)
  - Use for: Secret keys, service role keys
  - Example: `STRIPE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

### Security Best Practices
1. ✅ Never commit `.env` files with real secrets
2. ✅ Use test keys for development
3. ✅ Rotate keys if accidentally exposed
4. ✅ Use different keys for test and production
5. ✅ Monitor Stripe and Supabase logs for suspicious activity

### Production vs Test Mode
- **Test Mode:** Use keys starting with `pk_test_` and `sk_test_`
- **Live Mode:** Use keys starting with `pk_live_` and `sk_live_`
- **Always test with test keys first!**

---

## ✅ Quick Checklist

Before testing, make sure you have:

- [ ] Filled in `netlify.env` with your actual secrets
- [ ] Imported variables to Netlify (or added manually)
- [ ] Triggered a new deployment
- [ ] Set up Stripe webhook
- [ ] Set up Supabase database (run `supabase-schema.sql`)
- [ ] Created Supabase storage bucket (`order-files`)
- [ ] Tested payment flow with test card

---

## 🚀 Ready to Test!

Once all variables are set and site is deployed, you're ready to test!

See `TESTING-CHECKLIST.md` for comprehensive testing guide.

---

**Need Help?**
- Check `STRIPE-QUICK-SETUP.md` for Stripe setup
- Check `SUPABASE-SETUP-INSTRUCTIONS.md` for Supabase setup
- Check `GOOGLE-DRIVE-SETUP.md` for Google Drive setup

