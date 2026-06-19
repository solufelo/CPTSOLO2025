# 📅 Booking & Payments Setup Guide - Captain Solo

## 🎯 Overview

This guide will help you set up:
1. **Calendly** - For consultation booking (FREE)
2. **Stripe Payment Links** - For accepting deposits/payments (FREE to setup, 2.9% + $0.30 per transaction)

**Total Setup Time: 20-30 minutes**

---

## 📅 PART 1: Calendly Booking System (FREE)

### Why Calendly?
- Clients can see your real availability
- Auto-syncs with your Google Calendar
- No double-booking
- Sends automatic reminders
- Professional and easy to use

---

### Step 1: Create Calendly Account

1. **Go to [calendly.com](https://calendly.com)**
2. Click "**Sign Up**"
3. Use Google sign-in (easiest)
4. Choose **FREE plan** (perfect for starting out)

---

### Step 2: Connect Your Calendar

1. Click "**Integrations**" (left sidebar)
2. Click "**Google Calendar**"
3. Click "**Connect**"
4. Select your calendar (use your main one)
5. This prevents double-booking!

---

### Step 3: Create "Free Consultation" Event

1. Click "**Event Types**" (top nav)
2. Click "**+ New Event Type**"
3. Choose "**One-on-One**"

**Event Details:**
```
Event Name: Free Project Consultation
Location: Google Meet (or Phone Call)
Duration: 30 minutes
Description:
"Let's discuss your project! In this call we'll cover:
• Your business goals and vision
• Project timeline and requirements  
• Which package fits your needs best
• Next steps to get started

Come prepared with:
- Examples of websites/videos you like
- Your budget range
- Rough timeline for launch

Looking forward to chatting!"
```

4. Click "**Next**"

---

### Step 4: Set Your Availability

**Your Schedule** (from memory):
- Monday: 9am-9pm
- Tuesday: 1pm-9pm
- Wednesday: 9am-9pm
- Thursday: 1pm-9pm
- Friday: 9am-9pm
- Saturday: 10am-8pm
- Sunday: 10am-6pm

**In Calendly:**
1. Click "**Availability**" (left sidebar)
2. Set "Date range": 60 days into future
3. Set "Time zone": Eastern Time (Toronto)
4. Set your hours for each day
5. Add "Buffer time": 15 mins between meetings

---

### Step 5: Customize Booking Page

1. Go to Event Type → "**Edit**"
2. Click "**Custom branding**" tab

**Settings:**
- Color: `#cfa355` (your gold color)
- Welcome message: "Book a free consultation with Solomon"
- Thank you message: "Excited to chat! Check your email for the Google Meet link."

---

### Step 6: Add Custom Questions

1. In Event Type → "**Invitee Questions**"
2. Add these questions:

```
Question 1: Which package are you interested in?
- Landing Page ($400-600)
- Business Website ($800-1,500)
- Video Content ($500-900)
- Website + Video Combo ($1,500-2,500) ⭐
- Full Web App ($2,500-5,000)
- Music Video ($600-1,200)
- Not sure / Custom project

Question 2: What's your approximate budget?
- Under $1,000
- $1,000-$2,500
- $2,500-$5,000
- $5,000+
- Flexible

Question 3: Tell me about your project (free text)
```

---

### Step 7: Get Your Booking Link

1. Go to your Event Type
2. Click "**Copy Link**"
3. Your link looks like: `https://calendly.com/solomon-olufelo/30min`

**Save this link!** You'll add it to your code next.

---

### Step 8: Add Link to Your Portfolio

Open `src/components/BookingWidget.jsx` and find line ~18:

```javascript
const calendlyUrl = "https://calendly.com/your-username/30min"; // ← Replace!
```

**Replace with your actual Calendly link:**

```javascript
const calendlyUrl = "https://calendly.com/solomon-olufelo/30min"; // ← Your actual link
```

**Done!** Your booking button now works! 🎉

---

## 💳 PART 2: Stripe Payment Links (Optional but Recommended)

### Why Stripe?
- Accept deposits before starting work (protect yourself!)
- Professional payment experience
- Instant payments
- No custom code needed (Payment Links are hosted by Stripe)

---

### Step 1: Create Stripe Account

1. **Go to [stripe.com](https://stripe.com)**
2. Click "**Start now**"
3. Sign up with your email
4. **Verify your email**

---

### Step 2: Activate Your Account

1. Click "**Activate account**" (top banner)
2. Fill out business info:
   ```
   Business name: Captain Solo
   Website: captainsolo.ca (or leave blank for now)
   Business type: Individual/Sole Proprietor
   Industry: Computer Programming
   ```
3. Add your bank account (for receiving payments)
4. Complete identity verification

**⚠️ Important:** Stripe needs to verify your identity before you can receive real payments. This usually takes 1-2 business days.

---

### Step 3: Test Mode First

1. Toggle "**Test mode**" ON (top right, switch icon)
2. Build your payment links in test mode first
3. Test everything
4. Then switch to Live mode

---

### Step 4: Create Payment Links

In Stripe dashboard, click "**Payment Links**" (left sidebar)

**Create these 6 payment links** (one for each package):

#### Link 1: Landing Page Deposit
```
Product name: Landing Page - 50% Deposit
Price: $250 CAD (50% of $500 avg)
Description: "50% deposit to begin work on your landing page. Remaining balance due upon project completion."
```

#### Link 2: Business Website Deposit
```
Product name: Business Website - 50% Deposit
Price: $600 CAD (50% of $1,200 avg)
Description: "50% deposit to begin work on your business website. Remaining balance due upon project completion."
```

#### Link 3: Video Package Deposit
```
Product name: Video Content Package - 50% Deposit
Price: $350 CAD (50% of $700 avg)
Description: "50% deposit to begin video production. Remaining balance due upon delivery."
```

#### Link 4: Combo Package Deposit ⭐ (Most Important)
```
Product name: Website + Video Combo - 50% Deposit
Price: $1,000 CAD (50% of $2,000 avg)
Description: "50% deposit to begin your integrated website + video project. Remaining balance due upon completion."
```

#### Link 5: Web App Deposit
```
Product name: Full Web App - 50% Deposit
Price: $1,875 CAD (50% of $3,750 avg)
Description: "50% deposit to begin full-stack web application development. Remaining balance due upon deployment."
```

#### Link 6: Music Video Deposit
```
Product name: Music Video - 50% Deposit
Price: $450 CAD (50% of $900 avg)
Description: "50% deposit to begin music video production. Remaining balance due upon delivery of final edit."
```

---

### Step 5: Copy Payment Link URLs

After creating each link:
1. Click the link
2. Click "**Copy link**"
3. Save it somewhere (Notes app)

Your links look like:
```
https://buy.stripe.com/test_XXXXX (test mode)
https://buy.stripe.com/live_XXXXX (live mode)
```

---

### Step 6: Add to Your Code (Optional)

Open `src/components/PaymentButton.jsx` and find the `paymentLinks` object (~17):

```javascript
const paymentLinks = {
  deposit_landing: "https://buy.stripe.com/test_YOUR_LINK_1",
  deposit_business: "https://buy.stripe.com/test_YOUR_LINK_2",
  deposit_video: "https://buy.stripe.com/test_YOUR_LINK_3",
  deposit_combo: "https://buy.stripe.com/test_YOUR_LINK_4", // ← Most important!
  deposit_webapp: "https://buy.stripe.com/test_YOUR_LINK_5",
  deposit_music: "https://buy.stripe.com/test_YOUR_LINK_6",
};
```

**Replace with your actual payment link URLs.**

---

## 🎯 How This Works (Client Journey)

### Option A: Contact Form (What you have now)
```
1. Client fills out contact form
2. You receive email
3. You reply and discuss project
4. You send Calendly link to book call
5. You have consultation
6. You send contract + Stripe payment link
7. Client pays deposit
8. You start work!
```

### Option B: Direct Booking (After Stripe is set up)
```
1. Client clicks "Book Free Consultation" on pricing card
2. Calendly opens, they schedule call
3. You receive booking notification
4. You have consultation
5. You send contract + Stripe payment link
6. Client pays deposit
7. You start work!
```

---

## 💡 Best Practices

### Always Get a Deposit
- **Minimum:** 50% upfront
- **Better:** 50% to start, 50% upon completion
- **Best:** 1/3 to start, 1/3 at midpoint, 1/3 at completion (for larger projects)

### Why Deposits Matter:
- Filters out non-serious clients
- Covers your time if they cancel
- Proves they have budget
- Makes them committed to the project

### Payment Workflow:
```
1. Free consultation (no payment)
2. Send proposal/contract via email
3. Send Stripe payment link for deposit
4. Wait for payment to clear (instant with Stripe)
5. Begin work ONLY after deposit received
6. Send invoice for remaining balance upon completion
```

---

## 🔒 Security & Protection

### Stripe Protects You:
- ✅ Instant payment confirmation
- ✅ No chargebacks if you provide proof of work
- ✅ Automatic fraud detection
- ✅ Secure payment processing

### Protect Yourself:
- Always get deposit before starting
- Keep email trail of all communication
- Send progress updates with screenshots
- Get written approval before final payment
- Only deliver final files after full payment

---

## 📊 Pricing Recommendations

### Deposit Structure by Package:

| Package | Total Price | Deposit (50%) | When to Charge Final |
|---------|-------------|---------------|---------------------|
| Landing Page | $400-600 | $200-300 | Upon launch |
| Business Site | $800-1,500 | $400-750 | Upon launch |
| Video Package | $500-900 | $250-450 | Upon delivery |
| **Combo** ⭐ | $1,500-2,500 | $750-1,250 | Upon completion |
| Web App | $2,500-5,000 | $1,250-2,500 | Upon deployment |
| Music Video | $600-1,200 | $300-600 | Upon final edit |

---

## 🎉 You're All Set!

### What You Now Have:
- ✅ Professional booking system
- ✅ Automated calendar management
- ✅ Payment processing capability
- ✅ Client qualification questions
- ✅ No double-booking protection

### Next Steps:
1. Test your Calendly link (book a fake appointment)
2. Test Stripe payment links (use test card: 4242 4242 4242 4242)
3. Send booking link to first few clients
4. Collect those deposits! 💰

---

## 🧪 Testing

### Test Calendly:
1. Open your Calendly link
2. Book a test appointment
3. Check your email for confirmation
4. Join the Google Meet
5. Cancel the test booking

### Test Stripe (Test Mode):
1. Use test payment link
2. Use card: `4242 4242 4242 4242`
3. Expiry: Any future date
4. CVC: Any 3 digits
5. Zip: Any 5 digits
6. You'll see payment in Stripe dashboard!

---

## 💬 Email Templates

### After Consultation (Send This):

```
Subject: Captain Solo - Project Proposal & Next Steps

Hey [Client Name],

Great chatting with you today! I'm excited about [their project].

Here's what we discussed:
• Package: [Package Name]
• Price: $[X,XXX] CAD
• Timeline: [X weeks]
• Deliverables: [List what's included]

Next Steps:
1. Review this proposal
2. If you're ready to move forward, pay the 50% deposit ($[XXX]) here:
   [Your Stripe Payment Link]
3. Once payment clears, I'll get started immediately!

Questions? Just hit reply.

Looking forward to working together!

- Solomon
Captain Solo
work@captainsolo.ca
```

---

## ❓ FAQ

### "Should I offer payment plans?"
For projects over $2,000, consider 3 payments: 33% to start, 33% at midpoint, 33% at completion.

### "What if they want to pay with PayPal/Interac?"
Stripe is better (instant, no fees for you), but if client insists, you can accept alternative payments. Just make sure you get deposit first.

### "How do I handle scope creep?"
In your contract, clearly define what's included. Extra work = extra charges. Send updated invoice via Stripe.

### "When should I use test mode vs live mode?"
Test mode = practice, fake money. Live mode = real transactions. Switch to live after testing everything.

---

**Questions? Email me at work@captainsolo.ca or DM @caaptainsolo on Instagram.**

**Now go book some clients and get those deposits! 💰🚀**

