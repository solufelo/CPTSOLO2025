import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";

/**
 * Contact Section Component
 * Solomon's contact information and call-to-action
 * Features GSAP staggered animations for contact links
 */
const Contact = () => {
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
      className="flex flex-col justify-between min-h-screen bg-black pb-0 overflow-hidden"
    >
      <div className="flex-grow">
        {/* Animated header */}
        <AnimatedHeaderSection
          subTitle={"Let's Create Something Legendary"}
          title={"Contact"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />
        
        {/* Contact information */}
        <div className="flex px-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-20">
          <div className="flex flex-col w-full gap-10">
            {/* Email */}
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <a 
                href="mailto:work@captainsolo.ca"
                className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl hover:text-white/80 transition-colors duration-200"
              >
                work@captainsolo.ca
              </a>
            </div>
            
            {/* Location */}
            <div className="social-link">
              <h2>Location</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl tracking-wider md:text-2xl lg:text-3xl">
                Brampton, ON • Serving GTA
              </p>
            </div>
            
            {/* Social Media */}
            <div className="social-link">
              <h2>Social Media</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <div className="flex flex-wrap gap-2">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs leading-loose tracking-wides uppercase md:text-sm hover:text-white/80 transition-colors duration-200"
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
      </div>
      
      {/* Bottom marquee with brand messages - Fixed to bottom */}
      <div className="mt-auto">
        <Marquee items={items} className="text-white bg-transparent" />
      </div>
    </section>
  );
};

export default Contact;