import Marquee from "../components/Marquee";
import { useTheme } from "../context/ThemeContext";

/**
 * ContactSummary Section Component
 * Call-to-action section before Contact with Captain Solo brand values
 * Features dual marquees (no pin animation - keeps it simple and bug-free)
 */
const ContactSummary = () => {
  const { theme } = useTheme();

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

  // Theme-aware styles
  const getTopMarqueeClass = () => {
    switch(theme) {
      case 'glass': return 'text-white bg-transparent';
      case 'light': return 'text-gray-900 bg-transparent';
      default: return 'text-white bg-black'; // Default dark theme style might be different in Marquee component default, but here we can override or let it fall back
    }
  };

  const getBottomMarqueeClass = () => {
    switch(theme) {
      case 'glass': return 'text-white bg-transparent border-y-2 border-white/20';
      case 'light': return 'text-gray-900 bg-transparent border-y-2 border-gray-300';
      default: return 'text-black bg-transparent border-y-2 border-gold';
    }
  };

  const getBottomIconClass = () => {
    switch(theme) {
      case 'glass': return 'text-cyan-400 stroke-cyan-400 stroke-2';
      case 'light': return 'text-blue-600 stroke-blue-600 stroke-2';
      default: return 'text-primary stroke-gold stroke-2';
    }
  };

  const getCenterTextClass = () => {
    switch(theme) {
      case 'glass': return 'text-white/90';
      case 'light': return 'text-gray-800';
      default: return 'text-primary'; // Usually white/gold in dark mode
    }
  };

  const getHighlightTextClass = () => {
    switch(theme) {
      case 'glass': return 'text-cyan-400';
      case 'light': return 'text-blue-600';
      default: return 'text-gold';
    }
  };

  return (
    <section className="flex flex-col items-center justify-between min-h-screen gap-12 mt-16">
      {/* Top marquee - Brand values */}
      <Marquee items={items} className={getTopMarqueeClass()} />
      
      {/* Center CTA text - Solomon's unique value proposition */}
      <div className={`overflow-hidden font-light text-center contact-text-responsive ${getCenterTextClass()}`}>
        <p>
          " I don't just build your <br />
          <span className="font-normal">website</span> —{" "}
          <span className="italic">I shoot</span> <br />
          the content to <span className={getHighlightTextClass()}>fill it</span> "
        </p>
      </div>
      
      {/* Bottom marquee - CTA repeated */}
      <Marquee
        items={items2}
        reverse={true}
        className={getBottomMarqueeClass()}
        iconClassName={getBottomIconClass()}
        icon="material-symbols-light:square"
      />
    </section>
  );
};

export default ContactSummary;