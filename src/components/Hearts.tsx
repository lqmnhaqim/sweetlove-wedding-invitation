"use client";

import { useMemo } from "react";

export interface HeartsProps {
  /** Total number of hearts to scatter. */
  count?: number;
  /** Vertical bands the hearts spread across (0..1 mapped to top..bottom of parent). */
  spread?: { top?: number; bottom?: number };
  /** Optional extra className. Hearts are absolutely positioned and pointer-events: none. */
  className?: string;
}

/* Decorative scattered burgundy hearts. Mix of solid + outlined hand-drawn-ish strokes.
   Animation: gentle pulse + slight rotation. Pure decorative \u2014 inert. */
export function Hearts({ count = 14, spread, className }: HeartsProps) {
  const top = spread?.top ?? 0;
  const bottom = spread?.bottom ?? 1;

  const items = useMemo(() => {
    const seed = (n: number) => {
      const x = Math.sin(n * 9999) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: count }, (_, i) => {
      const r1 = seed(i + 1);
      const r2 = seed(i + 7);
      const r3 = seed(i + 13);
      const r4 = seed(i + 21);
      const r5 = seed(i + 31);
      return {
        left: `${(r1 * 100).toFixed(2)}%`,
        top: `${(top * 100 + r2 * (bottom - top) * 100).toFixed(2)}%`,
        size: 14 + Math.round(r3 * 28),
        rot: Math.round((r4 - 0.5) * 50),
        delay: (r5 * 4).toFixed(2),
        variant: r1 > 0.55 ? "solid" : "outline",
        opacity: 0.35 + r4 * 0.5,
      } as const;
    });
  }, [count, top, bottom]);

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {items.map((it, idx) => (
        <svg
          key={idx}
          viewBox="0 0 24 24"
          width={it.size}
          height={it.size}
          style={{
            position: "absolute",
            left: it.left,
            top: it.top,
            color: "var(--color-heart)",
            opacity: it.opacity,
            ["--rot" as string]: `${it.rot}deg`,
            transform: `rotate(${it.rot}deg)`,
            animation: `heartPulse ${4 + (idx % 5)}s ease-in-out ${it.delay}s infinite`,
            filter: "drop-shadow(0 1px 1px rgba(43, 29, 26, 0.12))",
          }}
        >
          {it.variant === "solid" ? (
            <path
              d="M12 21s-7.5-4.7-9.5-9.2C1.1 8.7 3.1 5.5 6.4 5.5c1.9 0 3.5 1 4.6 2.4 1.1-1.5 2.7-2.4 4.6-2.4 3.3 0 5.3 3.2 3.9 6.3-2 4.5-7.5 9.2-7.5 9.2z"
              fill="currentColor"
            />
          ) : (
            <path
              d="M12 21s-7.5-4.7-9.5-9.2C1.1 8.7 3.1 5.5 6.4 5.5c1.9 0 3.5 1 4.6 2.4 1.1-1.5 2.7-2.4 4.6-2.4 3.3 0 5.3 3.2 3.9 6.3-2 4.5-7.5 9.2-7.5 9.2z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          )}
        </svg>
      ))}
    </div>
  );
}
