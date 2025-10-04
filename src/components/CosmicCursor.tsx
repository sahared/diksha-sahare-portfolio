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
          primary: "rgba(242, 188, 156, 0.7)", // Soft peach
          secondary: "rgba(253, 232, 211, 0.5)", // Cream peach
          accent: "rgba(242, 188, 156, 0.4)",
          trail: "rgba(242, 188, 156, 0.25)",
        };
      }
      return {
        primary: "rgba(228, 114, 68, 0.8)", // Terracotta
        secondary: "rgba(237, 168, 157, 0.6)", // Dusty rose
        accent: "rgba(228, 114, 68, 0.5)",
        trail: "rgba(228, 114, 68, 0.3)",
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

      // Determine theme-based sizes and styles
      const isDark = theme === "dark";
      const outerR = isDark ? 30 : 36;
      const ringR = isDark ? 12 : 13;
      const coreR = isDark ? 8 : 9;
      const ringWidth = isDark ? 2 : 2.5;

      // Optional subtle drop shadow in light theme for contrast
      if (!isDark) {
        ctx.beginPath();
        ctx.arc(x, y, outerR + 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.08)";
        ctx.fill();
      }

      // Outer glow ring
      const outerGradient = ctx.createRadialGradient(x, y, 0, x, y, outerR);
      outerGradient.addColorStop(0, colors.accent);
      outerGradient.addColorStop(0.5, colors.secondary.replace(/[\d.]+\)$/g, "0.25)"));
      outerGradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(x, y, outerR, 0, Math.PI * 2);
      ctx.fillStyle = outerGradient;
      ctx.fill();

      // Middle ring with border
      ctx.beginPath();
      ctx.arc(x, y, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = colors.secondary;
      ctx.lineWidth = ringWidth;
      ctx.stroke();

      // Inner core with gradient
      const coreGradient = ctx.createRadialGradient(x, y, 0, x, y, coreR);
      coreGradient.addColorStop(0, isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(255,255,255,0.95)");
      coreGradient.addColorStop(0.6, colors.primary);
      coreGradient.addColorStop(1, colors.secondary);
      ctx.beginPath();
      ctx.arc(x, y, coreR, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.fill();

      // Crisp outline for visibility on light backgrounds
      if (!isDark) {
        ctx.beginPath();
        ctx.arc(x, y, coreR, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0,0,0,0.25)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Center dot
      ctx.beginPath();
      ctx.arc(x, y, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
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
      style={{ mixBlendMode: theme === "dark" ? "screen" : "multiply" }}
    />
  );
};

export default CosmicCursor;
