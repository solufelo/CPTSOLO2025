/**
 * Netlify Function: Create Stripe Checkout Session
 * Creates a Stripe checkout session for voice tag orders
 */

// Initialize Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // Set CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request body
    let requestData;
    try {
      requestData = JSON.parse(event.body || '{}');
    } catch (parseError) {
      console.error('Failed to parse request body:', event.body);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' }),
      };
    }

    const {
      amount,
      serviceType,
      packageType,
      userId,
      orderId,
      orderData,
    } = requestData;

    // Validate Stripe key
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Payment processing is not configured. Please contact support.' 
        }),
      };
    }

    // Validate required fields
    if (!amount || !serviceType || !packageType || !userId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required fields: amount, serviceType, packageType, and userId are required',
          received: { amount, serviceType, packageType, userId }
        }),
      };
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${serviceType} - ${packageType}`,
              description: `Voice tag order: ${orderData?.voiceTagText || packageType}`,
            },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.URL || 'http://localhost:8888'}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL || 'http://localhost:8888'}/order/voice-tag?canceled=true`,
      metadata: {
        userId: userId,
        serviceType: serviceType,
        packageType: packageType,
        orderId: orderId || '', // Pass order ID if it exists
        orderData: JSON.stringify(orderData || {}),
      },
      customer_email: orderData?.email || undefined, // Pre-fill email if available
      allow_promotion_codes: true, // Allow discount codes
      
      // Business information for customer statements
      payment_intent_data: {
        statement_descriptor: 'CAPTAINSOLO', // Shows on bank statements (5-22 chars, max 22)
        statement_descriptor_suffix: 'VOICE', // Optional shortened descriptor (max 10 chars)
      },
      
      // Customer support information
      phone_number_collection: {
        enabled: true, // Collect phone number
      },
      
      // Invoice settings (for receipts)
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `${serviceType} - ${packageType} package`,
          metadata: {
            service_type: serviceType,
            package_type: packageType,
          },
        },
      },
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        sessionId: session.id,
        url: session.url,
      }),
    };
  } catch (error) {
    console.error('Stripe checkout error:', error);
    console.error('Error details:', {
      message: error.message,
      type: error.type,
      code: error.code,
      stack: error.stack,
    });
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message || 'Failed to create checkout session',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      }),
    };
  }
};

