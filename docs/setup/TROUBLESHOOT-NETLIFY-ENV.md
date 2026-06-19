# Troubleshooting: Supabase Environment Variables Not Working

## ⚠️ Error You're Seeing

```
Supabase environment variables not set. Authentication and database features will not work.
Uncaught Error: supabaseUrl is required.
```

## ✅ Step-by-Step Fix

### Step 1: Verify Variables Are Set in Netlify

1. **Go to Netlify Dashboard**: https://app.netlify.com
2. **Select your site**
3. **Go to**: **Site settings** → **Environment variables**
4. **Check that these EXACT variable names exist:**

   ✅ `VITE_SUPABASE_URL`
   ✅ `VITE_SUPABASE_ANON_KEY`

5. **Verify the values:**
   - `VITE_SUPABASE_URL` should be: `https://your-project-id.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` should be: `eyJ...` (long string)

### Step 2: Check Variable Scopes

**Make sure both variables are enabled for:**
- ✅ Production
- ✅ Deploy previews  
- ✅ Branch deploys

If they're only enabled for one scope, enable all three.

### Step 3: Verify Variable Names (Common Mistakes)

**❌ WRONG:**
- `SUPABASE_URL` (missing `VITE_` prefix)
- `SUPABASE_ANON_KEY` (missing `VITE_` prefix)
- `VITE_SUPABASE_URL_` (extra underscore)
- `VITE_SUPABASE_ANON_KEY_` (extra underscore)

**✅ CORRECT:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

**Why `VITE_` prefix?**
- Vite (your build tool) only exposes environment variables that start with `VITE_` to the frontend
- Without this prefix, the variables won't be available in your React code

### Step 4: Redeploy After Adding Variables

**After adding or updating variables, you MUST redeploy:**

1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait for deploy to complete (look for green checkmark)
4. Refresh your live site

**Important:** Variables are only available to NEW deploys, not existing ones!

### Step 5: Verify Variables in Deploy Logs

1. Go to **Deploys** tab
2. Click on the latest deploy
3. Click **Deploy log**
4. Look for environment variables being loaded (you might see warnings if they're missing)

### Step 6: Clear Browser Cache

Sometimes browsers cache old JavaScript files:

1. **Hard refresh**: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. **Or clear cache**: Open DevTools → Right-click refresh button → "Empty Cache and Hard Reload"

---

## 🔍 How to Verify Variables Are Working

### Method 1: Check Browser Console

After redeploying, open browser console (F12) and type:
```javascript
console.log(import.meta.env.VITE_SUPABASE_URL)
console.log(import.meta.env.VITE_SUPABASE_ANON_KEY)
```

**Expected output:**
- First line: `https://your-project-id.supabase.co` (your actual Supabase URL)
- Second line: `eyJ...` (long string - your anon key)

**If you see `undefined`**: Variables aren't set correctly in Netlify

### Method 2: Check Network Tab

1. Open DevTools → **Network** tab
2. Refresh page
3. Look for requests to `supabase.co`
4. If you see errors, Supabase isn't connecting

---

## 🐛 Common Issues & Solutions

### Issue 1: "Variables are set but still not working"

**Solution:**
- ✅ Make sure you redeployed AFTER adding variables
- ✅ Check variable names have `VITE_` prefix
- ✅ Verify all scopes are enabled
- ✅ Clear browser cache

### Issue 2: "I added variables but they're not showing in deploy"

**Solution:**
- Variables are only visible in new deploys
- Trigger a new deploy after adding variables
- Check deploy logs for variable loading

### Issue 3: "Variables work locally but not on Netlify"

**Solution:**
- Local: Uses `.env.local` file
- Netlify: Uses environment variables in dashboard
- Make sure variables are set in BOTH places
- Netlify variables override local ones in production

### Issue 4: "I see the error but site still works"

**Solution:**
- Some features might work (static pages)
- Authentication and database won't work
- Must add variables for full functionality

---

## ✅ Quick Checklist

Before asking for help, verify:

- [ ] Variables are added in Netlify Dashboard
- [ ] Variable names are EXACTLY: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- [ ] Variables have `VITE_` prefix (required for Vite)
- [ ] All scopes are enabled (Production, Deploy previews, Branch deploys)
- [ ] You redeployed after adding variables
- [ ] You cleared browser cache
- [ ] Variable values are correct (no extra spaces, correct URL)

---

## 📝 Getting Your Supabase Keys (Again)

If you need to get your keys again:

1. **Go to**: https://supabase.com/dashboard
2. **Select your project**
3. **Click**: **Project Settings** (gear icon)
4. **Click**: **API** in left menu
5. **Copy**:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon/public key**: Starts with `eyJ...`

---

## 🆘 Still Not Working?

If you've tried everything above and it's still not working:

1. **Double-check variable names** (copy-paste from this guide)
2. **Create a fresh deploy** (don't just trigger, create a new commit and push)
3. **Check Netlify Function logs** (if using functions)
4. **Verify Supabase project is active** (not paused or deleted)

---

## 📞 Need More Help?

Check these files:
- `NETLIFY-ENV-QUICK-FIX.md` - Quick setup guide
- `netlify.env.example` - Example environment variables

