# Quick Fix: Netlify Environment Variables

## Problem
Your live site shows: `Supabase environment variables not set. Authentication and database features will not work.`

## Solution: Add Environment Variables to Netlify

### Step 1: Get Your Supabase Keys

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click **Project Settings** (gear icon in sidebar)
4. Click **API** in the left menu
5. You'll see:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon/public key**: (starts with `eyJ...`)

### Step 2: Add Variables to Netlify

1. Go to your Netlify Dashboard: https://app.netlify.com
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable**
5. Add these **TWO** variables:

   **Variable 1:**
   - Key: `VITE_SUPABASE_URL`
   - Value: `https://your-project-id.supabase.co` (replace with your actual Supabase URL)
   - Scopes: ✅ Production, ✅ Deploy previews, ✅ Branch deploys

   **Variable 2:**
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: (paste your anon key from Supabase)
   - Scopes: ✅ Production, ✅ Deploy previews, ✅ Branch deploys

6. Click **Save** for each variable

### Step 3: Redeploy Your Site

After adding the variables, you MUST redeploy:

1. Go to **Deploys** tab in Netlify
2. Click **Trigger deploy** → **Deploy site**
3. Wait for the deploy to complete (2-3 minutes)
4. Refresh your live site

### ✅ That's It!

Your site should now work. The Supabase client will be able to connect to your database.

## Optional: Add Other Environment Variables

If you want to enable payments (Stripe) or other features, you can also add:

- `VITE_STRIPE_PUBLISHABLE_KEY` (for Stripe payments)
- `STRIPE_SECRET_KEY` (for Stripe webhooks - server-side only)
- `STRIPE_WEBHOOK_SECRET` (for Stripe webhooks - server-side only)

See `netlify.env.example` for the complete list.

## Troubleshooting

**Still not working after redeploy?**
1. Check that variables are set correctly in Netlify
2. Make sure variable names start with `VITE_` (required for Vite)
3. Check browser console for any other errors
4. Verify your Supabase project is active and accessible

**Need to test locally?**
Create a `.env.local` file in your project root:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Then run `npm run dev` to test locally.

