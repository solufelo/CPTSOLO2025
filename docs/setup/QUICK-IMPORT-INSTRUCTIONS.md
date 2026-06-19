# ⚡ Quick Import Instructions - Your Live Keys Are Ready!

## 🎯 Your `netlify.env` File is Ready!

Your live Stripe keys are already in `netlify.env` (gitignored - safe and secure).

---

## 📥 Import to Netlify (2 minutes)

### Step 1: Open Netlify Dashboard
1. Go to: https://app.netlify.com
2. Select your site
3. Go to: **Site settings → Environment variables**

### Step 2: Import Environment Variables
1. Click **"Import from file"** or **"Import from .env file"** button
2. Select the `netlify.env` file from your project
3. Click **"Import"**
4. Verify all variables are imported correctly

### Step 3: Add Missing Variables (if any)
If you still need to add:
- `STRIPE_WEBHOOK_SECRET` - Get after setting up webhook
- `SUPABASE_SERVICE_ROLE_KEY` - Get from Supabase Dashboard

### Step 4: Deploy
1. Go to: **Deploys**
2. Click **"Trigger deploy" → "Deploy site"**
3. Wait for deployment to complete

---

## ✅ What's Already in `netlify.env`

- ✅ `STRIPE_SECRET_KEY` - Your live secret key
- ✅ `VITE_STRIPE_PUBLISHABLE_KEY` - Your live publishable key
- ✅ `VITE_SUPABASE_URL` - Your Supabase URL
- ✅ `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key
- ✅ `VITE_GOOGLE_CLIENT_ID` - Your Google Client ID
- ✅ `VITE_GOOGLE_CLIENT_SECRET` - Your Google Client Secret
- ✅ `VITE_GOOGLE_API_KEY` - Your Google API Key
- ✅ `VITE_GOOGLE_PROJECT_ID` - Your Google Project ID

---

## 🔧 Still Need to Add

After importing, you may need to add:

### 1. Stripe Webhook Secret
- Set up webhook in Stripe Dashboard (LIVE mode)
- Copy the signing secret (starts with `whsec_`)
- Add to Netlify as: `STRIPE_WEBHOOK_SECRET`

### 2. Supabase Service Role Key
- Get from: Supabase Dashboard → Project Settings → API
- Copy the `service_role` key (keep it secret!)
- Add to Netlify as: `SUPABASE_SERVICE_ROLE_KEY`

---

## 🚀 Next Steps

1. ✅ Import `netlify.env` to Netlify
2. ✅ Add webhook secret (after setting up webhook)
3. ✅ Add Supabase service role key
4. ✅ Deploy site
5. ✅ Test payment flow

---

## ⚠️ Important Reminders

- **These are LIVE keys** - real payments will be processed
- **Test carefully** with small amounts first
- **Set up webhook** in LIVE mode (not test mode)
- **Monitor Stripe Dashboard** for payments
- **Never commit** `netlify.env` to git (already gitignored)

---

**Ready to import? Open Netlify Dashboard and import `netlify.env`!** 🚀

