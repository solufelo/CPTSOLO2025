import Marquee from "../components/Marquee";

/**
 * ContactSummary Section Component
 * Call-to-action section before Contact with Captain Solo brand values
 * Features dual marquees (no pin animation - keeps it simple and bug-free)
 */
const ContactSummary = () => {
  // Top marquee - Captain Solo brand values
  const items = [
    "Code",
    "Creativity",
    "Results",
    "Innovation",
    "Excellence",
  ];
  
  // Bottom marquee - CTA messaging
  const items2 = [
    "Let's create something legendary",
    "Let's create something legendary",
    "Let's create something legendary",
    "Let's create something legendary",
    "Let's create something legendary",
  ];

  return (
    <section className="flex flex-col items-center justify-between min-h-screen gap-12 mt-16">
      {/* Top marquee - Brand values */}
      <Marquee items={items} />
      
      {/* Center CTA text - Solomon's unique value proposition */}
      <div className="overflow-hidden font-light text-center contact-text-responsive">
        <p>
          " I don't just build your <br />
          <span className="font-normal">website</span> —{" "}
          <span className="italic">I shoot</span> <br />
          the content to <span className="text-gold">fill it</span> "
        </p>
      </div>
      
      {/* Bottom marquee - CTA repeated */}
      <Marquee
        items={items2}
        reverse={true}
        className="text-black bg-transparent border-y-2"
        iconClassName="stroke-gold stroke-2 text-primary"
        icon="material-symbols-light:square"
      />
    </section>
  );
};

export default ContactSummary;