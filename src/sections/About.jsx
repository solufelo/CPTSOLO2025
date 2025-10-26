import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLine";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * About Section Component
 * Solomon's story - Where code meets creativity
 * Features scroll-triggered animations and clip-path image reveal
 */
const About = () => {
  // Header text - the mission statement
  const text = `Where code meets creativity.
    Building digital experiences from database to deployment,
    with cinematic content to bring it all to life.`;

  // Main about text - Solomon's authentic story
  const aboutText = `Captain Solo—full-stack developer by trade, videographer by passion. 6 years, 1,400+ projects, 4.8★ rating. I turned academic setbacks into code boot camps, gaming sessions into GSAP animations, and a love for storytelling into a career filming everything from mic freestyles to university basketball.

What makes me different? I don't just build your website—I shoot the content to fill it. Restaurant site? I'll code the menu AND photograph the dishes. Artist portfolio? I'll build the platform AND film the music video. That's the Captain Solo advantage.

When I'm not coding or behind the camera:
🎮 Turning game mechanics into UI/UX insights (yes, that counts as research)
🎬 Rewatching iconic movie scenes for cinematography notes
🏀 Playing pickup basketball (great for team dynamics... and cardio)
🎵 Blasting music while debugging (volume = productivity, fight me)

Based in Waterloo/Brampton, serving the GTA. Remote-friendly for web dev, will travel for video. Let's build something unforgettable.`;

  // Ref for image animation
  const imgRef = useRef(null);

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
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      {/* Animated header */}
      <AnimatedHeaderSection
        subTitle={"Code with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      
      {/* Content: Image + About text */}
      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60">
        {/* Profile image with clip-path reveal animation */}
        <img
          ref={imgRef}
          src="images/man.jpg"
          alt="Solomon Olufelo - Captain Solo"
          className="w-md rounded-3xl"
        />
        
        {/* Animated about text */}
        <AnimatedTextLines text={aboutText} className={"w-full"} />
      </div>
    </section>
  );
};

export default About;  