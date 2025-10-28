import { useRef, useState } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { servicesData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Services Section Component
 * Displays Solomon's full-stack development + video production services
 * Features sticky scroll animations on desktop with GSAP
 */
const Services = () => {
  // Hero text introducing services
  const text = `Secure, high-performance full-stack apps with smooth UX. Plus video content that makes it all shine.`;
  
  // Refs for GSAP scroll animations
  const serviceRefs = useRef([]);
  const previewRef = useRef(null);
  
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
      duration: 1.2,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 1.5,
      ease: "power3.out",
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

    gsap.to(previewRef.current, {
      opacity: 0.95,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  // Handle mouse leave on service item
  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    setCurrentHoveredItem(null);

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Handle mouse move to update preview position
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;
    moveX.current(mouse.current.x);
    moveY.current(mouse.current.y);
  };

  return (
    <section id="services" className="min-h-screen bg-black rounded-t-4xl">
      {/* Animated header section */}
      <AnimatedHeaderSection
        subTitle={"Behind the scene, Beyond the screen"}
        title={"Services"}
        text={text}
        textColor={"text-white"}
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
            className={`sticky px-10 pt-6 text-white bg-black border-t-2 border-white/30 ${
              isLastCard ? 'pb-6' : 'pb-12'
            }`}
            style={
              isDesktop
                ? {
                    top: `calc(10vh + ${index * 5}em)`,
                    marginBottom: `${(servicesData.length - index - 1) * 5}rem`,
                  }
                : { top: 0 }
            }
          >
          <div className="flex items-center justify-between gap-4 font-light">
            <div className="flex flex-col gap-6">
              {/* Service title */}
              <h2 className="text-4xl lg:text-5xl">{service.title}</h2>
              
              {/* Service description */}
              <p className="text-xl leading-relaxed tracking-widest lg:text-2xl text-white/60 text-pretty">
                {service.description}
              </p>
              
              {/* Service items list with numbered dividers and hover descriptions */}
              <div className="flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl text-white/80">
                {service.items.map((item, itemIndex) => (
                  <div 
                    key={`item-${index}-${itemIndex}`} 
                    className="group/item relative"
                    onMouseEnter={() => handleMouseEnter(index, itemIndex)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <h3 className="flex cursor-help transition-colors group-hover/item:text-gold">
                      <span className="mr-12 text-lg text-white/30 group-hover/item:text-gold/50">
                        0{itemIndex + 1}
                      </span>
                      {item.title}
                    </h3>
                    
                    {/* Hover description - shows on desktop hover, always visible on mobile */}
                    {item.hoverDescription && (
                      <div className="mt-2 text-base text-white/70 leading-relaxed md:opacity-0 md:max-h-0 md:overflow-hidden md:group-hover/item:opacity-100 md:group-hover/item:max-h-[200px] transition-all duration-300">
                        {item.hoverDescription}
                      </div>
                    )}
                    
                    {/* Tech stack - smaller text */}
                    <div className="mt-1 text-sm text-white/40">
                      {item.description}
                    </div>
                    
                    {/* Divider line between items */}
                    {itemIndex < service.items.length - 1 && (
                      <div className="w-full h-px my-2 bg-white/30" />
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
        className="fixed -top-2/6 left-0 z-50 overflow-hidden border-4 border-gold pointer-events-none w-[480px] md:block hidden opacity-0 rounded-lg shadow-2xl"
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