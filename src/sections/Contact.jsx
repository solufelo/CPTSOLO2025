import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import ContactForm from "../components/ContactForm";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";
import { useTheme } from "../context/ThemeContext";

/**
 * Contact Section Component
 * Solomon's contact information, working contact form, and call-to-action
 * Features GSAP staggered animations and EmailJS integration
 */
const Contact = () => {
  const { theme } = useTheme();
  
  // Header text - CTA for potential clients
  const text = `Got a project idea? Need a website AND the content to fill it?
    Let's build something unforgettable together.`;
  
  // Marquee items - Captain Solo brand messages
  const items = [
    "Code it. Film it. Ship it.",
    "Where creativity meets execution.",
    "Full-Stack Development + Video Production.",
    "Code it. Film it. Ship it.",
    "Where creativity meets execution.",
  ];

  // Theme-aware section background
  const getSectionBg = () => {
    switch(theme) {
      case 'glass':
        return 'bg-[rgba(12,18,30,0.98)]';
      case 'light':
        return 'bg-white';
      default:
        return 'bg-black';
    }
  };

  // Theme-aware text colors
  const getTextColor = () => {
    switch(theme) {
      case 'glass':
        return 'text-white';
      case 'light':
        return 'text-gray-900';
      default:
        return 'text-white';
    }
  };

  // Theme-aware accent color
  const getAccentColor = () => {
    switch(theme) {
      case 'glass':
        return 'text-cyan-400 hover:text-cyan-300';
      case 'light':
        return 'text-blue-600 hover:text-blue-500';
      default:
        return 'text-gold hover:text-gold/80';
    }
  };

  // Theme-aware button styling
  const getButtonStyle = () => {
    switch(theme) {
      case 'glass':
        return 'bg-cyan-500 text-white hover:bg-cyan-400 shadow-cyan-500/30';
      case 'light':
        return 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/30';
      default:
        return 'bg-gold text-DarkLava hover:bg-gold/90 shadow-gold/50';
    }
  };

  // Theme-aware divider
  const getDividerColor = () => {
    switch(theme) {
      case 'glass':
        return 'bg-white/20';
      case 'light':
        return 'bg-gray-300';
      default:
        return 'bg-white/20';
    }
  };

  // Theme-aware muted text
  const getMutedColor = () => {
    switch(theme) {
      case 'glass':
        return 'text-white/60';
      case 'light':
        return 'text-gray-700';
      default:
        return 'text-white/70';
    }
  };

  // GSAP staggered animations for contact links
  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);

  return (
    <section
      id="contact"
      className={`flex flex-col justify-between min-h-screen pb-0 overflow-hidden ${getSectionBg()}`}
    >
      <div className="flex-grow">
        {/* Animated header */}
        <AnimatedHeaderSection
          subTitle={"Let's Create Something Legendary"}
          title={"Contact"}
          text={text}
          textColor={getTextColor()}
          withScrollTrigger={true}
        />
        
        {/* Contact Form */}
        <div className="px-10 mb-20">
          <ContactForm />
        </div>

        {/* Divider */}
        <div className={`w-full h-px mb-20 ${getDividerColor()}`} />
        
        {/* Contact information */}
        <div className={`flex px-10 font-light uppercase lg:text-[32px] text-[26px] leading-none mb-20 ${getTextColor()}`}>
          <div className="flex flex-col w-full gap-10">
            {/* Email */}
            <div className="social-link">
              <h2 className={theme === 'light' ? 'text-gray-800' : ''}>E-mail</h2>
              <div className={`w-full h-px my-2 ${getDividerColor()}`} />
              <a 
                href="mailto:work@captainsolo.ca"
                className={`text-xl tracking-wider lowercase md:text-2xl lg:text-3xl transition-colors duration-200 ${
                  theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'hover:text-white/80'
                }`}
              >
                work@captainsolo.ca
              </a>
            </div>
            
            {/* Location */}
            <div className="social-link">
              <h2 className={theme === 'light' ? 'text-gray-800' : ''}>Location</h2>
              <div className={`w-full h-px my-2 ${getDividerColor()}`} />
              <p className={`text-xl tracking-wider md:text-2xl lg:text-3xl ${
                theme === 'light' ? 'text-gray-600' : ''
              }`}>
                Brampton, ON • Serving GTA
              </p>
            </div>
            
            {/* Social Media */}
            <div className="social-link">
              <h2 className={theme === 'light' ? 'text-gray-800' : ''}>Social Media</h2>
              <div className={`w-full h-px my-2 ${getDividerColor()}`} />
              <div className="flex flex-wrap gap-2">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs leading-loose tracking-wides uppercase md:text-sm transition-colors duration-200 ${
                      theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'hover:text-white/80'
                    }`}
                  >
                    {"{ "}
                    {social.name}
                    {" }"}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Get Started CTA */}
        <div className="px-10 mb-20">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className={`font-amiamie-round text-3xl md:text-4xl lg:text-5xl font-black mb-4 ${getTextColor()}`}>
              Ready to Get Started?
            </h2>
            <p className={`text-lg md:text-xl mb-8 max-w-2xl ${getMutedColor()}`}>
              Create an account to place orders, track your projects, and communicate directly with us.
            </p>
            <Link
              to="/signup"
              className={`inline-block font-amiamie-round font-bold text-xl md:text-2xl px-8 md:px-12 py-4 md:py-5 rounded-lg
                       transition-all duration-300 hover:scale-105 shadow-lg ${getButtonStyle()}`}
            >
              Get Started
            </Link>
            <p className={`text-sm mt-4 ${getMutedColor()}`}>
              Already have an account?{' '}
              <Link to="/login" className={`hover:underline font-medium ${getAccentColor()}`}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom marquee with brand messages - Fixed to bottom */}
      <div className="mt-auto">
        <Marquee items={items} className={`bg-transparent ${getTextColor()}`} />
      </div>
    </section>
  );
};

export default Contact;
