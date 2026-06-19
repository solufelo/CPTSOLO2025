import { useRef, useState, useEffect } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { servicesData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useTheme } from "../context/ThemeContext";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Services Section Component
 * Displays Solomon's full-stack development + video production services
 * Features sticky scroll animations on desktop with GSAP
 */
const Services = () => {
  const { theme } = useTheme();
  // Hero text introducing services
  const text = `Secure, high-performance full-stack apps with smooth UX. Plus video content that makes it all shine.`;
  
  // Refs for GSAP scroll animations
  const serviceRefs = useRef([]);
  const previewRef = useRef(null);
  const scrollTimeoutRef = useRef(null); // Track scroll timeout for cleanup
  
  // Track which service item is currently being hovered
  const [currentHoveredItem, setCurrentHoveredItem] = useState(null);
  
  // Desktop breakpoint for sticky scroll effect
  const isDesktop = useMediaQuery({ minWidth: "48rem" }); // 768px

  // Mouse position tracking for floating preview
  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);

  // GSAP scroll animations for service cards and preview setup
  useGSAP(() => {
    // Setup quick mouse tracking for preview
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 0.6,
      ease: "power2.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 0.6,
      ease: "power2.out",
    });

    // Animate service cards on scroll
    serviceRefs.current.forEach((el) => {
      if (!el) return;

      gsap.from(el, {
        y: 200,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        duration: 1,
        ease: "circ.out",
      });
    });
  }, []);

  // Handle mouse enter on service item
  const handleMouseEnter = (serviceIndex, itemIndex) => {
    if (window.innerWidth < 768) return;
    setCurrentHoveredItem({ serviceIndex, itemIndex });

    if (previewRef.current) {
      const previewEl = previewRef.current;
      
      // Set initial position to current mouse position
      gsap.set(previewEl, {
        x: mouse.current.x,
        y: mouse.current.y,
      });
      
      // Set initial state with border and shadow
      previewEl.classList.remove('hidden');
      previewEl.style.display = "block";
      previewEl.style.visibility = "visible";
      
      // Set border color based on theme
      const borderColor = theme === 'light' ? '#2563eb' : theme === 'glass' ? '#22d3ee' : '#d4af37';
      previewEl.style.border = `4px solid ${borderColor}`;
      previewEl.style.borderWidth = "4px";
      previewEl.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
      
      gsap.fromTo(previewEl,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 0.95,
          scale: 1,
          duration: 0.25,
          ease: "power2.out",
          onComplete: () => {
            if (previewEl) {
              previewEl.style.border = `4px solid ${borderColor}`;
              previewEl.style.opacity = "0.95";
            }
          },
        }
      );
    }
  };

  // Handle mouse leave on service item
  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    
    if (previewRef.current) {
      const previewEl = previewRef.current;
      // Immediately hide border and shadow
      previewEl.style.border = "none";
      previewEl.style.borderWidth = "0";
      previewEl.style.boxShadow = "none";
      
      gsap.to(previewEl, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          if (previewEl) {
            previewEl.style.display = "none";
            previewEl.style.visibility = "hidden";
            previewEl.style.border = "none";
            previewEl.style.borderWidth = "0";
            previewEl.style.boxShadow = "none";
          }
        },
      });
    }
    
    setCurrentHoveredItem(null);
  };

  // Handle mouse move to update preview position
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    
    mouse.current.x = e.clientX + 20;
    mouse.current.y = e.clientY + 20;
    
    if (moveX.current && moveY.current) {
      moveX.current(mouse.current.x);
      moveY.current(mouse.current.y);
    }
  };

  // Cleanup effect: Reset all Services state when component unmounts or scrolls away
  useEffect(() => {
    // Function to completely reset Services component state
    const resetServicesState = () => {
      // Reset hover state
      setCurrentHoveredItem(null);
      
      // Hide and reset preview
      if (previewRef.current) {
        gsap.killTweensOf(previewRef.current);
        const previewEl = previewRef.current;
        
        // Immediately hide preview with all styles reset
        previewEl.style.opacity = "0";
        previewEl.style.display = "none";
        previewEl.style.visibility = "hidden";
        previewEl.style.border = "none";
        previewEl.style.borderWidth = "0";
        previewEl.style.boxShadow = "none";
        previewEl.style.pointerEvents = "none";
        previewEl.style.transform = "scale(0.95)";
        
        // Also use GSAP set
        gsap.set(previewEl, {
          opacity: 0,
          display: "none",
          visibility: "hidden",
          scale: 0.95,
          border: "none",
        });
      }
      
      // Kill all GSAP animations
      serviceRefs.current.forEach((el) => {
        if (el) {
          gsap.killTweensOf(el);
        }
      });
    };

    // Monitor scroll to detect when Services section is out of view
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          const rect = servicesSection.getBoundingClientRect();
          // If section is significantly out of view (more than 300px away), reset state
          const scrollAwayThreshold = 300;
          const isSignificantlyAway = rect.bottom < -scrollAwayThreshold || rect.top > window.innerHeight + scrollAwayThreshold;
          
          if (isSignificantlyAway && currentHoveredItem !== null) {
            resetServicesState();
          }
        }
      }, 150);
    };

    // Reset when window loses focus
    const handleBlur = () => {
      if (currentHoveredItem !== null) {
        resetServicesState();
      }
    };

    // Reset when page becomes hidden
    const handleVisibilityChange = () => {
      if (document.hidden && currentHoveredItem !== null) {
        resetServicesState();
      }
    };

    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      
      // Final cleanup - reset everything
      resetServicesState();
      
      // Clear timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };
  }, [currentHoveredItem]);

  // Get theme-aware background class
  const getSectionBg = () => {
    switch(theme) {
      case 'glass':
        return 'bg-[rgba(15,15,30,0.98)]';
      case 'light':
        return 'bg-black'; // Dark background for Services section in light mode
      default:
        return 'bg-black';
    }
  };

  const getCardBg = () => {
    switch(theme) {
      case 'glass':
        // More opaque background for glass theme to prevent see-through stacking
        return 'bg-[rgba(15,18,35,0.99)] backdrop-blur-xl border-white/10 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)]';
      case 'light':
        return 'bg-white border-gray-200 shadow-lg text-gray-900'; // White card for light mode with dark text inside
      default:
        return 'bg-black border-white/30';
    }
  };

  // Theme-aware text colors
  const getTextColor = () => {
    switch(theme) {
      case 'glass':
        // Add drop shadow for better readability on glass background
        return 'text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]';
      case 'light':
        return 'text-white'; // Keep header white even in light mode for the dark section
      default:
        return 'text-white';
    }
  };

  const getMutedColor = () => {
    if (theme === 'light') return 'text-gray-600';
    return 'text-white/60';
  };

  const getDividerColor = () => {
    if (theme === 'light') return 'bg-gray-200';
    return 'bg-white/30';
  };

  const getNumberColor = () => {
    if (theme === 'light') return 'text-gray-300 group-hover/item:text-blue-600/50';
    return 'text-white/30 group-hover/item:text-gold/50';
  };

  const getHoverTitleColor = () => {
    if (theme === 'light') return 'group-hover/item:text-blue-600';
    return 'group-hover/item:text-gold';
  };

  const getHoverDescColor = () => {
    if (theme === 'light') return 'text-gray-600';
    return 'text-white/70';
  };

  const getTechStackColor = () => {
    if (theme === 'light') return 'text-gray-500';
    return 'text-white/40';
  };

  return (
    <section id="services" className={`min-h-screen rounded-t-4xl ${getSectionBg()}`}>
      {/* Animated header section */}
      <AnimatedHeaderSection
        subTitle={"Behind the scene, Beyond the screen"}
        title={"Services"}
        text={text}
        textColor={getTextColor()}
        withScrollTrigger={true}
      />

      {/* Service cards with sticky scroll on desktop */}
      <div onMouseMove={handleMouseMove}>
      {servicesData.map((service, index) => {
        const isLastCard = index === servicesData.length - 1;
        
        return (
          <div
            ref={(el) => (serviceRefs.current[index] = el)}
            key={index}
            className={`sticky px-10 pt-6 border-t-2 ${getCardBg()} ${
              isLastCard ? 'pb-6' : 'pb-12'
            } relative`}
            style={
              isDesktop
                ? {
                    top: `calc(10vh + ${index * 5}em)`,
                    marginBottom: `${(servicesData.length - index - 1) * 5}rem`,
                  }
                : { top: 0 }
            }
          >
          {/* Bottom gradient fade for glass theme - hides content peeking through */}
          {theme === 'glass' && !isLastCard && (
            <div 
              className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, transparent 0%, rgba(15,18,35,0.99) 100%)',
              }}
            />
          )}
          {/* Fade for light theme to blend card stacking */}
          {theme === 'light' && !isLastCard && (
            <div 
              className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, transparent 0%, white 100%)',
              }}
            />
          )}
          <div className="flex items-center justify-between gap-4 font-light">
            <div className="flex flex-col gap-6">
              {/* Service title */}
              <h2 className="text-4xl lg:text-5xl">{service.title}</h2>
              
              {/* Service description */}
              <p className={`text-xl leading-relaxed tracking-widest lg:text-2xl ${getMutedColor()} text-pretty`}>
                {service.description}
              </p>
              
              {/* Service items list with numbered dividers and hover descriptions */}
              <div className={`flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl ${theme === 'light' ? 'text-gray-800' : 'text-white/80'}`}>
                {service.items.map((item, itemIndex) => (
                  <div 
                    key={`item-${index}-${itemIndex}`} 
                    className="group/item relative"
                    onMouseEnter={() => handleMouseEnter(index, itemIndex)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <h3 className={`flex cursor-help transition-colors ${getHoverTitleColor()}`}>
                      <span className={`mr-12 text-lg ${getNumberColor()}`}>
                        0{itemIndex + 1}
                      </span>
                      {item.title}
                    </h3>
                    
                    {/* Hover description - shows on desktop hover, always visible on mobile */}
                    {item.hoverDescription && (
                      <div className={`mt-2 text-base ${getHoverDescColor()} leading-relaxed md:opacity-0 md:max-h-0 md:overflow-hidden md:group-hover/item:opacity-100 md:group-hover/item:max-h-[200px] transition-all duration-300`}>
                        {item.hoverDescription}
                      </div>
                    )}
                    
                    {/* Tech stack - smaller text */}
                    <div className={`mt-1 text-sm ${getTechStackColor()}`}>
                      {item.description}
                    </div>
                    
                    {/* Divider line between items */}
                    {itemIndex < service.items.length - 1 && (
                      <div className={`w-full h-px my-2 ${getDividerColor()}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        );
      })}
      </div>

      {/* Desktop Floating preview - video */}
      <div
        ref={previewRef}
        className="fixed top-0 left-0 z-50 overflow-hidden pointer-events-none w-[480px] md:block hidden rounded-lg"
        style={{
          display: currentHoveredItem !== null ? "block" : "none",
          visibility: currentHoveredItem !== null ? "visible" : "hidden",
          opacity: 0,
          border: "none",
          borderWidth: "0",
          boxShadow: "none",
          pointerEvents: "none",
        }}
      >
        {currentHoveredItem !== null && (
          <>
            {servicesData[currentHoveredItem.serviceIndex]?.items[currentHoveredItem.itemIndex]?.video && (
              <video
                src={servicesData[currentHoveredItem.serviceIndex].items[currentHoveredItem.itemIndex].video}
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full bg-black"
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Services;