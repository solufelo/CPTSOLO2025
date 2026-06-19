# 🚀 Pre-Testing Setup - Quick Reference

## ⚡ What's Left Before Testing

### 1. ✅ Code is Ready
- [x] Stripe checkout integration
- [x] Order form with all fields
- [x] Payment processing
- [x] Webhook handler
- [x] Database schema
- [x] File upload (Supabase + Google Drive)

### 2. 🔧 Configuration Needed (15 minutes)

#### A. Netlify Environment Variables
Go to: **Netlify Dashboard → Site settings → Environment variables**

Add these:
```env
# Stripe (Required)
STRIPE_SECRET_KEY=sk_test_your_key_here
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here

# Supabase (Already have these?)
VITE_SUPABASE_URL=https://oqzenbmylfyezibinxda.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Stripe Webhook (After webhook setup)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

#### B. Stripe Webhook Setup
1. **Deploy site first** (so webhook URL exists)
2. Go to: **Stripe Dashboard → Developers → Webhooks**
3. Click **"+ Add endpoint"**
4. Endpoint URL: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
5. Events: Select `checkout.session.completed`
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add to Netlify env vars as `STRIPE_WEBHOOK_SECRET`

#### C. Supabase Database Setup
1. Go to: **Supabase Dashboard → SQL Editor**
2. Run the SQL from `supabase-schema.sql`
3. Go to: **Storage → Create bucket**
4. Bucket name: `order-files`
5. Make it **Public** (or configure RLS policies)

#### D. Deploy to Netlify
1. Push code to GitHub (already done)
2. Netlify will auto-deploy
3. Wait for deployment to complete
4. Test the site!

---

## 🧪 Quick Test Checklist

Once setup is complete, test these:

1. **User Registration**
   - [ ] Go to `/signup`
   - [ ] Create account
   - [ ] Verify email

2. **Order Form**
   - [ ] Go to `/order/voice-tag`
   - [ ] Fill out all steps
   - [ ] Verify form works

3. **Payment**
   - [ ] Click "Pay"
   - [ ] Use test card: `4242 4242 4242 4242`
   - [ ] Complete payment
   - [ ] Check redirected to `/order/success`

4. **Database**
   - [ ] Check Supabase → `orders` table
   - [ ] Verify order created with `paid` status

5. **Webhook**
   - [ ] Check Stripe Dashboard → Webhooks
   - [ ] Verify webhook received event
   - [ ] Check webhook logs

---

## 📋 Full Testing Guide

See `TESTING-CHECKLIST.md` for comprehensive testing scenarios.

---

## 🐛 Common Issues

### "Stripe key not found"
→ Add `VITE_STRIPE_PUBLISHABLE_KEY` to Netlify env vars and rebuild

### "Webhook not working"
→ Check webhook URL is correct, `STRIPE_WEBHOOK_SECRET` is set

### "Order not created"
→ Check Supabase RLS policies, webhook logs

### "File upload fails"
→ Check Supabase Storage bucket exists and is configured

---

## ✅ Ready to Test When:

- [ ] Environment variables set in Netlify
- [ ] Stripe webhook configured
- [ ] Supabase database tables created
- [ ] Supabase storage bucket created
- [ ] Site deployed to Netlify

---

**Time to complete: ~15 minutes** ⏱️

