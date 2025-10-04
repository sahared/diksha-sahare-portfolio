import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Particle {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  opacity: number;
  color: string;
}

interface Trail {
  x: number;
  y: number;
  opacity: number;
}

const CosmicCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const mousePos = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const particles = useRef<Particle[]>([]);
  const trails = useRef<Trail[]>([]);
  const velocity = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>();
  const interactiveElements = useRef<Element[]>([]);
  const elementPositions = useRef<Map<Element, DOMRect>>(new Map());
  const lastDetectionTime = useRef(0);

  // Theme-adaptive color palettes
  const getColors = () => {
    if (theme === "dark") {
      return {
        core: "rgba(208, 130, 113, 0.9)", // Terracotta
        coreGlow: "rgba(208, 130, 113, 0.4)",
        particles: [
          "rgba(225, 155, 100, 0.8)", // Burnt orange
          "rgba(208, 130, 113, 0.8)", // Terracotta
          "rgba(235, 180, 160, 0.8)", // Warm clay
        ],
        constellation: {
          start: "rgba(208, 130, 113, 0.6)",
          end: "rgba(225, 155, 100, 0.3)",
        },
      };
    }
    return {
      core: "rgba(208, 130, 113, 0.8)", // Terracotta
      coreGlow: "rgba(208, 130, 113, 0.2)",
      particles: [
        "rgba(208, 130, 113, 0.7)", // Terracotta
        "rgba(217, 170, 155, 0.7)", // Warm clay
        "rgba(225, 155, 100, 0.7)", // Burnt orange
      ],
      constellation: {
        start: "rgba(208, 130, 113, 0.4)",
        end: "rgba(217, 170, 155, 0.2)",
      },
    };
  };

  // Initialize particles
  useEffect(() => {
    const particleCount = 8;
    const colors = getColors();
    particles.current = Array.from({ length: particleCount }, (_, i) => ({
      angle: (Math.PI * 2 * i) / particleCount,
      radius: 20 + Math.random() * 10,
      speed: 0.02 + Math.random() * 0.03,
      size: 2 + Math.random() * 2,
      opacity: 0.4 + Math.random() * 0.4,
      color: colors.particles[i % colors.particles.length],
    }));
  }, [theme]);

  // Detect interactive elements and cache their positions (throttled)
  const detectInteractiveElements = () => {
    const now = Date.now();
    if (now - lastDetectionTime.current < 100) return;
    lastDetectionTime.current = now;

    interactiveElements.current = Array.from(
      document.querySelectorAll(
        'a, button, [role="button"], [onclick], input, textarea, select, .cursor-pointer'
      )
    );
    
    // Batch read all layout properties before any writes
    elementPositions.current.clear();
    interactiveElements.current.forEach((element) => {
      elementPositions.current.set(element, element.getBoundingClientRect());
    });
  };

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      lastMousePos.current = { ...mousePos.current };
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Calculate velocity
      velocity.current = {
        x: mousePos.current.x - lastMousePos.current.x,
        y: mousePos.current.y - lastMousePos.current.y,
      };

      // Add trail point
      trails.current.push({
        x: mousePos.current.x,
        y: mousePos.current.y,
        opacity: 0.6,
      });

      // Limit trail length
      if (trails.current.length > 15) {
        trails.current.shift();
      }

      detectInteractiveElements();
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

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const colors = getColors();
      const speed = Math.sqrt(
        velocity.current.x ** 2 + velocity.current.y ** 2
      );

      // Draw trail
      trails.current.forEach((trail, i) => {
        const progress = i / trails.current.length;
        ctx.beginPath();
        ctx.arc(trail.x, trail.y, 2 * progress, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 165, 165, ${trail.opacity * progress * 0.3})`;
        ctx.fill();
        trail.opacity *= 0.95;
      });

      // Draw constellation lines to nearby interactive elements using cached positions
      interactiveElements.current.forEach((element) => {
        const rect = elementPositions.current.get(element);
        if (!rect) return;
        
        const elementCenter = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };

        const distance = Math.sqrt(
          (mousePos.current.x - elementCenter.x) ** 2 +
            (mousePos.current.y - elementCenter.y) ** 2
        );

        if (distance < 150) {
          const opacity = 1 - distance / 150;
          const gradient = ctx.createLinearGradient(
            mousePos.current.x,
            mousePos.current.y,
            elementCenter.x,
            elementCenter.y
          );
          gradient.addColorStop(0, colors.constellation.start);
          gradient.addColorStop(1, colors.constellation.end);

          ctx.beginPath();
          ctx.moveTo(mousePos.current.x, mousePos.current.y);
          ctx.lineTo(elementCenter.x, elementCenter.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = opacity * 1.5;
          ctx.stroke();

          // Draw small dot at element
          ctx.beginPath();
          ctx.arc(elementCenter.x, elementCenter.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = colors.constellation.end;
          ctx.fill();
        }
      });

      // Update and draw particles
      particles.current.forEach((particle) => {
        // Update angle
        particle.angle += particle.speed;

        // Velocity affects radius
        const velocityFactor = Math.min(speed / 10, 2);
        const dynamicRadius = particle.radius * (1 + velocityFactor * 0.5);

        // Calculate position
        const x = mousePos.current.x + Math.cos(particle.angle) * dynamicRadius;
        const y = mousePos.current.y + Math.sin(particle.angle) * dynamicRadius;

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        
        // Glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, particle.size * 3);
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, "rgba(212, 165, 165, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();

        // Solid particle
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      // Draw core cursor
      const coreSize = 6 + speed * 0.3;
      
      // Outer glow
      const outerGlow = ctx.createRadialGradient(
        mousePos.current.x,
        mousePos.current.y,
        0,
        mousePos.current.x,
        mousePos.current.y,
        coreSize * 4
      );
      outerGlow.addColorStop(0, colors.coreGlow);
      outerGlow.addColorStop(1, "rgba(212, 165, 165, 0)");
      ctx.beginPath();
      ctx.arc(mousePos.current.x, mousePos.current.y, coreSize * 4, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(mousePos.current.x, mousePos.current.y, coreSize, 0, Math.PI * 2);
      ctx.fillStyle = colors.core;
      ctx.fill();

      // Inner highlight
      ctx.beginPath();
      ctx.arc(
        mousePos.current.x - 1,
        mousePos.current.y - 1,
        coreSize * 0.5,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.fill();

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="cosmic-cursor-canvas pointer-events-none fixed inset-0 z-[9999]"
      style={{ mixBlendMode: "normal" }}
    />
  );
};

export default CosmicCursor;
