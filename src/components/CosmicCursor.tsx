import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const CosmicCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorTrail = useRef<{ x: number; y: number; opacity: number }[]>([]);
  const animationFrameId = useRef<number>();
  const { theme } = useTheme();

  // Mouse move event
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Add to trail
      cursorTrail.current.push({
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
      });

      // Keep trail length manageable
      if (cursorTrail.current.length > 20) {
        cursorTrail.current.shift();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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

    const getColors = () => {
      if (theme === "dark") {
        return {
          primary: "rgba(153, 123, 230, 1)", // Soft purple hsl(250 70% 65%)
          secondary: "rgba(189, 139, 242, 0.8)", // Pale lavender hsl(280 65% 70%)
          accent: "rgba(189, 139, 242, 0.6)",
          trail: "rgba(153, 123, 230, 0.3)",
        };
      }
      return {
        primary: "rgba(153, 123, 230, 0.9)", // Soft purple
        secondary: "rgba(189, 139, 242, 0.7)", // Pale lavender
        accent: "rgba(153, 123, 230, 0.5)",
        trail: "rgba(153, 123, 230, 0.2)",
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const colors = getColors();

      // Draw smooth trail
      cursorTrail.current.forEach((point, i) => {
        const opacity = point.opacity * (i / cursorTrail.current.length);
        const size = 3 + (i / cursorTrail.current.length) * 8;

        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fillStyle = colors.trail.replace(/[\d.]+\)$/g, `${opacity})`);
        ctx.fill();

        // Fade out trail points
        point.opacity *= 0.95;
      });

      // Remove fully faded points
      cursorTrail.current = cursorTrail.current.filter((p) => p.opacity > 0.01);

      // Main cursor with layered rings
      const { x, y } = mousePos.current;

      // Outer glow ring
      const outerGradient = ctx.createRadialGradient(x, y, 0, x, y, 30);
      outerGradient.addColorStop(0, colors.accent);
      outerGradient.addColorStop(0.5, colors.secondary.replace(/[\d.]+\)$/g, "0.2)"));
      outerGradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fillStyle = outerGradient;
      ctx.fill();

      // Middle ring with border
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.strokeStyle = colors.secondary;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner core with gradient
      const coreGradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
      coreGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      coreGradient.addColorStop(0.6, colors.primary);
      coreGradient.addColorStop(1, colors.secondary);
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.fill();

      // Center dot
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.fill();

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
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="cosmic-cursor-canvas fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default CosmicCursor;
