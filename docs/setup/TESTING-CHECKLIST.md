# 🧪 Testing Checklist - Voice Tag Order System

## ✅ Pre-Testing Setup (Complete These First)

### 1. Environment Variables in Netlify
- [ ] **Stripe Keys:**
  - [ ] `STRIPE_SECRET_KEY` - From Stripe Dashboard → Developers → API keys
  - [ ] `VITE_STRIPE_PUBLISHABLE_KEY` - From Stripe Dashboard → Developers → API keys
- [ ] **Supabase Keys:**
  - [ ] `VITE_SUPABASE_URL` - Already in `.env.local`
  - [ ] `VITE_SUPABASE_ANON_KEY` - Already in `.env.local`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY` - For webhook (optional, if needed)

**Where to add:** Netlify Dashboard → Site settings → Environment variables

---

### 2. Stripe Webhook Setup
- [ ] **Create Webhook Endpoint:**
  1. Go to Stripe Dashboard → Developers → Webhooks
  2. Click "+ Add endpoint"
  3. Endpoint URL: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
  4. Events to listen for: `checkout.session.completed`
  5. Click "Add endpoint"
- [ ] **Copy Webhook Secret:**
  - [ ] Copy the "Signing secret" (starts with `whsec_`)
  - [ ] Add to Netlify environment variables as `STRIPE_WEBHOOK_SECRET`

---

### 3. Supabase Database Setup
- [ ] **Run SQL Schema:**
  - [ ] Go to Supabase Dashboard → SQL Editor
  - [ ] Run `supabase-schema.sql` (creates `profiles`, `orders`, `order_files` tables)
- [ ] **Set Up Storage Bucket:**
  - [ ] Go to Supabase Dashboard → Storage
  - [ ] Create bucket: `order-files`
  - [ ] Set bucket to **Public** (or configure RLS policies)
  - [ ] Enable file uploads

---

### 4. Stripe Business Information (Optional but Recommended)
- [ ] **Statement Descriptor:**
  - [ ] Go to Stripe Dashboard → Settings → Branding
  - [ ] Set statement descriptor: `CAPTAINSOLO`
  - [ ] (Optional) Set shortened descriptor: `VOICE`
- [ ] **Business Information:**
  - [ ] Go to Stripe Dashboard → Settings → Business information
  - [ ] Add phone: `+1 289 233 8317`
  - [ ] Add business name, address, etc.

---

## 🧪 Testing Steps

### Test 1: User Registration & Login
- [ ] Go to `/login` or `/signup`
- [ ] Create a new account
- [ ] Verify email (check Supabase Dashboard → Authentication → Users)
- [ ] Log in successfully
- [ ] Check if user appears in `profiles` table

**Expected Result:** User can register, verify email, and log in. Profile created in database.

---

### Test 2: Voice Tag Order Form
- [ ] Go to `/order/voice-tag`
- [ ] **Step 1 - Voice Tag Info:**
  - [ ] Enter voice tag text (e.g., "Captain Solo on the beat")
  - [ ] Enter pronunciation (e.g., "CAP·TAIN SO·LO")
  - [ ] (Optional) Upload pronunciation audio
  - [ ] Enter secondary email (optional)
  - [ ] Click "Continue"
- [ ] **Step 2 - Voice Style:**
  - [ ] Select tone of voice (e.g., "Confident")
  - [ ] Select effects (e.g., "Reverb", "Echo")
  - [ ] Set tempo sync (Yes/No)
  - [ ] (If Yes) Enter BPM
  - [ ] Select vocal pitch
  - [ ] Click "Continue"
- [ ] **Step 3 - Package Selection:**
  - [ ] Select package (Basic, Standard, Premium)
  - [ ] Verify price updates
  - [ ] (Optional) Upload reference files
  - [ ] Enter instructions
  - [ ] Click "Continue"
- [ ] **Step 4 - Payment:**
  - [ ] Review order summary
  - [ ] Click "Pay $XX"

**Expected Result:** Form validates, all steps work, order summary shows correctly.

---

### Test 3: Stripe Checkout
- [ ] After clicking "Pay", redirected to Stripe Checkout
- [ ] **Test Card:** `4242 4242 4242 4242`
- [ ] **Test Details:**
  - Expiry: Any future date (e.g., `12/25`)
  - CVC: Any 3 digits (e.g., `123`)
  - ZIP: Any 5 digits (e.g., `12345`)
- [ ] Fill in email (or use test email)
- [ ] Fill in phone number (or skip if optional)
- [ ] Click "Pay"
- [ ] Complete payment

**Expected Result:** Payment succeeds, redirected to `/order/success`.

---

### Test 4: Order Creation & Webhook
- [ ] After payment, check Supabase Dashboard → Table Editor → `orders`
- [ ] Verify order created with:
  - [ ] `status` = `paid`
  - [ ] `stripe_checkout_session_id` = session ID
  - [ ] `stripe_payment_intent_id` = payment intent ID
  - [ ] `user_id` = your user ID
  - [ ] `requirements` = JSON with order details
- [ ] Check Stripe Dashboard → Developers → Webhooks
- [ ] Verify webhook event `checkout.session.completed` was received
- [ ] Check webhook logs for success

**Expected Result:** Order created in database with `paid` status. Webhook receives event and updates order.

---

### Test 5: User Dashboard
- [ ] Go to `/dashboard`
- [ ] Verify you're logged in (if not, log in first)
- [ ] Check if order appears in dashboard
- [ ] Verify order details:
  - [ ] Order ID
  - [ ] Service type: `voice-tag`
  - [ ] Package type
  - [ ] Price
  - [ ] Status: `paid`
  - [ ] Order date

**Expected Result:** Dashboard shows orders with correct details.

---

### Test 6: File Uploads
- [ ] Go to `/order/voice-tag`
- [ ] **Test Regular File Upload:**
  - [ ] Click "Choose Files" or drag & drop
  - [ ] Upload a test file (audio, image, etc.)
  - [ ] Verify file appears in upload list
  - [ ] Verify file name and size displayed
- [ ] **Test Google Drive Upload:**
  - [ ] Click "Upload from Google Drive"
  - [ ] Authorize Google Drive access
  - [ ] Select a file from Google Drive
  - [ ] Verify file appears in upload list

**Expected Result:** Files upload successfully, appear in order requirements.

---

### Test 7: Error Handling
- [ ] **Test Invalid Payment:**
  - [ ] Use test card: `4000 0000 0000 0002` (declined card)
  - [ ] Try to complete payment
  - [ ] Verify error message shown
- [ ] **Test Cancel Payment:**
  - [ ] Start checkout
  - [ ] Click "Cancel" or close window
  - [ ] Verify redirected to `/order/cancel`
- [ ] **Test Form Validation:**
  - [ ] Try to submit form without required fields
  - [ ] Verify validation errors shown

**Expected Result:** Errors handled gracefully, user-friendly error messages.

---

## 🐛 Common Issues & Fixes

### Issue: "Stripe publishable key not found"
**Fix:** Add `VITE_STRIPE_PUBLISHABLE_KEY` to Netlify environment variables and rebuild.

### Issue: "Webhook not receiving events"
**Fix:** 
- Check webhook URL is correct in Stripe Dashboard
- Verify `STRIPE_WEBHOOK_SECRET` is set in Netlify
- Check webhook logs in Stripe Dashboard

### Issue: "Order not created after payment"
**Fix:**
- Check Supabase RLS policies allow inserts
- Check webhook is receiving events
- Check Supabase logs for errors

### Issue: "File upload fails"
**Fix:**
- Check Supabase Storage bucket exists: `order-files`
- Check bucket is public or RLS policies allow uploads
- Check file size limits

### Issue: "Google Drive upload not working"
**Fix:**
- Check Google OAuth consent screen is configured
- Check `VITE_GOOGLE_CLIENT_ID` is set
- Check authorized domains in Google Cloud Console

---

## ✅ Ready to Test When:

- [x] Environment variables set in Netlify
- [ ] Stripe webhook configured
- [ ] Supabase database tables created
- [ ] Supabase storage bucket created
- [ ] Stripe test mode enabled
- [ ] All code deployed to Netlify

---

## 📝 Test Results Template

```
Date: ___________
Tester: ___________

