import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";

interface WebNode {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  originalPosition: THREE.Vector3;
}

const SpiderWebMesh = () => {
  const meshRef = useRef<THREE.LineSegments>(null);
  const { theme } = useTheme();
  const { viewport } = useThree();
  const [mousePos, setMousePos] = useState(new THREE.Vector2(0, 0));

  // Create web nodes in a radial pattern
  const { nodes, connections } = useMemo(() => {
    const nodesList: WebNode[] = [];
    const connectionsList: number[][] = [];
    
    const rings = 8;
    const pointsPerRing = 12;
    const centerX = 0;
    const centerY = 0;
    
    // Center point
    const centerPos = new THREE.Vector3(centerX, centerY, 0);
    nodesList.push({
      position: centerPos.clone(),
      velocity: new THREE.Vector3(0, 0, 0),
      originalPosition: centerPos.clone(),
    });

    // Create concentric rings
    for (let ring = 1; ring <= rings; ring++) {
      const radius = ring * 1.2;
      const points = pointsPerRing + ring * 2;
      
      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const pos = new THREE.Vector3(x, y, 0);
        
        nodesList.push({
          position: pos.clone(),
          velocity: new THREE.Vector3(0, 0, 0),
          originalPosition: pos.clone(),
        });
      }
    }

    // Create connections between nodes
    let currentIndex = 1;
    
    // Connect center to first ring
    const firstRingPoints = pointsPerRing;
    for (let i = 0; i < firstRingPoints; i++) {
      connectionsList.push([0, currentIndex + i]);
    }
    
    // Connect rings
    for (let ring = 1; ring < rings; ring++) {
      const currentRingPoints = pointsPerRing + ring * 2;
      const nextRingPoints = pointsPerRing + (ring + 1) * 2;
      const currentStart = currentIndex;
      const nextStart = currentIndex + currentRingPoints;
      
      // Connect nodes within the ring
      for (let i = 0; i < currentRingPoints; i++) {
        const next = (i + 1) % currentRingPoints;
        connectionsList.push([currentStart + i, currentStart + next]);
      }
      
      // Connect to next ring
      if (ring < rings) {
        for (let i = 0; i < currentRingPoints; i++) {
          const ratio = i / currentRingPoints;
          const nextIndex = Math.floor(ratio * nextRingPoints);
          connectionsList.push([currentStart + i, nextStart + nextIndex]);
          
          // Add some cross-connections for spider web effect
          if (i % 2 === 0 && nextIndex + 1 < nextRingPoints) {
            connectionsList.push([currentStart + i, nextStart + nextIndex + 1]);
          }
        }
      }
      
      currentIndex += currentRingPoints;
    }
    
    // Connect last ring
    const lastRingPoints = pointsPerRing + rings * 2;
    const lastStart = currentIndex;
    for (let i = 0; i < lastRingPoints; i++) {
      const next = (i + 1) % lastRingPoints;
      connectionsList.push([lastStart + i, lastStart + next]);
    }

    return { nodes: nodesList, connections: connectionsList };
  }, []);

  const nodesRef = useRef(nodes);

  // Update mouse position
  useFrame(({ mouse }) => {
    setMousePos(new THREE.Vector2(
      mouse.x * viewport.width / 2,
      mouse.y * viewport.height / 2
    ));
  });

  // Animate web nodes
  useFrame((state) => {
    if (!meshRef.current) return;

    const positions = meshRef.current.geometry.attributes.position;
    const time = state.clock.elapsedTime;

    nodesRef.current.forEach((node, i) => {
      // Distance from mouse
      const dx = mousePos.x - node.position.x;
      const dy = mousePos.y - node.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Ripple effect from cursor
      const rippleStrength = Math.max(0, 1 - distance / 3);
      const ripple = Math.sin(distance * 2 - time * 3) * rippleStrength * 0.3;
      
      // Spring physics back to original position
      const spring = 0.02;
      const damping = 0.9;
      
      const toOriginalX = node.originalPosition.x - node.position.x;
      const toOriginalY = node.originalPosition.y - node.position.y;
      
      node.velocity.x += toOriginalX * spring;
      node.velocity.y += toOriginalY * spring;
      node.velocity.multiplyScalar(damping);
      
      // Add ripple displacement
      if (rippleStrength > 0.01) {
        const angle = Math.atan2(dy, dx);
        node.velocity.x += Math.cos(angle) * ripple * 0.5;
        node.velocity.y += Math.sin(angle) * ripple * 0.5;
      }
      
      node.position.add(node.velocity);
      
      // Gentle floating animation
      const floatX = Math.sin(time * 0.5 + i * 0.1) * 0.02;
      const floatY = Math.cos(time * 0.3 + i * 0.15) * 0.02;
      
      positions.setXYZ(
        i,
        node.position.x + floatX,
        node.position.y + floatY,
        node.position.z
      );
    });

    positions.needsUpdate = true;
  });

  // Create geometry
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(nodes.length * 3);
    
    nodes.forEach((node, i) => {
      positions[i * 3] = node.position.x;
      positions[i * 3 + 1] = node.position.y;
      positions[i * 3 + 2] = node.position.z;
    });
    
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const indices: number[] = [];
    connections.forEach(([a, b]) => {
      indices.push(a, b);
    });
    
    geom.setIndex(indices);
    
    return geom;
  }, [nodes, connections]);

  const color = theme === "dark" 
    ? new THREE.Color("hsl(15, 60%, 68%)") 
    : new THREE.Color("hsl(15, 60%, 60%)");

  return (
    <lineSegments ref={meshRef} geometry={geometry}>
      <lineBasicMaterial 
        color={color} 
        transparent 
        opacity={theme === "dark" ? 0.35 : 0.25}
        linewidth={2}
        depthTest={false}
      />
    </lineSegments>
  );
};

const SpiderWeb = () => {
  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 -z-[5] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <SpiderWebMesh />
      </Canvas>
    </div>
  );
};

export default SpiderWeb;
