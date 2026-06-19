# 🚀 Live Keys Setup - Production Configuration

## ⚠️ IMPORTANT: You're Using LIVE (Production) Keys

You've provided **LIVE Stripe keys** which means:
- ✅ **Real payments** will be processed
- ✅ **Real money** will be charged
- ⚠️ **Test transactions will charge real cards**
- ⚠️ **Use test keys for development/testing**

---

## 🔑 Your Stripe Live Keys

**⚠️ IMPORTANT: Your live Stripe keys are in your `netlify.env` file (gitignored).**

**Never commit live keys to git!** They are:
- ✅ Already in `netlify.env` (gitignored)
- ✅ Ready to import to Netlify
- ✅ Secure and protected

**To view your keys:**
- Open `netlify.env` file in your project directory
- Keys are there, ready to import to Netlify

---

## 📋 Setup Instructions

### 1. Add to Netlify Environment Variables

**Option A: Import from File**
1. Copy `netlify.env.example` to `netlify.env`
2. Fill in your live keys (already in template)
3. Go to: **Netlify Dashboard → Site settings → Environment variables**
4. Click **"Import from file"**
5. Select `netlify.env`
6. Click **"Import"**

**Option B: Manual Entry**
1. Go to: **Netlify Dashboard → Site settings → Environment variables**
2. Add these variables (get from your `netlify.env` file or Stripe Dashboard):

```env
STRIPE_SECRET_KEY=sk_live_your_secret_key_here
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key_here
```

**Note:** Your actual keys are in `netlify.env` (gitignored) - copy them from there!

---

### 2. Set Up Live Webhook

1. **Deploy your site first** (so webhook URL exists)
2. Go to: **Stripe Dashboard → Developers → Webhooks**
3. Make sure you're in **LIVE MODE** (toggle in top right)
4. Click **"+ Add endpoint"**
5. Endpoint URL: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
6. Events to listen for: `checkout.session.completed`
7. Click **"Add endpoint"**
8. Copy the **Signing secret** (starts with `whsec_`)
9. Add to Netlify as: `STRIPE_WEBHOOK_SECRET`

---

### 3. Verify Stripe Dashboard Settings

#### Business Information
1. Go to: **Stripe Dashboard → Settings → Business information**
2. Verify:
   - Business name: `Captain Solo`
   - Phone: `+1 289 233 8317`
   - Address: Your business address
   - Website: `https://captainsolo.ca`

#### Statement Descriptor
1. Go to: **Stripe Dashboard → Settings → Branding**
2. Set statement descriptor: `CAPTAINSOLO`
3. (Optional) Set shortened descriptor: `VOICE`

#### Tax Settings (if applicable)
1. Go to: **Stripe Dashboard → Settings → Tax**
2. Configure tax rates for your region (Canada)
3. Enable automatic tax calculation if needed

---

## 🧪 Testing with Live Keys

### ⚠️ WARNING: Live Keys = Real Payments

When using live keys:
- ✅ **Real cards** will be charged
- ✅ **Real money** will be processed
- ❌ **Cannot use test cards** (like `4242 4242 4242 4242`)
- ❌ **Refunds must be processed manually**

### Recommended Testing Flow

1. **Use Small Amounts:**
   - Test with minimum order amount ($10)
   - Process refund immediately after testing

2. **Use Your Own Card:**
   - Test with a card you control
   - Verify payment appears correctly
   - Process refund after verification

3. **Check Webhook:**
   - Verify webhook receives events
   - Check order status updates in Supabase
   - Verify email receipts are sent

4. **Monitor Stripe Dashboard:**
   - Check payments appear correctly
   - Verify customer information
   - Check for any errors or warnings

---

## 🔄 Switching Between Test and Live Keys

### For Development (Use Test Keys)
```env
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### For Production (Use Live Keys)
```env
STRIPE_SECRET_KEY=sk_live_your_secret_key_here
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key_here
```

**Your live keys are already in `netlify.env` (gitignored) - ready to import!**

### Best Practice
- **Development/Staging:** Use test keys
- **Production:** Use live keys
- **Test thoroughly** with test keys before switching to live

---

## ✅ Pre-Production Checklist

Before going live, make sure:

- [ ] **Stripe Account:**
  - [ ] Account verified and activated
  - [ ] Business information complete
  - [ ] Bank account connected
  - [ ] Tax settings configured
  - [ ] Statement descriptor set

- [ ] **Netlify:**
  - [ ] Live keys added to environment variables
  - [ ] Site deployed and working
  - [ ] Webhook endpoint configured
  - [ ] Webhook secret added

- [ ] **Supabase:**
  - [ ] Database schema created
  - [ ] Storage bucket configured
  - [ ] RLS policies set correctly
  - [ ] Service role key added to Netlify

- [ ] **Testing:**
  - [ ] Tested order form (with small real payment)
  - [ ] Tested webhook (order status updates)
  - [ ] Tested file uploads
  - [ ] Tested email notifications
  - [ ] Tested refund process

- [ ] **Legal:**
  - [ ] Privacy Policy published (`/privacy-policy`)
  - [ ] Terms of Service published (`/terms-of-service`)
  - [ ] Refund policy clearly stated
  - [ ] Contact information visible

---

## 🚨 Security Reminders

1. ✅ **Never commit live keys to git**
   - Keys are in `.env.local` (gitignored)
   - Keys are in Netlify (secure environment)

2. ✅ **Rotate keys if exposed**
   - If keys are accidentally exposed, rotate immediately
   - Go to: Stripe Dashboard → Developers → API keys
   - Click "Roll key" to generate new keys

3. ✅ **Monitor Stripe Dashboard**
   - Check for suspicious activity
   - Monitor failed payments
   - Review chargebacks and disputes

4. ✅ **Use webhook secrets**
   - Always verify webhook signatures
   - Use `STRIPE_WEBHOOK_SECRET` in webhook handler
   - Never trust webhook events without verification

---

## 📞 Support

If you encounter issues:

1. **Check Stripe Dashboard:**
   - Payments → Check for failed payments
   - Developers → Webhooks → Check webhook logs
   - Settings → Check business information

2. **Check Netlify:**
   - Functions → Check function logs
   - Environment variables → Verify keys are set
   - Deploys → Check deployment status

3. **Check Supabase:**
   - Database → Check orders table
   - Storage → Check file uploads
   - Logs → Check for errors

---

## 🎉 Ready for Production!

Once you've completed the checklist:
1. ✅ Add live keys to Netlify
2. ✅ Set up live webhook
3. ✅ Test with small real payment
4. ✅ Verify everything works
5. ✅ Go live! 🚀

---

**Remember:** Live keys = Real money. Test carefully! 💰

