import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLine";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTheme } from "../context/ThemeContext";

/**
 * About Section Component
 * Solomon's story - Where code meets creativity
 * Features scroll-triggered animations and clip-path image reveal
 */
const About = () => {
  const { theme } = useTheme();
  
  // Header text - the mission statement
  const text = `Code meets creativity. Database to deployment, with cinematic content to bring it all to life.`;

  // Main about text - Solomon's authentic story (concise version)
  const aboutText = `Captain Solo—full-stack developer by trade, videographer by passion.
  6 years experience. 100+ video projects. 4.8★ rating.

  The difference? I don't just build your website—I shoot the content to fill it.
  Restaurant site? Code the menu AND photograph the dishes.
  Artist portfolio? Build the platform AND film the music video.

  That's the Captain Solo advantage: complete digital solutions, one point of contact.

  Based in Brampton, serving the GTA. Remote web dev, will travel for video shoots.`;

  // Ref for image animation
  const imgRef = useRef(null);

  // Theme-aware section background
  const getSectionBg = () => {
    switch(theme) {
      case 'glass':
        return 'bg-[rgba(10,15,25,0.98)]';
      case 'light':
        return 'bg-[#f5f5f5]'; // Slightly off-white for contrast with pure white sections
      default:
        return 'bg-black';
    }
  };

  // Theme-aware text color
  const getTextColor = () => {
    switch(theme) {
      case 'glass':
        return 'text-white/70';
      case 'light':
        return 'text-gray-700'; // Dark text for light background
      default:
        return 'text-white/60';
    }
  };

  // Theme-aware header text color
  const getHeaderTextColor = () => {
    switch(theme) {
      case 'glass':
        return 'text-white';
      case 'light':
        return 'text-gray-900'; // Dark header for light background
      default:
        return 'text-white';
    }
  };

  // GSAP scroll animations
  useGSAP(() => {
    // Scale down about section slightly on scroll for depth effect
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    // Clip-path reveal animation for profile image
    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });

  return (
    <section id="about" className={`min-h-screen rounded-b-4xl ${getSectionBg()}`}>
      {/* Animated header */}
      <AnimatedHeaderSection
        subTitle={"Code with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={getHeaderTextColor()}
        withScrollTrigger={true}
      />
      
      {/* Content: Image + About text */}
      <div className={`flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl ${getTextColor()}`}>
        {/* Profile image with clip-path reveal animation */}
        <img
          ref={imgRef}
          src="android-chrome-512x512.png"
          alt="Solomon Olufelo - Captain Solo"
          className={`w-md rounded-3xl ${
            theme === 'glass' ? 'ring-2 ring-cyan-400/30' : theme === 'light' ? 'shadow-2xl' : ''
          }`}
        />
        
        {/* Animated about text */}
        <AnimatedTextLines text={aboutText} className={"w-full"} />
      </div>
    </section>
  );
};

export default About;