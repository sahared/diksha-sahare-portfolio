import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  tx: number;
  ty: number;
}

const AmbientParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate 25 particles with random positions and properties
    const newParticles: Particle[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * -20,
      tx: (Math.random() - 0.5) * 60,
      ty: (Math.random() - 0.5) * 80,
    }));
    setParticles(newParticles);
  }, []);

  const getParticleColor = () => {
    if (theme === "dark") {
      return "hsl(15 60% 68% / 0.3)";
    }
    return "hsl(15 60% 68% / 0.25)";
  };

  // Reduced motion check
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: getParticleColor(),
            animation: `particle-float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            // @ts-ignore - CSS custom properties
            "--tx": `${particle.tx}px`,
            "--ty": `${particle.ty}px`,
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
};

export default AmbientParticles;
