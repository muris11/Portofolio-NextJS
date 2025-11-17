"use client";

import { useEffect, useState } from "react";

interface Particle {
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
}

export default function BackgroundParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only on client-side to avoid hydration mismatch
    const generatedParticles = [...Array(60)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 15}s`,
      animationDuration: `${15 + Math.random() * 15}s`,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float"
          style={particle}
        ></div>
      ))}
    </div>
  );
}
