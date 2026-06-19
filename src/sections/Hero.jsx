import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer, ContactShadows } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useTheme } from "../context/ThemeContext";

/**
 * Hero Section Component
 * Features an animated 3D planet background using React Three Fiber
 * with responsive scaling based on screen size
 */
const Hero = () => {
  // Check if viewport is mobile sized for responsive planet scaling
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const { theme } = useTheme();
  
  // Hero text content
  const keywordsText = `Full-Stack Developer • Creative Technologist`;
  const aboutText = `Premium web development + video production. One developer, complete solutions.`;

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

  // Theme-aware lighting - drastically increased for light mode visibility
  const getLightConfig = () => {
    switch(theme) {
      case 'glass':
        return {
          ambient: 0.5,
          main: 2,
          secondary: 1.5,
          accent: 1.5,
        };
      case 'light':
        // Light: Minimal lighting - planet is self-illuminating via emissive
        return {
          ambient: 0.1, // Very low ambient
          main: 0,     // No environment light needed
          secondary: 0, 
          accent: 0,    
        };
      default:
        return {
          ambient: 0.5,
          main: 2,
          secondary: 2,
          accent: 2,
        };
    }
  };

  const lightConfig = getLightConfig();

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
      
      {/* 3D Planet Background Canvas */}
      <figure
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas
          shadows
          dpr={[1, 2]} // Better resolution on high DPI screens
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
          gl={{ alpha: true, antialias: true }} // Ensure transparent background works properly
          style={{ background: 'transparent' }} // Explicitly set transparent background
        >
          {/* Base ambient lighting - not needed for light mode (MeshBasicMaterial) */}
          {theme !== 'light' && <ambientLight intensity={lightConfig.ambient} />}
          
          {/* LIGHT MODE SPECIFIC SETUP - No lighting needed, MeshBasicMaterial is self-illuminating */}
          {theme === 'light' && (
            <>
              {/* Contact shadows for grounding - very subtle */}
              <ContactShadows 
                rotation={[Math.PI / 2, 0, 0]} 
                position={[0, -1.6, 0]} 
                opacity={0.2} 
                width={12} 
                height={12} 
                blur={2} 
                far={2} 
              />
            </>
          )}
          
          {/* Floating planet with responsive scaling */}
          <Float speed={0.5}>
            <Planet key={`planet-${theme}`} scale={isMobile ? 0.7 : 1} />
          </Float>
          
          {/* Environment lighting setup - disabled for light mode */}
          {theme !== 'light' && (
            <Environment resolution={512}>
              <group rotation={[-Math.PI / 3, 4, 1]}>
                <Lightformer
                  form={"circle"}
                  intensity={lightConfig.main}
                  position={[0, 5, -9]}
                  scale={10}
                />
                <Lightformer
                  form={"circle"}
                  intensity={lightConfig.secondary}
                  position={[0, 3, 1]}
                  scale={10}
                />
                <Lightformer
                  form={"circle"}
                  intensity={lightConfig.accent}
                  position={[-5, -1, -1]}
                  scale={10}
                />
                <Lightformer
                  form={"circle"}
                  intensity={lightConfig.accent}
                  position={[10, 1, 0]}
                  scale={16}
                />
              </group>
            </Environment>
          )}
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;
