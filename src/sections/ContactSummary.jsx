import { useRef } from "react";
import Marquee from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * ContactSummary Section Component
 * Call-to-action section before Contact with Captain Solo brand values
 * Features pinned scroll animation and dual marquees
 */
const ContactSummary = () => {
  const containerRef = useRef(null);
  
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

  // GSAP scroll pin animation - section stays pinned while scrolling
  useGSAP(() => {
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        markers: false,
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center justify-between min-h-screen gap-12 mt-16"
    >
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