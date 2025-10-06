import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const BackgroundMesh = () => {
  const [scrollY, setScrollY] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rotation = scrollY * 0.03;
  const scale = 1 + (scrollY * 0.00005);

  const getShapeColor = (index: number) => {
    const lightColors = [
      "radial-gradient(circle, hsl(188 80% 40% / 0.4) 0%, hsl(188 80% 40% / 0.1) 50%, transparent 70%)", // teal medium
      "radial-gradient(circle, hsl(14 100% 60% / 0.35) 0%, hsl(14 100% 60% / 0.08) 50%, transparent 70%)", // orange vibrant
      "radial-gradient(circle, hsl(189 80% 68% / 0.45) 0%, hsl(189 80% 68% / 0.12) 50%, transparent 70%)", // teal light
      "radial-gradient(circle, hsl(23 100% 63% / 0.25) 0%, hsl(23 100% 63% / 0.06) 50%, transparent 70%)", // orange warm
      "radial-gradient(circle, hsl(188 100% 25% / 0.3) 0%, hsl(188 100% 25% / 0.08) 50%, transparent 70%)", // teal dark
    ];
    
    const darkColors = [
      "radial-gradient(circle, hsl(189 80% 68% / 0.25) 0%, hsl(189 80% 68% / 0.08) 50%, transparent 70%)", // teal light
      "radial-gradient(circle, hsl(23 100% 63% / 0.2) 0%, hsl(23 100% 63% / 0.06) 50%, transparent 70%)", // orange warm
      "radial-gradient(circle, hsl(188 80% 50% / 0.3) 0%, hsl(188 80% 50% / 0.1) 50%, transparent 70%)", // teal medium bright
      "radial-gradient(circle, hsl(14 100% 60% / 0.22) 0%, hsl(14 100% 60% / 0.05) 50%, transparent 70%)", // orange vibrant
      "radial-gradient(circle, hsl(189 80% 68% / 0.18) 0%, hsl(189 80% 68% / 0.04) 50%, transparent 70%)", // teal light soft
    ];

    return theme === "dark" ? darkColors[index] : lightColors[index];
  };

  // Reduced motion check
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Organic flowing shapes with warm palette */}
      <div 
        className="absolute -top-1/3 -left-1/4 w-[850px] h-[850px] animate-morph-blob blur-[120px]"
        style={{
          background: getShapeColor(0),
          transform: `rotate(${rotation}deg) scale(${scale})`,
          transition: "transform 0.1s ease-out",
          animationDelay: "0s",
          borderRadius: "60% 40% 50% 70% / 60% 50% 70% 40%"
        }}
      />
      
      <div 
        className="absolute top-1/4 -right-1/5 w-[750px] h-[750px] animate-morph-blob blur-[110px]"
        style={{
          background: getShapeColor(1),
          transform: `rotate(${-rotation}deg) scale(${scale * 0.95})`,
          transition: "transform 0.1s ease-out",
          animationDelay: "8s",
          borderRadius: "50% 60% 70% 40% / 50% 70% 40% 60%"
        }}
      />
      
      <div 
        className="absolute bottom-1/4 left-1/4 w-[800px] h-[800px] animate-morph-blob blur-[115px]"
        style={{
          background: getShapeColor(2),
          transform: `rotate(${rotation * 0.7}deg) scale(${scale})`,
          transition: "transform 0.1s ease-out",
          animationDelay: "16s",
          borderRadius: "70% 50% 60% 40% / 40% 60% 50% 70%"
        }}
      />

      <div 
        className="absolute top-2/3 right-1/5 w-[680px] h-[680px] animate-morph-blob blur-[100px]"
        style={{
          background: getShapeColor(3),
          transform: `rotate(${-rotation * 0.9}deg) scale(${scale * 0.92})`,
          transition: "transform 0.1s ease-out",
          animationDelay: "24s",
          borderRadius: "40% 70% 50% 60% / 70% 40% 60% 50%"
        }}
      />

      <div 
        className="absolute top-1/2 left-1/3 w-[600px] h-[600px] animate-morph-blob blur-[95px]"
        style={{
          background: getShapeColor(4),
          transform: `translate(-50%, -50%) rotate(${rotation * 1.1}deg) scale(${scale})`,
          transition: "transform 0.1s ease-out",
          animationDelay: "32s",
          borderRadius: "55% 65% 45% 75% / 65% 45% 75% 55%"
        }}
      />

      {/* Subtle organic grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, hsl(130 30% 70% / 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, hsl(15 70% 65% / 0.1) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
};

export default BackgroundMesh;
