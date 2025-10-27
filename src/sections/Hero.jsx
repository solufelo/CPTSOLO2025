import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";

/**
 * Hero Section Component
 * Features an animated 3D planet background using React Three Fiber
 * with responsive scaling based on screen size
 */
const Hero = () => {
  // Check if viewport is mobile sized for responsive planet scaling
  const isMobile = useMediaQuery({ maxWidth: 853 });
  
  // Hero text content
  const keywordsText = `Full-Stack Developer • Creative Technologist`;
  const aboutText = `Premium web development + video production. One developer, complete solutions.`;

  return (
    <section id="home" className="flex flex-col justify-end min-h-screen">
      {/* Animated header with title and description */}
      <AnimatedHeaderSection
        subTitle={keywordsText}
        title={"Solomon Olufelo"}
        text={aboutText}
        textColor={"text-black"}
      />
      
      {/* 3D Planet Background Canvas */}
      <figure
        className="absolute inset-0 -z-50"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
        >
          {/* Base ambient lighting */}
          <ambientLight intensity={0.5} />
          
          {/* Floating planet with responsive scaling */}
          <Float speed={0.5}>
            <Planet scale={isMobile ? 0.7 : 1} />
          </Float>
          
          {/* Environment lighting setup with multiple light formers */}
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 4, 1]}>
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 5, -9]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 3, 1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[-5, -1, -1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[10, 1, 0]}
                scale={16}
              />
            </group>
          </Environment>
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;