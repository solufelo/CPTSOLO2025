# Stripe Payment Integration Setup Guide

## 🎯 Overview

This guide walks you through setting up Stripe payments for the voice tag order system.

---

## 📦 Prerequisites

1. **Stripe Account**
   - Sign up at https://stripe.com
   - Complete account verification
   - Get API keys from Dashboard

2. **Backend API** (Required for production)
   - Netlify Functions (recommended for Netlify hosting)
   - Or separate Node.js backend

---

## 🚀 Setup Steps

### Step 1: Get Stripe API Keys

1. Go to Stripe Dashboard: https://dashboard.stripe.com
2. Navigate to **Developers → API keys**
3. Copy:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`)

### Step 2: Add Environment Variables

Create `.env.local` file (add to `.gitignore`):

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

### Step 3: Create Netlify Function for Checkout

Create `netlify/functions/create-checkout-session.js`:

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { amount, currency = 'usd', serviceType, packageType, userId } = JSON.parse(event.body);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: `${serviceType} - ${packageType}`,
              description: `Voice tag order for ${userId}`,
            },
            unit_amount: amount, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.URL || 'http://localhost:8888'}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL || 'http://localhost:8888'}/order/cancel`,
      metadata: {
        userId,
        serviceType,
        packageType,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
```

### Step 4: Install Stripe Server SDK

```bash
npm install stripe
```

### Step 5: Update PaymentCheckout Component

The `PaymentCheckout` component is already set up to call `/api/create-checkout-session`. 
Netlify Functions are automatically available at `/api/*` routes.

### Step 6: Set Up Webhook (For Order Status Updates)

Create `netlify/functions/stripe-webhook.js`:

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, webhookSecret);
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Webhook Error: ${err.message}` }),
    };
  }

  // Handle the event
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    
    // Update order status in database
    // const { userId, serviceType, packageType } = session.metadata;
    // Update Supabase order status to 'paid'
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};
```

---

## 🧪 Testing

### Test Mode

1. Use test API keys (`pk_test_*`, `sk_test_*`)
2. Use test card numbers:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
3. Use any future expiry date and any 3-digit CVC

### Test the Flow

1. Create order → Redirects to Stripe Checkout
2. Complete payment with test card
3. Redirected back to success page
4. Order status updated to 'paid'

---

## 🔒 Security Best Practices

1. **Never expose secret key** in frontend code
2. **Use webhooks** to verify payments server-side
3. **Validate webhook signatures** to prevent fraud
4. **Store payment intent IDs** in database for reference
5. **Use HTTPS** for all payment flows

---

## 📊 Order Flow

```
User → Order Form → Payment Checkout → Stripe → 
Webhook → Update Order Status → User Dashboard
```

---

## 🎯 Next Steps

1. Set up Stripe account
2. Add environment variables
3. Create Netlify functions
4. Test with test cards
5. Switch to live keys for production

---

## 📚 Resources

- [Stripe Docs](https://stripe.com/docs)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)

---

## 💡 Alternative: Manual Payment

For now, the form includes a "Pay manually" option that creates an order with `status: 'pending'`. 
You can contact customers to arrange payment separately.

---

## 🚨 Important Notes

- **Backend required**: Stripe checkout sessions must be created server-side
- **Webhooks recommended**: Use webhooks to update order status automatically
- **Test first**: Always test in test mode before going live
- **Monitor logs**: Check Stripe Dashboard for payment logs and errors

