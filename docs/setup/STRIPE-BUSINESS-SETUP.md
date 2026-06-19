# Stripe Business Details Setup

## 📋 Customer-Facing Information

Add these details to your Stripe account for customer statements and receipts.

---

## 💳 Statement Descriptor

**What it is:** The text that appears on your customers' bank or credit card statements.

**Settings:**
- **Statement descriptor:** `CAPTAINSOLO` (or `CAPTAINSOLO.CA`)
- **Shortened descriptor:** `VOICE` (optional, max 10 characters, no spaces)
- **Length:** 5-22 characters (main descriptor)
- **Requirements:** Must be similar to your business name or URL

**How to set it up:**
1. Go to Stripe Dashboard → **Settings → Branding**
2. Scroll to **Statement descriptor**
3. Enter: `CAPTAINSOLO` or `CAPTAINSOLO.CA`
4. (Optional) Enter shortened descriptor: `VOICE` (max 10 chars, no spaces)
5. Click **Save**

**Note:** The code already includes this in the checkout session, but you should also set it in Stripe Dashboard for all payments.

---

## 📞 Customer Support Information

**Phone Number:** `+1 289 233 8317`  
**Country:** Canada  
**Show on receipts:** Yes

**How to set it up:**
1. Go to Stripe Dashboard → **Settings → Business information**
2. Enter **Customer support phone number:** `+1 289 233 8317`
3. Select **Country:** Canada
4. Check **Show phone number on receipts and invoices**
5. Click **Save**

---

## 🌐 Business Information

**Business Name:** Captain Solo  
**Website:** https://captainsolo.ca  
**Email:** work@captainsolo.ca  
**Location:** Brampton, ON, Canada

**How to set it up:**
1. Go to Stripe Dashboard → **Settings → Business information**
2. Fill in:
   - Business name: `Captain Solo`
   - Website: `https://captainsolo.ca`
   - Support email: `work@captainsolo.ca`
   - Business address: Your address in Brampton, ON
3. Click **Save**

---

## ✅ What This Does

### For Customers:
- **Bank statements** will show: `CAPTAINSOLO` (or `CAPTAINSOLO VOICE` with suffix)
- **Receipts** will include your phone number: `+1 289 233 8317`
- **Invoices** will have your business information
- **Support contact** is clearly visible
- **Billing address** collected for invoices

### Benefits:
- ✅ Reduces chargebacks (customers recognize the charge)
- ✅ Professional appearance
- ✅ Easy customer support contact
- ✅ Compliance with payment regulations

---

## 🔧 Code Implementation

The checkout session already includes:
- Statement descriptor: `CAPTAINSOLO`
- Phone number collection: Enabled
- Invoice creation: Enabled

**No code changes needed** - just set up the business information in Stripe Dashboard!

---

## 📋 Checklist

- [ ] Statement descriptor set in Stripe Dashboard
- [ ] Shortened descriptor set (optional)
- [ ] Customer support phone number added
- [ ] Country set to Canada
- [ ] Phone number enabled on receipts
- [ ] Business information completed
- [ ] Test payment to verify statement descriptor

---

## 🧪 Testing

After setting up:
1. Make a test payment
2. Check the receipt/email
3. Verify statement descriptor on test card statement
4. Confirm phone number appears on receipt

---

**Once set up, all customer payments will show professional business information!** ✅

