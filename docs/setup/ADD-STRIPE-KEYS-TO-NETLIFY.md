# How to Add Stripe Payment Keys to Netlify

## 🎯 Quick Steps

### Step 1: Get Your Stripe Keys

1. **Go to Stripe Dashboard**: https://dashboard.stripe.com
2. **Make sure you're in the right mode:**
   - **Test Mode** (toggle in bottom left) - for testing
   - **Live Mode** - for real payments (only after testing!)
3. **Go to**: **Developers** → **API keys**
4. **You'll see two keys:**

   **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - This is safe to expose in frontend code
   - Copy this one

   **Secret key** (starts with `sk_test_` or `sk_live_`)
   - Click **"Reveal"** to see it
   - **NEVER expose this in frontend!** (Server-side only)
   - Copy this one

### Step 2: Add Keys to Netlify

1. **Go to Netlify Dashboard**: https://app.netlify.com
2. **Select your site**
3. **Go to**: **Site settings** → **Environment variables**
4. **Click "Add a variable"** and add these **THREE** variables:

---

#### **Variable 1: Stripe Publishable Key** (Frontend)

- **Key**: `VITE_STRIPE_PUBLISHABLE_KEY`
- **Value**: `pk_test_...` or `pk_live_...` (your publishable key)
- **Scopes**: ✅ Production, ✅ Deploy previews, ✅ Branch deploys
- **Click "Save"**

---

#### **Variable 2: Stripe Secret Key** (Server-side)

- **Key**: `bhttps://www.captainsolo.ca/contactY`
- **Value**: `sk_test_...` or `sk_live_...` (your secret key)
- **Scopes**: ✅ Production, ✅ Deploy previews, ✅ Branch deploys
- **Click "Save"**

**⚠️ Important**: This key does NOT start with `VITE_` because it's server-side only (used in Netlify Functions).

---

#### **Variable 3: Stripe Webhook Secret** (Optional - for now)

- **Key**: `STRIPE_WEBHOOK_SECRET`
- **Value**: `whsec_...` (you'll get this after setting up webhook)
- **Scopes**: ✅ Production, ✅ Deploy previews, ✅ Branch deploys
- **Click "Save"**

**Note**: You can add this later after setting up the webhook. See "Set Up Webhook" section below.

---

### Step 3: Redeploy Your Site

**After adding variables, you MUST redeploy:**

1. Go to **Deploys** tab in Netlify
2. Click **Trigger deploy** → **Deploy site**
3. Wait for deploy to complete (2-3 minutes)
4. Your Stripe payments should now work!

---

## 🔑 Key Differences

### Test Mode vs Live Mode

**Test Mode** (for development):
- Keys start with `pk_test_` and `sk_test_`
- Use test card numbers (see Stripe docs)
- No real money charged
- Use this first!

**Live Mode** (for production):
- Keys start with `pk_live_` and `sk_live_`
- Real payments processed
- Only switch after thorough testing!

### Variable Naming

**`VITE_` prefix** = Frontend (exposed to browser)
- `VITE_STRIPE_PUBLISHABLE_KEY` ✅ Safe to expose

**No `VITE_` prefix** = Server-side only (Netlify Functions)
- `STRIPE_SECRET_KEY` ✅ Never exposed to browser
- `STRIPE_WEBHOOK_SECRET` ✅ Never exposed to browser

---

## 🔗 Set Up Webhook (Optional - for order status updates)

After adding the keys, you can set up webhooks to automatically update order status:

1. **In Stripe Dashboard**: **Developers** → **Webhooks**
2. **Click "+ Add endpoint"**
3. **Endpoint URL**: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
4. **Select events**:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. **Click "Add endpoint"**
6. **Copy the "Signing secret"** (starts with `whsec_`)
7. **Add to Netlify** as `STRIPE_WEBHOOK_SECRET`
8. **Redeploy**

---

## ✅ Verification

After redeploying, test your payment flow:

1. Go to your site
2. Try to place an order
3. You should see Stripe Checkout
4. Use test card: `4242 4242 4242 4242` (any future date, any CVC)
5. Payment should process successfully

---

## 🐛 Troubleshooting

**"Stripe is not defined" error?**
- Make sure `VITE_STRIPE_PUBLISHABLE_KEY` is set
- Make sure it starts with `VITE_`
- Redeploy after adding

**"Failed to create checkout session" error?**
- Make sure `STRIPE_SECRET_KEY` is set (no `VITE_` prefix)
- Check Netlify Functions logs for errors
- Verify key is correct in Stripe Dashboard

**Webhook not working?**
- Make sure `STRIPE_WEBHOOK_SECRET` is set
- Check webhook URL is correct
- Verify webhook is enabled in Stripe Dashboard

---

## 📝 Summary

**Required Variables:**
1. ✅ `VITE_STRIPE_PUBLISHABLE_KEY` (frontend)
2. ✅ `STRIPE_SECRET_KEY` (server-side)
3. ⚠️ `STRIPE_WEBHOOK_SECRET` (optional, for webhooks)

**After adding:**
- ✅ Redeploy your site
- ✅ Test with test card numbers
- ✅ Switch to live keys only when ready for production

---

## 🔒 Security Notes

- ✅ Never commit secret keys to git (already in `.gitignore`)
- ✅ Secret keys are only used in Netlify Functions (server-side)
- ✅ Publishable keys are safe to expose (that's their purpose)
- ✅ Use test keys for development, live keys for production

