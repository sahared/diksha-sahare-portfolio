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
      {/* Animated gradient orbs */}
      <div 
        className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full blur-[120px] opacity-30 animate-float-slow"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          transform: `rotate(${rotation}deg) scale(${scale})`,
          transition: "transform 0.1s ease-out"
        }}
      />
      
      <div 
        className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full blur-[100px] opacity-25 animate-float-medium"
        style={{
          background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)",
          transform: `rotate(${-rotation}deg) scale(${scale})`,
          transition: "transform 0.1s ease-out"
        }}
      />
      
      <div 
        className="absolute bottom-1/4 left-1/3 w-[700px] h-[700px] rounded-full blur-[110px] opacity-20 animate-float-fast"
        style={{
          background: "radial-gradient(circle, hsl(var(--secondary)) 0%, transparent 70%)",
          transform: `rotate(${rotation * 0.5}deg) scale(${scale})`,
          transition: "transform 0.1s ease-out"
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
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
        }}
      />
    </div>
  );
};

export default BackgroundMesh;
