"use client";

import { useEffect, useId, useState } from "react";
import styles from "./Cover.module.css";

interface CoverProps {
  monogram: string;
  inviteeName?: string;
  onOpen?: () => void;
}

/* Subtle noisy paper grain rendered as an inline SVG so we don't ship an asset. */
function PaperTexture() {
  return (
    <svg
      className={styles.paperTexture}
      aria-hidden="true"
      preserveAspectRatio="none"
      width="100%"
      height="100%"
    >
      <filter id="paperNoise" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.42
                  0 0 0 0 0.30
                  0 0 0 0 0.18
                  0 0 0 0.45 0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#paperNoise)" />
    </svg>
  );
}

/* Repeating embossed floral motif on the parchment. */
function FloralPattern() {
  return (
    <div
      className={styles.floralPattern}
      aria-hidden="true"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 320'>" +
          "<g fill='none' stroke='%237a5a3a' stroke-width='0.9' stroke-linecap='round'>" +
          "<path d='M40 60 q 18 -22 38 -10 q -8 22 -38 10 z' fill='%237a5a3a' fill-opacity='0.35'/>" +
          "<path d='M80 80 q 14 4 14 22' />" +
          "<path d='M82 90 q 6 -2 12 0' />" +
          "<path d='M84 100 q 6 -2 12 0' />" +
          "<path d='M220 120 q -22 -10 -32 8 q 22 12 32 -8 z' fill='%237a5a3a' fill-opacity='0.3'/>" +
          "<path d='M186 130 q -8 6 -14 18' />" +
          "<path d='M180 140 q -6 0 -10 4' />" +
          "<path d='M150 220 q 18 -8 28 6 q -16 16 -28 -6 z' fill='%237a5a3a' fill-opacity='0.32'/>" +
          "<path d='M178 232 q 4 8 0 18' />" +
          "<path d='M60 240 q 16 -10 26 4 q -16 14 -26 -4 z' fill='%237a5a3a' fill-opacity='0.28'/>" +
          "<path d='M260 60 q -16 -8 -26 6 q 16 14 26 -6 z' fill='%237a5a3a' fill-opacity='0.28'/>" +
          "</g></svg>\")",
      }}
    />
  );
}

interface SealSvgProps {
  monogram: string;
}

/* Sculpted wax seal — irregular blob with embossed wreath + monogram.
   Specular lighting filter renders the embossed pieces as raised, glossy ridges. */