Test 1: User Registration & Login
Result: ✅ Pass / ❌ Fail
Notes: ___________

Test 2: Voice Tag Order Form
Result: ✅ Pass / ❌ Fail
Notes: ___________

Test 3: Stripe Checkout
Result: ✅ Pass / ❌ Fail
Notes: ___________

Test 4: Order Creation & Webhook
Result: ✅ Pass / ❌ Fail
Notes: ___________

Test 5: User Dashboard
Result: ✅ Pass / ❌ Fail
Notes: ___________

Test 6: File Uploads
Result: ✅ Pass / ❌ Fail
Notes: ___________

Test 7: Error Handling
Result: ✅ Pass / ❌ Fail
Notes: ___________
```

---

## 🚀 Next Steps After Testing

1. **Fix any issues** found during testing
2. **Test with real cards** (when ready for production)
3. **Switch to live mode** in Stripe (after testing)
4. **Update environment variables** with live keys
5. **Set up production webhook** endpoint
6. **Test end-to-end** with real payment

---

## 📚 Resources

- [Stripe Test Cards](https://stripe.com/docs/testing)
- [Stripe Webhook Testing](https://stripe.com/docs/webhooks/test)
- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)

---

**Ready to test? Complete the Pre-Testing Setup checklist first!** ✅

