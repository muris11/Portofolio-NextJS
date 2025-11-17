"use client";

import { useEffect, useState } from "react";

interface Particle {
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
}

export default function CTAParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only on client-side to avoid hydration mismatch
    const generatedParticles = [...Array(30)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 10}s`,
      animationDuration: `${10 + Math.random() * 10}s`,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-float"
          style={particle}
        ></div>
      ))}
    </div>
  );
}
