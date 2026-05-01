"use client";

import { useEffect, useState } from "react";

interface Petal {
  left: string;
  size: number;
  delay: string;
  duration: string;
  rotate: number;
}

export function Petals({ count = 14 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const next: Petal[] = Array.from({ length: count }).map(() => ({
      left: `${Math.random() * 100}%`,
      size: 10 + Math.random() * 18,
      delay: `${(Math.random() * 14).toFixed(2)}s`,
      duration: `${(11 + Math.random() * 10).toFixed(2)}s`,
      rotate: Math.random() * 360,
    }));
    setPetals(next);
  }, [count]);

  if (petals.length === 0) return null;

  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {petals.map((p, idx) => (
        <svg
          key={idx}
          className="petal"
          viewBox="0 0 24 24"
          style={{
            left: p.left,
            top: "-10vh",
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          <path
            d="M12 2 C 16 6, 18 10, 12 22 C 6 10, 8 6, 12 2 Z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  );
}
