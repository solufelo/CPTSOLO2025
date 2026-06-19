import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTheme } from "../context/ThemeContext";

/**
 * Works/Portfolio Section Component
 * Showcases Solomon's web development + video production projects
 * Features interactive hover previews on desktop with GSAP animations
 */
const Works = () => {
  const { theme } = useTheme();
  
  // Refs for GSAP animations
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);
  const containerRef = useRef(null);
  
  // Track which project is currently being hovered
  const [currentIndex, setCurrentIndex] = useState(null);
  
  // Header text introducing portfolio
  const text = `Real projects. Real results. Full-stack applications merging technical precision with creative vision.`;

  // Theme-aware styles
  const getTextColor = () => {
    switch(theme) {
      case 'glass': return 'text-white';
      case 'light': return 'text-gray-900';
      default: return 'text-black';
    }
  };

  const getOverlayBg = () => {
    switch(theme) {
      case 'glass': return 'bg-cyan-500/90';
      case 'light': return 'bg-blue-600';
      default: return 'bg-black';
    }
  };

  // Mouse position tracking
  const mouse = useRef({ x: 0, y: 0 });
  const xSet = useRef(null);
  const ySet = useRef(null);

  useGSAP(() => {
    // Optimized position setters
    xSet.current = gsap.quickSetter(previewRef.current, "x", "px");
    ySet.current = gsap.quickSetter(previewRef.current, "y", "px");

    // Entrance animation
    gsap.from("#project", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#project",
      },
    });
  }, []);

  // Robust cleanup effect
  useEffect(() => {
    const cleanup = () => {
      // Hide preview
      if (previewRef.current) {
        gsap.killTweensOf(previewRef.current);
        gsap.set(previewRef.current, { 
          opacity: 0, 
          scale: 0.8,
          display: 'none',
          visibility: 'hidden'
        });
      }
      
      // Reset all overlays
      overlayRefs.current.forEach(el => {
        if (el) {
          gsap.killTweensOf(el);
          gsap.set(el, { 
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            opacity: 0,
            visibility: 'hidden'
          });
        }
      });
      
      setCurrentIndex(null);
    };

    const handleScroll = () => {
      if (currentIndex !== null) cleanup();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("blur", cleanup);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("blur", cleanup);
      cleanup();
    };
  }, [currentIndex]);

  const handleMouseEnter = (index, e) => {
    if (window.innerWidth < 768) return;
    
    // Update mouse position immediately
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect && xSet.current && ySet.current) {
      const x = e.clientX;
      const y = e.clientY;
      xSet.current(x + 20);
      ySet.current(y + 20);
    }

    setCurrentIndex(index);

    // Animate overlay
    const el = overlayRefs.current[index];
    if (el) {
      gsap.killTweensOf(el);
      gsap.set(el, { 
        visibility: 'visible', 
        opacity: 1,
        display: 'block'
      });
      gsap.to(el, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.4,
        ease: "power2.out",
      });
    }

    // Animate preview
    if (previewRef.current) {
      gsap.killTweensOf(previewRef.current);
      gsap.set(previewRef.current, {
        display: 'block',
        visibility: 'visible',
        zIndex: 50
      });
      gsap.to(previewRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;

    // Animate overlay out
    const el = overlayRefs.current[index];
    if (el) {
      gsap.killTweensOf(el);
      gsap.to(el, {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(el, { visibility: 'hidden', opacity: 0 });
        }
      });
    }

    // Hide preview
    if (previewRef.current) {
      gsap.killTweensOf(previewRef.current);
      gsap.to(previewRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          if (currentIndex === index) { // Only hide if we haven't switched to another project
            gsap.set(previewRef.current, { display: 'none', visibility: 'hidden' });
            setCurrentIndex(null);
          }
        }
      });
    } else {
      setCurrentIndex(null);
    }
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    if (xSet.current && ySet.current) {
      xSet.current(e.clientX + 20);
      ySet.current(e.clientY + 20);
    }
  };

  return (
    <section id="work" className={`flex flex-col min-h-screen ${
      theme === 'glass' ? 'bg-transparent' : theme === 'light' ? 'bg-[#fafafa]' : ''
    }`}>
      <AnimatedHeaderSection
        subTitle={"Logic meets Aesthetics, Seamlessly"}
        title={"Works"}
        text={text}
        textColor={getTextColor()}
        withScrollTrigger={true}
      />
      <div
        ref={containerRef}
        className="relative flex flex-col font-light"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          // Force cleanup when leaving container
          if (currentIndex !== null) {
            handleMouseLeave(currentIndex);
            setCurrentIndex(null);
          }
        }}
      >
        {projects.map((project, index) => (
          <a
            key={project.id}
            id="project"
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0"
            onMouseEnter={(e) => handleMouseEnter(index, e)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* overlay - only shows on hover of text area */}
            <div
              ref={(el) => {
                overlayRefs.current[index] = el;
              }}
              className={`absolute inset-0 hidden md:block -z-10 ${getOverlayBg()}`}
              style={{
                clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
                opacity: 0,
                visibility: "hidden",
                willChange: "clip-path",
                pointerEvents: "none",
              }}
            />

            {/* Content container */}
            <div className="px-10 md:group-hover:px-12 transition-all duration-500 pointer-events-none">
              {/* title row */}
              <div className={`flex justify-between items-center transition-all duration-500 ${
                theme === 'glass' 
                  ? 'text-white md:group-hover:text-cyan-400' 
                  : theme === 'light'
                  ? 'text-gray-900 md:group-hover:text-white'
                  : 'text-black md:group-hover:text-white'
              }`}>
                <h2 className="lg:text-[32px] text-[26px] leading-none">
                  {project.name}
                </h2>
                <Icon 
                  icon="lucide:arrow-up-right" 
                  className="md:size-6 size-5 flex-shrink-0"
                />
              </div>
              {/* divider */}
              <div className={`w-full h-0.5 my-1 ${
                theme === 'glass' ? 'bg-white/30' : theme === 'light' ? 'bg-gray-300' : 'bg-black/80'
              }`} />
              {/* framework row */}
              <div className="flex text-xs leading-loose uppercase transtion-all duration-500 md:text-sm gap-x-5 flex-wrap">
                {project.frameworks.map((framework) => (
                  <p
                    key={framework.id}
                    className={`transition-colors duration-500 whitespace-nowrap ${
                      theme === 'glass'
                        ? 'text-white/70 md:group-hover:text-white'
                        : theme === 'light'
                        ? 'text-gray-600 md:group-hover:text-white'
                        : 'text-black md:group-hover:text-white'
                    }`}
                  >
                    {framework.name}
                  </p>
                ))}
              </div>
            </div>

            {/* mobile preview */}
            <div className="relative flex items-center justify-center px-10 md:hidden h-[400px]">
              {project.category === 'video' && project.video ? (
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full rounded-md"
                />
              ) : (
                <>
                  <img
                    src={project.bgImage}
                    alt={`${project.name} background`}
                    className="object-cover w-full h-full rounded-md brightness-50"
                  />
                  <img
                    src={project.image}
                    alt={`${project.name} preview`}
                    className="absolute px-14 object-contain max-h-[80%] rounded-xl"
                  />
                </>
              )}
            </div>
          </a>
        ))}

        {/* Desktop Floating Preview */}
        <div
          ref={previewRef}
          className="fixed top-0 left-0 z-[100] w-[480px] md:block hidden rounded-lg overflow-hidden pointer-events-none shadow-2xl"
          style={{
            opacity: 0,
            scale: 0.8,
            display: 'none',
            visibility: 'hidden',
            border: '4px solid black'
          }}
        >
          {currentIndex !== null && projects[currentIndex] && (
             projects[currentIndex].category === 'video' && projects[currentIndex].video ? (
                <video
                  key={`video-${currentIndex}`}
                  src={projects[currentIndex].video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <img
                  key={`image-${currentIndex}`}
                  src={projects[currentIndex].image}
                  alt={`${projects[currentIndex].name} preview`}
                  className="object-contain w-full h-full bg-black"
                />
              )
          )}
        </div>
      </div>
    </section>
  );
};

export default Works;
