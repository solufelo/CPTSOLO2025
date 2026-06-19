# 🧪 Quick Testing Guide - Login, Signup & Stripe Payments

## 🚀 Quick Start Testing

### 1. Access the Application

**Local Development:**
```bash
npm run dev
```
Then open: `http://localhost:5173` (or the port shown in terminal)

**Production:**
Open your deployed site: `https://your-site.netlify.app`

---

## 📝 Step-by-Step Testing

### Test 1: Create Account (Sign Up)

1. **Navigate to Sign Up Page:**
   - Go to: `/signup` or click "Sign Up" link
   - URL: `http://localhost:5173/signup`

2. **Fill Out Sign Up Form:**
   - **Email:** Use a real email (you'll need to verify it)
   - **Password:** At least 6 characters
   - **Confirm Password:** Must match password

3. **Submit Form:**
   - Click "Sign Up" button
   - Check your email for verification link
   - Click verification link in email

4. **Verify in Supabase:**
   - Go to: Supabase Dashboard → Authentication → Users
   - Check that your user appears in the list
   - Status should be "Confirmed" after email verification

**✅ Expected Result:** Account created, verification email sent, user can log in after verification.

---

### Test 2: Login

1. **Navigate to Login Page:**
   - Go to: `/login` or click "Log In" link
   - URL: `http://localhost:5173/login`

2. **Enter Credentials:**
   - **Email:** The email you used to sign up
   - **Password:** Your password

3. **Click "Log In"**
   - You should be redirected to dashboard or home page
   - User session should be created

4. **Verify Login:**
   - Check browser console - should see user object
   - User should be able to access protected routes
   - Logout button should appear

**✅ Expected Result:** User successfully logged in, session created, redirected appropriately.

---

### Test 3: Order Voice Tag Service (Full Flow)

#### Step 1: Navigate to Order Page

1. **Go to Voice Tags Page:**
   - URL: `http://localhost:5173/voice-tags`
   - Click "Order Now" button
   - OR go directly to: `/order/voice-tag`

#### Step 2: Fill Out Order Form

**Step 1 - Voice Tag Info:**
- **Voice Tag Text:** Enter what you want the tag to say
  - Example: "Captain Solo on the beat"
- **Pronunciation:** Enter pronunciation guide
  - Example: "CAP·TAIN SO·LO"
- **Pronunciation Audio:** (Optional) Upload audio file
- **Secondary Email:** (Optional) Alternative email
- Click **"Continue"**

**Step 2 - Voice Style:**
- **Tone of Voice:** Select from dropdown
  - Options: Sexy, Serious, Confident, Dark, Excited, Happy, Sad, Whispered, Soft
- **Effects:** Select effects
  - Options: Reverse Reverb, Stutter, Tapestop, Reverb, Echo/Delay, Chorus, etc.
- **Tempo Sync:** Yes/No
- **BPM:** (If Yes) Enter BPM number
- **Vocal Pitch:** Select pitch option
- Click **"Continue"**

**Step 3 - Package Selection:**
- **Select Package:**
  - Basic ($10) - 1 dry tag, 2-day delivery
  - Standard ($20) - 2 tags (wet + dry), 24-hour delivery
  - Premium ($35) - 3 tags, unlimited revisions, 24-hour delivery
- **Upload Files:** (Optional) Upload reference files
- **Instructions:** Enter any special instructions
- Click **"Continue"**

#### Step 3: Payment with Stripe

1. **Review Order Summary:**
   - Check service type: Voice Tag
   - Check package type and price
   - Review all order details

2. **Click "Pay $XX" Button:**
   - You'll be redirected to Stripe Checkout

3. **Fill Out Stripe Checkout:**
   - **Email:** Your email (pre-filled if logged in)
   - **Card Number:** Use test card
     - **Success:** `4242 4242 4242 4242`
     - **Decline:** `4000 0000 0000 0002`
   - **Expiry Date:** Any future date (e.g., `12/25`)
   - **CVC:** Any 3 digits (e.g., `123`)
   - **ZIP Code:** Any 5 digits (e.g., `12345`)
   - **Phone Number:** (Optional) Your phone number

4. **Click "Pay"**
   - Payment should process successfully
   - You'll be redirected to `/order/success`

#### Step 4: Verify Order

1. **Check Success Page:**
   - Should see "Order Successful" message
   - Order ID should be displayed

2. **Check Supabase Database:**
   - Go to: Supabase Dashboard → Table Editor → `orders`
   - Find your order by user email or order ID
   - Verify:
     - `status` = `paid`
     - `service_type` = `voice-tag`
     - `package_type` = your selected package
     - `price` = correct amount
     - `requirements` = contains your order details

3. **Check Stripe Dashboard:**
   - Go to: Stripe Dashboard → Payments
   - Find the payment
   - Verify amount and customer email

4. **Check Webhook:**
   - Go to: Stripe Dashboard → Developers → Webhooks
   - Click your webhook endpoint
   - Check "Recent events" - should show `checkout.session.completed`
   - Verify webhook was successful

---

## 🧪 Test Cards (Stripe Test Mode)

### Success Cards:
- **Visa:** `4242 4242 4242 4242`
- **Visa (Debit):** `4000 0566 5566 5556`
- **Mastercard:** `5555 5555 5555 4444`
- **Amex:** `3782 822463 10005`

### Decline Cards:
- **Card Declined:** `4000 0000 0000 0002`
- **Insufficient Funds:** `4000 0000 0000 9995`
- **Expired Card:** `4000 0000 0000 0069`

### Other Test Scenarios:
- **Requires Authentication:** `4000 0025 0000 3155`
- **Processing Error:** `4000 0000 0000 0119`

**Test Card Details:**
- **Expiry:** Any future date (e.g., `12/25`)
- **CVC:** Any 3 digits (e.g., `123`)
- **ZIP:** Any 5 digits (e.g., `12345`)

---

## 📋 Complete Test Checklist

### Authentication:
- [ ] Can create new account
- [ ] Verification email received
- [ ] Can verify email
- [ ] Can log in with credentials
- [ ] Can log out
- [ ] Session persists on page refresh
- [ ] Protected routes redirect to login

### Order Flow:
- [ ] Can access `/order/voice-tag` page
- [ ] Can fill out Step 1 (Voice Tag Info)
- [ ] Can fill out Step 2 (Voice Style)
- [ ] Can select package in Step 3
- [ ] Can upload files
- [ ] Can proceed to payment

### Payment:
- [ ] Redirects to Stripe Checkout
- [ ] Can fill out payment form
- [ ] Payment processes successfully
- [ ] Redirects to success page
- [ ] Order created in Supabase
- [ ] Order status is "paid"
- [ ] Webhook receives event
- [ ] Order appears in dashboard

---

## 🐛 Troubleshooting

### Issue: Can't create account
**Solutions:**
- Check Supabase is running
- Check `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Check browser console for errors
- Verify email format is valid

### Issue: Can't log in
**Solutions:**
- Verify email is confirmed
- Check password is correct
- Check Supabase Authentication settings
- Clear browser cache and cookies

### Issue: Payment not working
**Solutions:**
- Check `VITE_STRIPE_PUBLISHABLE_KEY` is set
- Check Stripe is in test mode
- Verify webhook is configured
- Check browser console for errors
- Check Netlify function logs

### Issue: Order not created
**Solutions:**
- Check Supabase database tables exist
- Check RLS policies allow inserts
- Check webhook is receiving events
- Check Netlify function logs
- Verify order was created before payment

### Issue: Webhook not working
**Solutions:**
- Check webhook URL is correct
- Check `STRIPE_WEBHOOK_SECRET` is set
- Verify webhook endpoint is enabled
- Check Stripe webhook logs
- Verify site is deployed (webhook needs live URL)

---

## 🔗 Important URLs

### Local Development:
- **Home:** `http://localhost:5173/`
- **Login:** `http://localhost:5173/login`
- **Signup:** `http://localhost:5173/signup`
- **Voice Tags:** `http://localhost:5173/voice-tags`
- **Order:** `http://localhost:5173/order/voice-tag`
- **Dashboard:** `http://localhost:5173/dashboard`
- **Success:** `http://localhost:5173/order/success`

### Production:
- Replace `localhost:5173` with your domain (e.g., `https://captainsolo.ca`)

---

## 📊 What to Verify

### After Sign Up:
1. ✅ User appears in Supabase Authentication
2. ✅ Verification email sent
3. ✅ User can verify email
4. ✅ User profile created in `profiles` table

### After Login:
1. ✅ User session created
2. ✅ Can access protected routes
3. ✅ User info displayed in dashboard
4. ✅ Logout works

### After Payment:
1. ✅ Order created in `orders` table
2. ✅ Order status is "paid"
3. ✅ Payment appears in Stripe Dashboard
4. ✅ Webhook event received
5. ✅ Order appears in user dashboard
6. ✅ Success page shows correct order ID

---

## 🎯 Quick Test Script

```bash
# 1. Start dev server
npm run dev

# 2. Open browser to:
http://localhost:5173/signup

# 3. Create account
# 4. Verify email
# 5. Log in
http://localhost:5173/login

# 6. Go to order page
http://localhost:5173/order/voice-tag

# 7. Fill out form and pay with test card: 4242 4242 4242 4242

# 8. Verify order in Supabase Dashboard
```

---

## ✅ Success Criteria

You've successfully tested everything when:
- ✅ Can create account and verify email
- ✅ Can log in and out
- ✅ Can complete order form
- ✅ Can process payment with test card
- ✅ Order appears in database with "paid" status
- ✅ Webhook receives and processes event
- ✅ Order appears in user dashboard

---

**Ready to test? Start with sign up, then login, then try placing an order!** 🚀

