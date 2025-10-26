import { useRef } from "react";
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
  const text = `I build secure, high-performance full-stack apps with smooth UX to drive growth—not headaches. Plus the video content to make it all shine.`;
  
  // Refs for GSAP scroll animations
  const serviceRefs = useRef([]);
  
  // Desktop breakpoint for sticky scroll effect
  const isDesktop = useMediaQuery({ minWidth: "48rem" }); // 768px

  // GSAP scroll animations for service cards
  useGSAP(() => {
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
              
              {/* Service items list with numbered dividers */}
              <div className="flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl text-white/80">
                {service.items.map((item, itemIndex) => (
                  <div key={`item-${index}-${itemIndex}`}>
                    <h3 className="flex">
                      <span className="mr-12 text-lg text-white/30">
                        0{itemIndex + 1}
                      </span>
                      {item.title}
                    </h3>
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
    </section>
  );
};

export default Services;