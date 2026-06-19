/**
 * Order Cancel Page
 * Shown when user cancels Stripe checkout
 */

import { Link } from 'react-router-dom';
import LogoHeader from '../components/LogoHeader';
import Navbar from '../sections/Navbar';

const OrderCancel = () => {
  return (
    <>
      <LogoHeader />
      <Navbar />
      
      <div className="min-h-screen bg-DarkLava py-20 px-4 sm:px-8 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="font-amiamie-round text-4xl font-black text-primary mb-4">
            Payment Cancelled
          </h1>
          <p className="text-primary/80 mb-6">
            Your payment was cancelled. No charges were made.
          </p>
          <p className="text-sm text-SageGray mb-8">
            You can complete your order at any time from your dashboard.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/dashboard"
              className="inline-block bg-gold text-DarkLava font-amiamie-round font-bold py-3 px-6 rounded-lg
                       hover:bg-gold/90 transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/order/voice-tag"
              className="inline-block bg-primary/10 border border-SageGray/30 text-primary font-amiamie-round font-bold py-3 px-6 rounded-lg
                       hover:bg-primary/20 transition-colors"
            >
              Try Again
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCancel;

