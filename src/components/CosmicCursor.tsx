import { useEffect, useRef, useState } from "react";

const FlowerCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const rotation = useRef(0);
  const animationFrameId = useRef<number>();
  const [isDark, setIsDark] = useState(false);

  // Detect theme based on system preference or you can toggle manually
  useEffect(() => {
    // Check if user prefers dark mode
    const checkTheme = () => {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
    };

    checkTheme();

    // Listen for theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", checkTheme);

    return () => mediaQuery.removeEventListener("change", checkTheme);
  }, []);

  // Mouse move event
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "auto";
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawFlower = (x: number, y: number, size: number) => {
      const petalCount = 5;
      const petalSize = size;

      // Colors
      const petalColor = isDark
        ? "rgba(255, 182, 193, 0.8)" // Light pink for dark mode
        : "rgba(255, 105, 180, 0.8)"; // Hot pink for light mode

      const centerColor = isDark
        ? "rgba(255, 223, 0, 0.9)" // Gold for dark mode
        : "rgba(255, 193, 37, 0.9)"; // Sunflower yellow for light mode

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation.current);

      // Draw petals
      for (let i = 0; i < petalCount; i++) {
        ctx.save();
        ctx.rotate(((Math.PI * 2) / petalCount) * i);

        // Simple petal shape (ellipse)
        ctx.beginPath();
        ctx.ellipse(0, -petalSize * 0.6, petalSize * 0.4, petalSize * 0.7, 0, 0, Math.PI * 2);
        ctx.fillStyle = petalColor;
        ctx.fill();

        ctx.restore();
      }

      // Draw center
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = centerColor;
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x, y } = mousePos.current;

      // Slowly rotate the flower
      rotation.current += 0.01;

      // Draw the flower cursor
      drawFlower(x, y, 12);

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      animate();
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isDark]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
        style={{ mixBlendMode: "normal" }}
      />
      {/* Optional: Manual theme toggle button */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-4 right-4 z-[10000] px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-md text-sm"
        style={{ cursor: "pointer" }}
      >
        {isDark ? "☀️" : "🌙"}
      </button>
    </>
  );
};

export default FlowerCursor;
