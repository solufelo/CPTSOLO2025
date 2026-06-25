import Marquee from "../components/Marquee";
import { useTheme } from "../context/ThemeContext";

/**
 * Pre-contact CTA — short, same voice as About
 */
const ContactSummary = () => {
  const { theme } = useTheme();

  const items = ["Ship", "Build", "Edit", "Deploy", "Brampton"];

  const items2 = [
    "work@captainsolo.ca",
    "work@captainsolo.ca",
    "work@captainsolo.ca",
    "work@captainsolo.ca",
    "work@captainsolo.ca",
  ];

  const getTopMarqueeClass = () => {
    switch (theme) {
      case 'glass': return 'text-white bg-transparent';
      case 'light': return 'text-gray-900 bg-transparent';
      default: return 'text-white bg-black';
    }
  };

  const getBottomMarqueeClass = () => {
    switch (theme) {
      case 'glass': return 'text-white bg-transparent border-y-2 border-white/20';
      case 'light': return 'text-gray-900 bg-transparent border-y-2 border-gray-300';
      default: return 'text-black bg-transparent border-y-2 border-gold';
    }
  };

  const getBottomIconClass = () => {
    switch (theme) {
      case 'glass': return 'text-cyan-400 stroke-cyan-400 stroke-2';
      case 'light': return 'text-blue-600 stroke-blue-600 stroke-2';
      default: return 'text-primary stroke-gold stroke-2';
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-8 py-20 mt-16">
      <Marquee items={items} className={getTopMarqueeClass()} />

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
