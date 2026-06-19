/**
 * Netlify Function: Stripe Webhook Handler
 * Handles Stripe webhook events (payment success, subscription updates, etc.)
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase admin client (uses service role key for admin access)
const supabase = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  : null;

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let stripeEvent;

  try {
    // Verify webhook signature
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Webhook Error: ${err.message}` }),
    };
  }

  try {
    // Handle different event types
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(stripeEvent.data.object);
        break;

      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(stripeEvent.data.object);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(stripeEvent.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('Webhook handler error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

/**
 * Handle checkout session completed
 * Update order status to 'paid' when payment is successful
 */
async function handleCheckoutCompleted(session) {
  const { metadata } = session;
  
  if (!metadata || !metadata.userId) {
    console.log('No user ID in session metadata');
    return;
  }

  console.log('Checkout completed:', {
    userId: metadata.userId,
    serviceType: metadata.serviceType,
    packageType: metadata.packageType,
    sessionId: session.id,
    paymentIntent: session.payment_intent,
  });

  // Update order status in Supabase
  if (supabase) {
    try {
      let orderToUpdate = null;

      // Try to find order by orderId first (if order was created before checkout)
      if (metadata.orderId) {
        const { data: orderById } = await supabase
          .from('orders')
          .select('id')
          .eq('id', metadata.orderId)
          .single();
        
        if (orderById) {
          orderToUpdate = orderById;
        }
      }

      // If not found by orderId, try to find by session ID
      if (!orderToUpdate) {
        const { data: orderBySession } = await supabase
          .from('orders')
          .select('id')
          .eq('stripe_checkout_session_id', session.id)
          .single();
        
        if (orderBySession) {
          orderToUpdate = orderBySession;
        }
      }

      // If still not found, try to find by user and pending status
      if (!orderToUpdate) {
        const { data: pendingOrder } = await supabase
          .from('orders')
          .select('id')
          .eq('user_id', metadata.userId)
          .eq('status', 'pending')
          .eq('service_type', metadata.serviceType)
          .eq('package_type', metadata.packageType)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        
        if (pendingOrder) {
          orderToUpdate = pendingOrder;
        }
      }

      if (orderToUpdate) {
        // Update existing order
        const { error: updateError } = await supabase
          .from('orders')
          .update({ 
            status: 'paid',
            stripe_checkout_session_id: session.id,
            stripe_payment_intent_id: session.payment_intent,
            updated_at: new Date().toISOString(),
          })
          .eq('id', orderToUpdate.id);
        
        if (updateError) {
          console.error('Error updating order:', updateError);
        } else {
          console.log('Order updated to paid:', orderToUpdate.id);
        }
      } else {
        // Create new order from session metadata (fallback)
        const orderData = metadata.orderData ? JSON.parse(metadata.orderData) : {};
        
        const { data: newOrder, error: createError } = await supabase
          .from('orders')
          .insert([{
            user_id: metadata.userId,
            service_type: metadata.serviceType,
            package_type: metadata.packageType,
            price: session.amount_total / 100, // Convert from cents
            status: 'paid',
            stripe_checkout_session_id: session.id,
            stripe_payment_intent_id: session.payment_intent,
            requirements: orderData,
          }])
          .select()
          .single();

        if (createError) {
          console.error('Error creating order:', createError);
        } else {
          console.log('Order created from webhook:', newOrder.id);
        }
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  } else {
    console.warn('Supabase not configured. Order status not updated.');
  }
}

/**
 * Handle payment succeeded
 */
async function handlePaymentSucceeded(paymentIntent) {
  console.log('Payment succeeded:', paymentIntent.id);
  // Additional logic if needed
}

/**
 * Handle payment failed
 */
async function handlePaymentFailed(paymentIntent) {
  console.log('Payment failed:', paymentIntent.id);
  // Update order status to 'failed' if needed
}

