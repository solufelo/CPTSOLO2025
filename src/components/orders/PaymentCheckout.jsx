/**
 * Payment Checkout Component
 * Stripe payment integration for order checkout
 */

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../../context/AuthContext';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const PaymentCheckout = ({ amount, serviceType, packageType, orderData, onCreateOrder, onPaymentSuccess, loading: parentLoading }) => {
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    if (!stripePromise) {
      setError('Stripe not configured. Please set VITE_STRIPE_PUBLISHABLE_KEY');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Create order in database before checkout (so webhook can update it)
      let orderId = null;
      if (onCreateOrder) {
        try {
          orderId = await onCreateOrder();
        } catch (err) {
          console.error('Error creating order:', err);
          setError('Failed to create order. Please try again.');
          setProcessing(false);
          return;
        }
      }

      // Use orderData prop if provided, otherwise create minimal data
      const checkoutOrderData = orderData || {
        voiceTagText: serviceType === 'voice-tag' ? 'Voice tag order' : '',
      };

      // Create checkout session via cPanel backend
      const response = await fetch('/api/order/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          serviceType: serviceType,
          packageType: packageType,
          userId: user.id,
          orderId: orderId, // Pass order ID so webhook can update it
          orderData: checkoutOrderData,
        }),
      });

      // Get response text first to handle both JSON and non-JSON responses
      const responseText = await response.text();
      let responseData;

      // Handle empty response
      if (!responseText || responseText.trim() === '') {
        console.error('Empty response from server');
        throw new Error(`Server returned empty response. Status: ${response.status} ${response.statusText}`);
      }

      try {
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response:', responseText);
        console.error('Parse error:', parseError);
        throw new Error(`Server error: ${response.status} ${response.statusText}. Response: ${responseText.substring(0, 200)}`);
      }

      if (!response.ok) {
        const errorMessage = responseData.error || responseData.message || `Failed to create checkout session: ${response.status} ${response.statusText}`;
        console.error('Checkout session creation failed:', responseData);
        throw new Error(errorMessage);
      }

      if (!responseData.sessionId && !responseData.url) {
        throw new Error('Invalid response from server: missing sessionId and url');
      }

      const { sessionId, url } = responseData;

      // Redirect to Stripe Checkout
      if (url) {
        // Direct URL redirect (simpler)
        window.location.href = url;
      } else if (sessionId) {
        // Use Stripe.js redirect (alternative)
        const stripe = await stripePromise;
        const { error: stripeError } = await stripe.redirectToCheckout({
          sessionId,
        });

        if (stripeError) {
          throw stripeError;
        }
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message || 'Failed to process payment');
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-primary/5 border border-SageGray/30 rounded-lg p-6">
        <h3 className="font-amiamie-round text-xl font-bold text-primary mb-4">
          Payment Summary
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-SageGray">Amount:</span>
            <span className="text-primary font-bold">${amount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-SageGray">Currency:</span>
            <span className="text-primary">USD</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-400 rounded p-3 text-sm">
          {error}
        </div>
      )}


      <button
        onClick={handleCheckout}
        disabled={processing || parentLoading || !stripePromise}
        className="w-full bg-gold text-DarkLava font-amiamie-round font-bold py-3 rounded-lg
                 hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? 'Processing...' : `Pay $${amount}`}
      </button>

      {/* Alternative: Manual payment option */}
      <div className="text-center">
        <p className="text-sm text-SageGray mb-2">Or</p>
        <button
          onClick={() => {
            // Create order with "pending" status
            // User will pay manually
            if (onPaymentSuccess) {
              onPaymentSuccess('manual', 'manual');
            }
          }}
          className="text-sm text-gold hover:underline"
        >
          Pay manually (Contact to arrange)
        </button>
      </div>
    </div>
  );
};

export default PaymentCheckout;

