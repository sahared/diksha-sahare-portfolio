import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";

const ScrollBlobs = () => {
  const [scrollY, setScrollY] = useState(0);
  const { theme } = useTheme();
  const rafRef = useRef<number>();
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        rafRef.current = requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking.current = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const getBlobColor = (index: number) => {
    const lightColors = [
      "hsl(188 80% 40% / 0.15)",
      "hsl(14 100% 60% / 0.15)",
      "hsl(189 80% 68% / 0.12)",
      "hsl(23 100% 63% / 0.13)",
      "hsl(188 80% 40% / 0.1)",
    ];
    const darkColors = [
      "hsl(189 80% 68% / 0.1)",
      "hsl(23 100% 63% / 0.1)",
      "hsl(188 80% 50% / 0.08)",
      "hsl(14 100% 60% / 0.09)",
      "hsl(189 80% 68% / 0.07)",
    ];
    return theme === "dark" ? darkColors[index] : lightColors[index];
  };

  // Reduced motion check
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return null;

  const blobs = [
    { x: "-12%", y: "8%", size: 950, parallax: 0.25, delay: 0 },
    { x: "78%", y: "25%", size: 850, parallax: 0.4, delay: 6 },
    { x: "18%", y: "55%", size: 1000, parallax: 0.35, delay: 12 },
    { x: "72%", y: "75%", size: 900, parallax: 0.5, delay: 18 },
    { x: "40%", y: "40%", size: 800, parallax: 0.3, delay: 24 },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {blobs.map((blob, index) => (
        <div
          key={index}
          className="absolute animate-morph-blob blur-[110px]"
          style={{
            left: blob.x,
            top: blob.y,
            width: `${blob.size}px`,
            height: `${blob.size}px`,
            background: getBlobColor(index),
            transform: `translateY(${scrollY * blob.parallax}px)`,
            transition: "transform 0.1s ease-out",
            animationDelay: `${blob.delay}s`,
            willChange: "transform",
            borderRadius: `${50 + (index * 5)}% ${60 - (index * 3)}% ${55 + (index * 4)}% ${65 - (index * 2)}% / ${60 + (index * 3)}% ${50 - (index * 4)}% ${70 + (index * 2)}% ${45 - (index * 3)}%`,
          }}
        />
      ))}
    </div>
  );
};

export default ScrollBlobs;
