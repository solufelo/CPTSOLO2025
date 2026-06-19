import { useState } from "react";
import { InlineWidget, PopupButton } from "react-calendly";

/**
 * BookingWidget Component
 * Integrates Calendly for client consultation booking
 * Shows your availability and makes scheduling intuitive
 * 
 * SETUP REQUIRED: See BOOKING-STRIPE-SETUP-GUIDE.md
 */

const BookingWidget = ({ inline = false, selectedPackage = null }) => {
  const [isOpen, setIsOpen] = useState(false);

  // TODO: Replace with your Calendly URL after setup
  // Get this from: calendly.com/event_types/user/me
  const calendlyUrl = "https://calendly.com/your-username/30min"; // ← Replace this!

  // Pre-fill form data based on selected package
  const prefillData = selectedPackage
    ? {
        name: "",
        email: "",
        customAnswers: {
          a1: selectedPackage, // Pass which package they selected
        },
      }
    : {};

  // UTM parameters for tracking where bookings come from
  const utmParams = {
    utmCampaign: "portfolio-website",
    utmSource: "captainsolo-portfolio",
    utmMedium: "website",
  };

  if (inline) {
    // Inline widget - shows full calendar on page
    return (
      <div className="booking-widget-inline">
        <InlineWidget
          url={calendlyUrl}
          prefill={prefillData}
          utm={utmParams}
          styles={{
            height: "700px",
            width: "100%",
          }}
        />
      </div>
    );
  }

  // Popup button - opens modal overlay
  return (
    <PopupButton
      url={calendlyUrl}
      prefill={prefillData}
      utm={utmParams}
      rootElement={document.getElementById("root")}
      text="Schedule Free Consultation"
      className="inline-block bg-gold text-black px-8 py-3 rounded-lg font-medium 
                hover:bg-gold-dark transition-all duration-200 hover:scale-[1.02]"
    />
  );
};

export default BookingWidget;

