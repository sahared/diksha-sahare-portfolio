import { useEffect, useState } from "react";

const BackgroundMesh = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rotation = scrollY * 0.05;
  const scale = 1 + (scrollY * 0.0001);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Enhanced morphing gradient orbs with terracotta palette */}
      <div 
        className="absolute -top-1/2 -left-1/4 w-[900px] h-[900px] animate-morph-blob blur-[130px] opacity-[0.25]"
        style={{
          background: "radial-gradient(circle, hsl(15 60% 68%) 0%, transparent 70%)",
          transform: `rotate(${rotation}deg) scale(${scale})`,
          transition: "transform 0.1s ease-out",
          filter: `brightness(${1 + scrollY * 0.0001})`,
          animationDelay: "0s"
        }}
      />
      
      <div 
        className="absolute top-1/4 -right-1/4 w-[750px] h-[750px] animate-morph-blob blur-[110px] opacity-[0.2]"
        style={{
          background: "radial-gradient(circle, hsl(20 55% 75%) 0%, transparent 70%)",
          transform: `rotate(${-rotation}deg) scale(${scale})`,
          transition: "transform 0.1s ease-out",
          filter: `brightness(${1.1 - scrollY * 0.00008})`,
          animationDelay: "8s"
        }}
      />
      
      <div 
        className="absolute bottom-1/4 left-1/3 w-[850px] h-[850px] animate-morph-blob blur-[120px] opacity-[0.18]"
        style={{
          background: "radial-gradient(circle, hsl(35 35% 90%) 0%, transparent 70%)",
          transform: `rotate(${rotation * 0.5}deg) scale(${scale})`,
          transition: "transform 0.1s ease-out",
          animationDelay: "16s"
        }}
      />

      <div 
        className="absolute top-2/3 right-1/4 w-[700px] h-[700px] animate-morph-blob blur-[105px] opacity-[0.15]"
        style={{
          background: "radial-gradient(circle, hsl(25 70% 60%) 0%, transparent 70%)",
          transform: `rotate(${-rotation * 0.8}deg) scale(${scale * 0.95})`,
          transition: "transform 0.1s ease-out",
          animationDelay: "24s"
        }}
      />

      <div 
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] animate-morph-blob blur-[95px] opacity-[0.12]"
        style={{
          background: "radial-gradient(circle, hsl(20 55% 75%) 0%, transparent 70%)",
          transform: `translate(-50%, -50%) rotate(${rotation * 1.2}deg) scale(${scale})`,
          transition: "transform 0.1s ease-out",
          animationDelay: "32s"
        }}
      />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px"
        }}
      />
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
        }}
      />
    </div>
  );
};

export default BackgroundMesh;
