/**
 * Order Success Page
 * Shown after successful Stripe payment
 */

import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import LogoHeader from '../components/LogoHeader';
import Navbar from '../sections/Navbar';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sessionId) {
      // Verify payment and update order status
      verifyPayment(sessionId);
    } else {
      setError('No session ID provided');
      setLoading(false);
    }
  }, [sessionId]);

  const verifyPayment = async (sessionId) => {
    try {
      // The webhook should handle this, but we can also verify here
      // For now, just redirect to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (err) {
      console.error('Payment verification error:', err);
      setError('Failed to verify payment. Please check your dashboard.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LogoHeader />
      <Navbar />
      
      <div className="min-h-screen bg-DarkLava py-20 px-4 sm:px-8 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          {loading ? (
            <div>
              <div className="text-6xl mb-6">⏳</div>
              <h1 className="font-amiamie-round text-4xl font-black text-primary mb-4">
                Verifying Payment...
              </h1>
              <p className="text-SageGray">Please wait while we confirm your payment.</p>
            </div>
          ) : error ? (
            <div>
              <div className="text-6xl mb-6">❌</div>
              <h1 className="font-amiamie-round text-4xl font-black text-primary mb-4">
                Payment Verification Failed
              </h1>
              <p className="text-SageGray mb-6">{error}</p>
              <Link
                to="/dashboard"
                className="inline-block bg-gold text-DarkLava font-amiamie-round font-bold py-3 px-6 rounded-lg
                         hover:bg-gold/90 transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <div>
              <div className="text-6xl mb-6">✅</div>
              <h1 className="font-amiamie-round text-4xl font-black text-gold mb-4">
                Payment Successful!
              </h1>
              <p className="text-primary/80 mb-6">
                Your order has been received and payment processed successfully.
              </p>
              <p className="text-sm text-SageGray mb-8">
                Redirecting to dashboard...
              </p>
              <Link
                to="/dashboard"
                className="inline-block bg-gold text-DarkLava font-amiamie-round font-bold py-3 px-6 rounded-lg
                         hover:bg-gold/90 transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;

