import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ScrollBlobs = () => {
  const [scrollY, setScrollY] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getBlobColor = (index: number) => {
    const colors = {
      light: [
        "hsl(15 60% 68% / 0.08)",
        "hsl(20 55% 75% / 0.06)",
        "hsl(35 35% 90% / 0.1)",
        "hsl(25 70% 60% / 0.07)",
      ],
      dark: [
        "hsl(15 60% 68% / 0.12)",
        "hsl(20 50% 65% / 0.1)",
        "hsl(30 25% 25% / 0.15)",
        "hsl(25 70% 60% / 0.1)",
      ],
    };
    return theme === "dark" ? colors.dark[index] : colors.light[index];
  };

  // Reduced motion check
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return null;

  const blobs = [
    { x: "-10%", y: "10%", size: 1000, parallax: 0.3, delay: 0 },
    { x: "80%", y: "30%", size: 900, parallax: 0.5, delay: 5 },
    { x: "20%", y: "60%", size: 1100, parallax: 0.4, delay: 10 },
    { x: "70%", y: "80%", size: 950, parallax: 0.6, delay: 15 },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {blobs.map((blob, index) => (
        <div
          key={index}
          className="absolute rounded-full animate-morph-blob blur-[100px]"
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
          }}
        />
      ))}
    </div>
  );
};

export default ScrollBlobs;
