import { lazy, Suspense } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useTheme } from "../context/ThemeContext";

// 3D background is code-split so three.js loads after first paint, not before it.
const PlanetScene = lazy(() => import("../components/PlanetScene"));

/**
 * Hero Section Component
 * Features an animated 3D planet background using React Three Fiber
 * with responsive scaling based on screen size
 */
const Hero = () => {
  const { theme } = useTheme();
  
  // Hero text content
  const keywordsText = `Creative Technologist • Full-Stack Developer • Motion & Video`;
  const aboutText = `Captain Solo — shipped demos, case studies, and client work across code and camera.`;

  // Theme-aware text color
  const getTextColor = () => {
    switch(theme) {
      case 'glass':
        return 'text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]';
      case 'light':
        return 'text-gray-900';
      default:
        return 'text-black';
    }
  };

  return (
    <section id="home" className={`flex flex-col justify-end min-h-screen hero-section relative ${
      theme === 'glass' ? 'bg-transparent' : theme === 'light' ? 'bg-[#fafafa]' : ''
    }`}>
      {/* Animated header with title and description */}
      <div className="relative z-10">
        <AnimatedHeaderSection
          subTitle={keywordsText}
          title={"Solomon Olufelo"}
          text={aboutText}
          textColor={getTextColor()}
        />
      </div>
      
      {/* 3D Planet Background Canvas (lazy-loaded) */}
      <figure
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Suspense fallback={null}>
          <PlanetScene />
        </Suspense>
      </figure>
    </section>
  );
};

export default Hero;
