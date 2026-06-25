import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTheme } from "../context/ThemeContext";

/**
 * About Section — Solomon's story (plain language, facts from profile.yml)
 */
const About = () => {
  const { theme } = useTheme();

  const text = `Brampton-based. I build, ship, and host my own work.`;

  const lead = `Solomon Olufelo. Captain Solo.`;

  const paragraphs = [
    `I build and ship from Brampton — client sites, this portfolio, the deploy scripts behind it. captainsolo.ca runs on my own stack, and I own every build.`,
    `My focus right now is findYOU, a productivity OS I'm shaping in the open. Light Years — a C++20 engine — keeps the systems side sharp.`,
    `Before code paid the bills, video and audio did. Years of it. 1,400+ delivered.`,
  ];

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
        subTitle={"Brampton · Captain Solo"}
        title={"About"}
        text={text}
        textColor={getHeaderTextColor()}
        withScrollTrigger={true}
      />
      
      {/* Content: Portrait + bio */}
      <div className="flex flex-col items-start justify-center gap-12 px-6 pb-20 md:px-10 lg:flex-row lg:gap-16 lg:items-center max-w-6xl mx-auto">
        {/* Portrait with clip-path reveal */}
        <div className="w-full max-w-sm shrink-0 mx-auto lg:mx-0">
          <img
            ref={imgRef}
            src="/images/solomon-portrait.png"
            alt="Solomon Olufelo — Captain Solo"
            className={`w-full rounded-sm object-cover aspect-[4/5] ${
              theme === 'glass' ? 'ring-1 ring-cyan-400/20' : theme === 'light' ? 'shadow-2xl' : 'ring-1 ring-white/10'
            }`}
          />
        </div>

        {/* Bio */}
        <div className={`w-full max-w-xl ${getTextColor()}`}>
          <p className={`font-display font-bold uppercase tracking-wide text-2xl md:text-3xl lg:text-4xl mb-8 ${getHeaderTextColor()}`}>
            {lead}
          </p>

          <div className="space-y-5 font-body text-base md:text-lg leading-relaxed">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className={`mt-10 pt-6 border-t flex flex-wrap items-center gap-x-8 gap-y-2 text-sm font-display uppercase tracking-widest ${
            theme === 'light' ? 'border-gray-300' : 'border-white/15'
          }`}>
            <span>Still building</span>
            <a
              href="mailto:work@captainsolo.ca"
              className={`transition-colors ${theme === 'light' ? 'hover:text-blue-600' : 'hover:text-gold'}`}
            >
              work@captainsolo.ca
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;