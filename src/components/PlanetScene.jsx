import { Canvas } from "@react-three/fiber";
import { Environment, Float, Lightformer, ContactShadows } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { Planet } from "./Planet";
import { useTheme } from "../context/ThemeContext";

/**
 * The Hero's 3D planet background, isolated so three.js / @react-three can be
 * code-split out of the initial bundle and loaded after first paint.
 */
const PlanetScene = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const { theme } = useTheme();

  const getLightConfig = () => {
    switch (theme) {
      case "glass":
        return { ambient: 0.5, main: 2, secondary: 1.5, accent: 1.5 };
      case "light":
        return { ambient: 0.1, main: 0, secondary: 0, accent: 0 };
      default:
        return { ambient: 0.5, main: 2, secondary: 2, accent: 2 };
    }
  };

  const lightConfig = getLightConfig();

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      {theme !== "light" && <ambientLight intensity={lightConfig.ambient} />}

      {theme === "light" && (
        <ContactShadows
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, -1.6, 0]}
          opacity={0.2}
          width={12}
          height={12}
          blur={2}
          far={2}
        />
      )}

      <Float speed={0.5}>
        <Planet key={`planet-${theme}`} scale={isMobile ? 0.7 : 1} />
      </Float>

      {theme !== "light" && (
        <Environment resolution={512}>
          <group rotation={[-Math.PI / 3, 4, 1]}>
            <Lightformer form={"circle"} intensity={lightConfig.main} position={[0, 5, -9]} scale={10} />
            <Lightformer form={"circle"} intensity={lightConfig.secondary} position={[0, 3, 1]} scale={10} />
            <Lightformer form={"circle"} intensity={lightConfig.accent} position={[-5, -1, -1]} scale={10} />
            <Lightformer form={"circle"} intensity={lightConfig.accent} position={[10, 1, 0]} scale={16} />
          </group>
        </Environment>
      )}
    </Canvas>
  );
};

export default PlanetScene;
