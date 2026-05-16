"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  opacity: number;
  rotation: number;
}

export default function CherryBlossom() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate petals only on the client side to avoid hydration mismatch
    const generatePetals = () => {
      // Amount of petals based on screen width roughly
      const count = window.innerWidth < 768 ? 20 : 40;
      
      return Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100, // 0 to 100vw
        animationDuration: Math.random() * 6 + 6, // 6 to 12 seconds
        animationDelay: Math.random() * 5, // 0 to 5 seconds
        size: Math.random() * 12 + 8, // 8px to 20px
        opacity: Math.random() * 0.5 + 0.3, // 0.3 to 0.8 opacity
        rotation: Math.random() * 360, // random start rotation
      }));
    };

    setPetals(generatePetals());

    // Optional: handle window resize if you want to regenerate, but usually not needed.
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-[-10%] bg-rose-300 dark:bg-rose-400/50 shadow-[0_0_8px_rgba(251,113,133,0.6)] animate-fall"
          style={{
            left: `${petal.left}vw`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.3}px`,
            opacity: petal.opacity,
            // 벚꽃잎 모양을 위한 radius
            borderTopLeftRadius: '50%',
            borderBottomRightRadius: '50%',
            borderTopRightRadius: '10%',
            borderBottomLeftRadius: '10%',
            animationDuration: `${petal.animationDuration}s`,
            animationDelay: `${petal.animationDelay}s`,
            transform: `rotate(${petal.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