function SealSvg({ monogram }: SealSvgProps) {
  const id = useId().replace(/:/g, "");
  const embossId = `emboss-${id}`;
  const waxGradId = `wax-${id}`;
  const glossGradId = `gloss-${id}`;
  const rimGradId = `rim-${id}`;

  return (
    <svg viewBox="0 0 400 400" className={styles.sealSvg} aria-hidden="true">
      <defs>
        {/* Wax body color — dusty rose with slightly darker pool toward the bottom-right */}
        <radialGradient id={waxGradId} cx="38%" cy="32%" r="80%">
          <stop offset="0%" stopColor="#e3a89c" />
          <stop offset="50%" stopColor="#cf8e7f" />
          <stop offset="80%" stopColor="#a86857" />
          <stop offset="100%" stopColor="#7d4538" />
        </radialGradient>

        {/* Top-left highlight (specular gloss on the seal) */}
        <radialGradient id={glossGradId} cx="32%" cy="22%" r="48%">
          <stop offset="0%" stopColor="rgba(255, 235, 222, 0.85)" />
          <stop offset="60%" stopColor="rgba(255, 235, 222, 0)" />
        </radialGradient>

        {/* Outer wax rim (slightly raised lip + indent inside) */}
        <radialGradient id={rimGradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0, 0, 0, 0)" />
          <stop offset="78%" stopColor="rgba(0, 0, 0, 0)" />
          <stop offset="86%" stopColor="rgba(255, 230, 215, 0.4)" />
          <stop offset="92%" stopColor="rgba(60, 20, 12, 0.25)" />
          <stop offset="100%" stopColor="rgba(60, 20, 12, 0)" />
        </radialGradient>

        {/* Emboss filter — soft Gaussian blur + specular lighting + composite back. */}
        <filter id={embossId} x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.6" result="blur" />
          <feSpecularLighting
            in="blur"
            surfaceScale="6"
            specularConstant="1.4"
            specularExponent="22"
            lightingColor="#ffe9d8"
            result="spec"
          >
            <feDistantLight azimuth="135" elevation="55" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOnAlpha" />
          <feComposite
            in="SourceGraphic"
            in2="specOnAlpha"
            operator="arithmetic"
            k1="0" k2="1" k3="1" k4="0"
            result="lit"
          />
          {/* Add a soft dark shadow on the bottom-right of each embossed shape */}
          <feOffset in="SourceAlpha" dx="2" dy="2.5" result="offShadow" />
          <feGaussianBlur in="offShadow" stdDeviation="1.6" result="shadowBlur" />
          <feComposite in="shadowBlur" in2="SourceAlpha" operator="out" result="shadowOnly" />
          <feColorMatrix
            in="shadowOnly"
            type="matrix"
            values="0 0 0 0 0.18
                    0 0 0 0 0.06
                    0 0 0 0 0.04
                    0 0 0 0.45 0"
            result="shadowDark"
          />
          <feMerge>
            <feMergeNode in="shadowDark" />
            <feMergeNode in="lit" />
          </feMerge>
        </filter>
      </defs>

      {/* Irregular wax-blob shape — slightly imperfect circle with petal-like edges */}
      <path
        d="M 200 26
           C 264 24, 320 60, 354 116
           C 384 168, 380 232, 354 280
           C 326 332, 268 372, 204 374
           C 138 376, 80 344, 50 290
           C 22 240, 18 178, 46 124
           C 76 70, 132 30, 200 26 Z"
        fill={`url(#${waxGradId})`}
      />
      {/* Soft gloss highlight overlay */}
      <path
        d="M 200 26
           C 264 24, 320 60, 354 116
           C 384 168, 380 232, 354 280
           C 326 332, 268 372, 204 374
           C 138 376, 80 344, 50 290
           C 22 240, 18 178, 46 124
           C 76 70, 132 30, 200 26 Z"
        fill={`url(#${glossGradId})`}
      />
      {/* Rim accent */}
      <path
        d="M 200 26
           C 264 24, 320 60, 354 116
           C 384 168, 380 232, 354 280
           C 326 332, 268 372, 204 374
           C 138 376, 80 344, 50 290
           C 22 240, 18 178, 46 124
           C 76 70, 132 30, 200 26 Z"
        fill={`url(#${rimGradId})`}
      />

      {/* Embossed content — floral wreath + monogram */}
      <g filter={`url(#${embossId})`} fill={`url(#${waxGradId})`}>
        {/* Floral wreath — pair of curved sprigs forming a horizontal arrangement at the top. */}
        <g transform="translate(200, 130)">
          {/* Left sprig: curved stem with leaves + a bloom */}
          <path d="M -8 -2 C -28 -8, -54 -22, -78 -16" stroke={`url(#${waxGradId})`} strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* leaves on left sprig */}
          <path d="M -22 -7 q -10 -10 -22 -2 q 8 12 22 2 z" />
          <path d="M -42 -14 q -8 -12 -20 -6 q 6 14 20 6 z" />
          <path d="M -34 -22 q -2 -16 -16 -16 q 0 16 16 16 z" />
          <path d="M -56 -22 q -2 -14 -14 -14 q 0 14 14 14 z" />
          {/* small bloom on left tip */}
          <g transform="translate(-78, -18)">
            <ellipse cx="0" cy="-6" rx="4.5" ry="7" />
            <ellipse cx="-6" cy="-2" rx="7" ry="4.5" />
            <ellipse cx="-2" cy="4" rx="5" ry="7" />
            <ellipse cx="5" cy="0" rx="6" ry="4" />
            <circle cx="0" cy="-1" r="3" />
          </g>

          {/* Right sprig: mirrored */}
          <path d="M 8 -2 C 28 -8, 54 -22, 78 -16" stroke={`url(#${waxGradId})`} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 22 -7 q 10 -10 22 -2 q -8 12 -22 2 z" />
          <path d="M 42 -14 q 8 -12 20 -6 q -6 14 -20 6 z" />
          <path d="M 34 -22 q 2 -16 16 -16 q 0 16 -16 16 z" />
          <path d="M 56 -22 q 2 -14 14 -14 q 0 14 -14 14 z" />
          <g transform="translate(78, -18)">
            <ellipse cx="0" cy="-6" rx="4.5" ry="7" />
            <ellipse cx="6" cy="-2" rx="7" ry="4.5" />
            <ellipse cx="2" cy="4" rx="5" ry="7" />
            <ellipse cx="-5" cy="0" rx="6" ry="4" />
            <circle cx="0" cy="-1" r="3" />
          </g>

          {/* Center small bloom (where stems meet) */}
          <g>
            <ellipse cx="0" cy="-12" rx="5" ry="7" />
            <ellipse cx="-6" cy="-6" rx="7" ry="5" />
            <ellipse cx="6" cy="-6" rx="7" ry="5" />
            <ellipse cx="0" cy="0" rx="5" ry="7" />
            <circle cx="0" cy="-6" r="3.2" />
          </g>
        </g>

        {/* Embossed monogram — large script. Filtered through emboss for a 3D piped-icing look. */}
        <text
          x="200"
          y="280"
          textAnchor="middle"
          fontFamily="'Great Vibes', cursive"
          fontSize="150"
          fontStyle="italic"
          fill={`url(#${waxGradId})`}
        >
          {monogram}
        </text>
      </g>
    </svg>
  );
}

export function Cover({ monogram, inviteeName, onOpen }: CoverProps) {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (!hidden) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [hidden]);

  useEffect(() => {
    if (!hidden) return;
    const t = setTimeout(() => setRemoved(true), 1000);
    return () => clearTimeout(t);
  }, [hidden]);

  if (removed) return null;

  return (
    <div className={`${styles.cover} ${hidden ? styles.dismissed : ""}`} role="dialog" aria-label="Wedding invitation cover">
      <PaperTexture />
      <FloralPattern />
      <div className={styles.flapLines} />

      <div className={styles.sealWrap}>
        <SealSvg monogram={monogram} />
      </div>

      <div className={styles.coverContent}>
        <span className={styles.invited}>You're Invited</span>
        <span className={styles.eyebrow}>
          {inviteeName ? `Dear ${inviteeName},` : "Dear Friend,"}
        </span>
        <button
          type="button"
          className={styles.openBtn}
          onClick={() => {
            setHidden(true);
            onOpen?.();
          }}
        >
          Open Invitation
        </button>
      </div>
    </div>
  );
}
