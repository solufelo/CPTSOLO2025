import { useState } from "react";

/**
 * PaymentButton Component
 * Stripe Payment Link integration for accepting deposits/full payments
 * No complex backend needed - uses Stripe's hosted checkout
 * 
 * SETUP REQUIRED: See BOOKING-STRIPE-SETUP-GUIDE.md
 */

const PaymentButton = ({ 
  packageName = "General Project",
  amount = 500, // Default deposit amount
  type = "deposit", // "deposit" or "full"
  disabled = false,
  className = ""
}) => {
  const [loading, setLoading] = useState(false);

  // TODO: Replace with your actual Stripe Payment Links after setup
  // Create these at: dashboard.stripe.com/payment-links
  const paymentLinks = {
    // Deposit payments (50% down)
    deposit_landing: "https://buy.stripe.com/test_YOUR_LINK_1", // $200-300
    deposit_business: "https://buy.stripe.com/test_YOUR_LINK_2", // $400-750
    deposit_video: "https://buy.stripe.com/test_YOUR_LINK_3", // $250-450
    deposit_combo: "https://buy.stripe.com/test_YOUR_LINK_4", // $750-1,250
    deposit_webapp: "https://buy.stripe.com/test_YOUR_LINK_5", // $1,250-2,500
    deposit_music: "https://buy.stripe.com/test_YOUR_LINK_6", // $300-600
    
    // Full payments (less common, but available)
    full_custom: "https://buy.stripe.com/test_YOUR_LINK_CUSTOM",
  };

  // Determine which payment link to use
  const getPaymentLink = () => {
    const packageKey = packageName.toLowerCase().replace(/\s+/g, "_");
    const linkKey = `${type}_${packageKey}`;
    
    // If specific link exists, use it; otherwise use custom
    return paymentLinks[linkKey] || paymentLinks.full_custom;
  };

  const handlePayment = () => {
    setLoading(true);
    
    // Open Stripe hosted checkout in same window
    const paymentLink = getPaymentLink();
    
    // Check if Stripe is configured
    if (paymentLink.includes("test_YOUR_LINK")) {
      alert("💡 Stripe not configured yet!\n\nSee BOOKING-STRIPE-SETUP-GUIDE.md to set up payment links.\n\nFor now, clients can book consultations and you'll send invoices manually.");
      setLoading(false);
      return;
    }
    
    window.location.href = paymentLink;
  };

  return (
    <button
      onClick={handlePayment}
      disabled={disabled || loading}
      className={`
        ${className}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}
        transition-all duration-200
      `}
    >
      {loading ? "Processing..." : type === "deposit" ? `Pay ${amount}% Deposit` : "Pay Full Amount"}
    </button>
  );
};

export default PaymentButton;

