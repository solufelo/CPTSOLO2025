# Stripe Quick Setup Guide

## 🎯 What You Need

This guide sets up Stripe payments for your voice tag orders. It's streamlined to work with your existing Supabase + React setup.

---

## 📋 Step 1: Stripe Dashboard Setup (5 minutes)

### 1.1 Create Stripe Account
1. Go to https://stripe.com and sign up
2. Complete account setup
3. **Important:** Keep it in **Test Mode** for now (toggle in bottom left)

### 1.2 API Keys (Already Configured ✅)

Your Stripe test keys have been added to `.env.local` (gitignored for security).

### 1.3 Add Environment Variables to Netlify

**In Netlify Dashboard:**
1. Go to your site → **Site settings → Environment variables**
2. Add these variables (get your keys from Stripe Dashboard → Developers → API keys):

```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

**Important:** 
- Get your keys from: Stripe Dashboard → Developers → API keys
- Copy the **Secret key** (starts with `sk_test_`) - Click "Reveal" to see it
- Copy the **Publishable key** (starts with `pk_test_`)
- Never commit these keys to git

**Note:** 
- `STRIPE_SECRET_KEY` - For Netlify functions (server-side only)
- `VITE_STRIPE_PUBLISHABLE_KEY` - For frontend (safe to expose)
- Never commit secret keys to git (already in `.gitignore`)

---

## 📋 Step 2: Set Up Webhook (10 minutes)

### 2.1 Create Webhook Endpoint
1. Go to **Developers → Webhooks** in Stripe Dashboard
2. Click **+ Add endpoint**
3. Enter your live site URL:
   ```
   https://your-site-name.netlify.app/.netlify/functions/stripe-webhook
   ```
4. Select events to listen to:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click **Add endpoint**

### 2.2 Get Webhook Secret
1. After creating the webhook, click on it
2. Find **Signing secret** section
3. Click **Reveal** and copy the secret (starts with `whsec_`)
4. Add to Netlify environment variables:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

### 2.3 Test Webhook Locally (Optional)
For local testing, use Stripe CLI:
```bash
stripe listen --forward-to localhost:8888/.netlify/functions/stripe-webhook
```

---

## 📋 Step 3: Deploy Netlify Functions

The functions are already created in `netlify/functions/`:
- `create-checkout-session.js` - Creates Stripe checkout
- `stripe-webhook.js` - Handles webhook events

**Just deploy:**
```bash
git add -A
git commit -m "Add Stripe payment integration"
git push origin main
```

Netlify will automatically deploy the functions.

---

## 📋 Step 4: Update Order Status Handler

You need to update the webhook to actually update your Supabase orders. 

**Option A: Use Supabase Admin Client (Recommended)**

1. Install Supabase admin:
```bash
npm install @supabase/supabase-js
```

2. Add to Netlify environment variables:
```env
SUPABASE_URL=https://oqzenbmylfyezibinxda.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

3. Update `netlify/functions/stripe-webhook.js`:
```javascript
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// In handleCheckoutCompleted function:
await supabase
  .from('orders')
  .update({ 
    status: 'paid',
    stripe_checkout_session_id: session.id,
    stripe_payment_intent_id: session.payment_intent,
  })
  .eq('user_id', metadata.userId)
  .is('stripe_checkout_session_id', null);
```

---

## 🧪 Step 5: Test the Flow

### Test with Stripe Test Cards:
1. Go to `/order/voice-tag`
2. Fill out the form
3. Click "Pay $XX"
4. Use test card: `4242 4242 4242 4242`
5. Any future expiry date
6. Any 3-digit CVC
7. Complete payment
8. Should redirect to success page
9. Check dashboard - order should show as "paid"

### Test Webhook:
1. Complete a test payment
2. Check Stripe Dashboard → **Developers → Webhooks → [Your webhook] → Logs**
3. Should see successful webhook calls
4. Check Netlify Functions logs in dashboard

---

## ✅ Checklist

- [ ] Stripe account created
- [ ] API keys obtained (publishable + secret)
- [ ] Environment variables added to Netlify
- [ ] Webhook endpoint created
- [ ] Webhook secret added to Netlify
- [ ] Functions deployed
- [ ] Test payment completed
- [ ] Webhook logs showing success
- [ ] Order status updating in Supabase

---

## 🚀 Going Live

When ready for production:

1. **Switch to Live Mode** in Stripe Dashboard
2. **Get Live API Keys** (replace test keys)
3. **Update Environment Variables** in Netlify with live keys
4. **Update Webhook URL** to production domain
5. **Test with real card** (small amount first!)

---

## 📚 Files Created

- `netlify/functions/create-checkout-session.js` - Creates Stripe checkout
- `netlify/functions/stripe-webhook.js` - Handles webhooks
- `src/pages/OrderSuccess.jsx` - Success page
- `src/pages/OrderCancel.jsx` - Cancel page

---

## 🔗 Useful Links

- [Stripe Dashboard](https://dashboard.stripe.com)
- [Stripe Test Cards](https://stripe.com/docs/testing)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)

---

**That's it! Your Stripe integration is ready.** 🎉

The payment flow:
1. User fills order form
2. Clicks "Pay"
3. Redirected to Stripe Checkout
4. Completes payment
5. Webhook updates order status
6. User sees success page
7. Order appears in dashboard as "paid"

