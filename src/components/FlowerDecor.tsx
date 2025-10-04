import { FC } from "react";

interface FlowerDecorProps {
  variant?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  size?: number;
}

const FlowerDecor: FC<FlowerDecorProps> = ({ variant = 1, className = "", size = 60 }) => {
  const flowers = {
    1: (
      // Simple stem flower
      <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 150 L50 60" stroke="hsl(var(--secondary))" strokeWidth="2" opacity="0.6"/>
        <ellipse cx="50" cy="40" rx="25" ry="12" fill="hsl(var(--accent))" opacity="0.7"/>
        <circle cx="50" cy="40" r="8" fill="hsl(var(--foreground))" opacity="0.4"/>
        <ellipse cx="30" cy="70" rx="12" ry="6" fill="hsl(var(--secondary))" opacity="0.5" transform="rotate(-30 30 70)"/>
        <ellipse cx="70" cy="70" rx="12" ry="6" fill="hsl(var(--secondary))" opacity="0.5" transform="rotate(30 70 70)"/>
      </svg>
    ),
    2: (
      // Cluster flower
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="50" r="6" fill="hsl(var(--accent))" opacity="0.8"/>
        <circle cx="50" cy="45" r="5" fill="hsl(var(--accent))" opacity="0.7"/>
        <circle cx="70" cy="45" r="5" fill="hsl(var(--accent))" opacity="0.7"/>
        <circle cx="55" cy="55" r="5" fill="hsl(var(--accent))" opacity="0.7"/>
        <circle cx="65" cy="55" r="5" fill="hsl(var(--accent))" opacity="0.7"/>
        <ellipse cx="40" cy="60" rx="10" ry="5" fill="hsl(var(--secondary))" opacity="0.5" transform="rotate(-20 40 60)"/>
        <ellipse cx="80" cy="60" rx="10" ry="5" fill="hsl(var(--secondary))" opacity="0.5" transform="rotate(20 80 60)"/>
      </svg>
    ),
    3: (
      // Wide petal flower
      <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="40" rx="35" ry="20" fill="hsl(var(--accent))" opacity="0.6"/>
        <circle cx="60" cy="40" r="8" fill="hsl(var(--foreground))" opacity="0.5"/>
        <path d="M60 40 L60 75" stroke="hsl(var(--secondary))" strokeWidth="2" opacity="0.6"/>
      </svg>
    ),
    4: (
      // Delicate branches
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 120 L50 30 Q50 20 55 15" stroke="hsl(var(--secondary))" strokeWidth="1.5" opacity="0.5"/>
        <circle cx="40" cy="50" r="4" fill="hsl(var(--accent))" opacity="0.7"/>
        <circle cx="60" cy="40" r="3" fill="hsl(var(--accent))" opacity="0.6"/>
        <circle cx="55" cy="25" r="3" fill="hsl(var(--accent))" opacity="0.7"/>
        <circle cx="45" cy="70" r="4" fill="hsl(var(--accent))" opacity="0.6"/>
      </svg>
    ),
    5: (
      // Multi-petal bloom
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="50" rx="15" ry="25" fill="hsl(var(--accent))" opacity="0.5" transform="rotate(0 50 50)"/>
        <ellipse cx="50" cy="50" rx="15" ry="25" fill="hsl(var(--accent))" opacity="0.5" transform="rotate(60 50 50)"/>
        <ellipse cx="50" cy="50" rx="15" ry="25" fill="hsl(var(--accent))" opacity="0.5" transform="rotate(120 50 50)"/>
        <circle cx="50" cy="50" r="8" fill="hsl(var(--foreground))" opacity="0.4"/>
        <ellipse cx="30" cy="70" rx="12" ry="5" fill="hsl(var(--secondary))" opacity="0.4" transform="rotate(-30 30 70)"/>
        <ellipse cx="70" cy="70" rx="12" ry="5" fill="hsl(var(--secondary))" opacity="0.4" transform="rotate(30 70 70)"/>
      </svg>
    ),
    6: (
      // Simple daisy
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="40" rx="8" ry="16" fill="hsl(var(--accent))" opacity="0.6"/>
        <ellipse cx="40" cy="40" rx="16" ry="8" fill="hsl(var(--accent))" opacity="0.6"/>
        <ellipse cx="40" cy="40" rx="12" ry="12" fill="hsl(var(--accent))" opacity="0.5" transform="rotate(45 40 40)"/>
        <ellipse cx="40" cy="40" rx="12" ry="12" fill="hsl(var(--accent))" opacity="0.5" transform="rotate(-45 40 40)"/>
        <circle cx="40" cy="40" r="6" fill="hsl(var(--foreground))" opacity="0.5"/>
      </svg>
    ),
  };

  return (
    <div className={`inline-block ${className}`} style={{ width: size, height: size }}>
      {flowers[variant]}
    </div>
  );
};

export default FlowerDecor;
