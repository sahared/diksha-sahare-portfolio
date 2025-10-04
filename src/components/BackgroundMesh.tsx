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
      {/* Enhanced morphing gradient orbs with terracotta palette - more visible */}
      <div 
        className="absolute -top-1/2 -left-1/4 w-[900px] h-[900px] animate-morph-blob blur-[100px] opacity-[0.35]"
        style={{
          background: "radial-gradient(circle, hsl(15 70% 65%) 0%, hsl(15 60% 68% / 0.5) 40%, transparent 70%)",
          transform: `rotate(${rotation}deg) scale(${scale})`,
          transition: "transform 0.1s ease-out",
          filter: `brightness(${1 + scrollY * 0.0001})`,
          animationDelay: "0s"
        }}
      />
      
      <div 
        className="absolute top-1/4 -right-1/4 w-[750px] h-[750px] animate-morph-blob blur-[90px] opacity-[0.3]"
        style={{
          background: "radial-gradient(circle, hsl(25 75% 65%) 0%, hsl(20 55% 75% / 0.5) 40%, transparent 70%)",
          transform: `rotate(${-rotation}deg) scale(${scale})`,
          transition: "transform 0.1s ease-out",
          filter: `brightness(${1.1 - scrollY * 0.00008})`,
          animationDelay: "8s"
        }}
      />
      
      <div 
        className="absolute bottom-1/4 left-1/3 w-[850px] h-[850px] animate-morph-blob blur-[95px] opacity-[0.25]"
        style={{
          background: "radial-gradient(circle, hsl(35 45% 80%) 0%, hsl(35 35% 90% / 0.5) 40%, transparent 70%)",
          transform: `rotate(${rotation * 0.5}deg) scale(${scale})`,
          transition: "transform 0.1s ease-out",
          animationDelay: "16s"
        }}
      />

      <div 
        className="absolute top-2/3 right-1/4 w-[700px] h-[700px] animate-morph-blob blur-[85px] opacity-[0.28]"
        style={{
          background: "radial-gradient(circle, hsl(15 80% 60%) 0%, hsl(25 70% 60% / 0.5) 40%, transparent 70%)",
          transform: `rotate(${-rotation * 0.8}deg) scale(${scale * 0.95})`,
          transition: "transform 0.1s ease-out",
          animationDelay: "24s"
        }}
      />

      <div 
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] animate-morph-blob blur-[80px] opacity-[0.22]"
        style={{
          background: "radial-gradient(circle, hsl(20 65% 70%) 0%, hsl(20 55% 75% / 0.5) 40%, transparent 70%)",
          transform: `translate(-50%, -50%) rotate(${rotation * 1.2}deg) scale(${scale})`,
          transition: "transform 0.1s ease-out",
          animationDelay: "32s"
        }}
      />

      {/* Enhanced grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(15 60% 68% / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(15 60% 68% / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px"
        }}
      />
    </div>
  );
};

export default BackgroundMesh;
