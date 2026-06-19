import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useTheme } from "../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

const ServiceSummary = () => {
  const { theme } = useTheme();

  const getTextColor = () => {
    switch(theme) {
      case 'glass': return 'text-white';
      case 'light': return 'text-gray-900';
      default: return 'text-white';
    }
  };

  const getAccentColor = () => {
    switch(theme) {
      case 'glass': return 'bg-cyan-400';
      case 'light': return 'bg-blue-600';
      default: return 'bg-gold';
    }
  };

  useGSAP(() => {
    gsap.to("#title-service-1", {
      xPercent: 20,
      scrollTrigger: {
        target: "#title-service-1",
        scrub: true,
      },
    });
    gsap.to("#title-service-2", {
      xPercent: -30,
      scrollTrigger: {
        target: "#title-service-2",
        scrub: true,
      },
    });
    gsap.to("#title-service-3", {
      xPercent: 100,
      scrollTrigger: {
        target: "#title-service-3",
        scrub: true,
      },
    });
    gsap.to("#title-service-4", {
      xPercent: -100,
      scrollTrigger: {
        target: "#title-service-4",
        scrub: true,
      },
    });
  });
  return (
    <section className={`mt-20 overflow-hidden font-light leading-snug text-center mb-42 contact-text-responsive ${getTextColor()}`}>
      {/* Line 1: Web Development */}
      <div id="title-service-1">
        <p>Web Development</p>
      </div>
      
      {/* Line 2: Frontend & Backend */}
      <div
        id="title-service-2"
        className="flex items-center justify-center gap-3 translate-x-16"
      >
        <p className="font-normal">React</p>
        <div className={`w-10 h-1 md:w-32 ${getAccentColor()}`} />
        <p>Node.js</p>
      </div>
      
      {/* Line 3: Full service stack */}
      <div
        id="title-service-3"
        className="flex items-center justify-center gap-3 -translate-x-48"
      >
        <p>APIs</p>
        <div className={`w-10 h-1 md:w-32 ${getAccentColor()}`} />
        <p className="italic">Databases</p>
        <div className={`w-10 h-1 md:w-32 ${getAccentColor()}`} />
        <p>Deployment</p>
      </div>
      
      {/* Line 4: Video Production */}
      <div id="title-service-4" className="translate-x-48">
        <p>Video Production</p>
      </div>
    </section>
  );
};

export default ServiceSummary;