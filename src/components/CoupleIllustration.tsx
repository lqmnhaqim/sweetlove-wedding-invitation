"use client";

interface CoupleIllustrationProps {
  className?: string;
}

/* Simple stylized SVG of a couple holding hands inside a dotted heart frame.
   Original line-art \u2014 evokes the cute/cozy feel of the reference design without copying it. */
export function CoupleIllustration({ className }: CoupleIllustrationProps) {
  return (
    <svg
      viewBox="0 0 360 360"
      className={className}
      aria-hidden="true"
      role="img"
    >
      <defs>
        <linearGradient id="ci-bgHeart" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fcefdc" />
          <stop offset="100%" stopColor="#f0d9b8" />
        </linearGradient>
        <linearGradient id="ci-brideDress" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f1d6c4" />
        </linearGradient>
        <linearGradient id="ci-groomSuit" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9c2a2a" />
          <stop offset="100%" stopColor="#6b1414" />
        </linearGradient>
        <linearGradient id="ci-skinB" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fcd9bd" />
          <stop offset="100%" stopColor="#f1bf9c" />
        </linearGradient>
        <linearGradient id="ci-skinG" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f5c198" />
          <stop offset="100%" stopColor="#e0a075" />
        </linearGradient>
      </defs>

      {/* Soft heart-shaped backdrop with dotted outline */}
      <path
        d="M180 320 C 60 240, 30 160, 60 110 C 85 70, 150 70, 180 120 C 210 70, 275 70, 300 110 C 330 160, 300 240, 180 320 Z"
        fill="url(#ci-bgHeart)"
      />
      <path
        d="M180 320 C 60 240, 30 160, 60 110 C 85 70, 150 70, 180 120 C 210 70, 275 70, 300 110 C 330 160, 300 240, 180 320 Z"
        fill="none"
        stroke="#8c1d1d"
        strokeWidth="1.6"
        strokeDasharray="2 5"
        strokeOpacity="0.55"
      />

      {/* Scattered tiny hearts inside the frame */}
      <g fill="#8c1d1d" opacity="0.75">
        <path d="M82 130 a3 3 0 0 1 6 0 a3 3 0 0 1 6 0 q0 5 -6 9 q-6 -4 -6 -9 z" />
        <path d="M270 145 a3 3 0 0 1 6 0 a3 3 0 0 1 6 0 q0 5 -6 9 q-6 -4 -6 -9 z" opacity="0.6" />
        <path d="M70 220 a2.4 2.4 0 0 1 4.8 0 a2.4 2.4 0 0 1 4.8 0 q0 4 -4.8 7 q-4.8 -3 -4.8 -7 z" opacity="0.5" />
        <path d="M286 240 a2 2 0 0 1 4 0 a2 2 0 0 1 4 0 q0 3.6 -4 6 q-4 -2.4 -4 -6 z" opacity="0.6" />
      </g>

      {/* Bride (left figure) */}
      <g>
        {/* Hair behind */}
        <path d="M122 175 q -8 -36 12 -56 q 22 -22 50 -8 q 14 8 16 28 q 6 24 -6 50 q -38 -2 -72 -14 z" fill="#f5e2c0" />
        {/* Veil */}
        <path d="M120 170 q 18 -52 60 -52 q 18 0 30 12 q -16 6 -22 18 q -8 -8 -22 -8 q -28 0 -46 30 z" fill="#fff7e8" stroke="#d6c4a4" strokeWidth="1" opacity="0.95" />
        {/* Face */}
        <ellipse cx="160" cy="180" rx="26" ry="30" fill="url(#ci-skinB)" />
        {/* Closed eyes (smiling) */}
        <path d="M148 178 q 4 -3 8 0" fill="none" stroke="#3a2418" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M164 178 q 4 -3 8 0" fill="none" stroke="#3a2418" strokeWidth="1.6" strokeLinecap="round" />
        {/* Cheek blush */}
        <circle cx="148" cy="190" r="3.2" fill="#e9a89a" opacity="0.65" />
        <circle cx="172" cy="190" r="3.2" fill="#e9a89a" opacity="0.65" />
        {/* Smile */}
        <path d="M154 196 q 6 6 12 0" fill="none" stroke="#3a2418" strokeWidth="1.4" strokeLinecap="round" />
        {/* Hair side strands */}
        <path d="M134 166 q -6 28 4 56" fill="none" stroke="#d8b88a" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
        <path d="M186 168 q 8 24 0 56" fill="none" stroke="#d8b88a" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
        {/* Body — wedding gown */}
        <path d="M132 210 q 6 36 -8 80 q 36 8 64 4 q 12 -34 6 -82 q -22 12 -62 -2 z" fill="url(#ci-brideDress)" stroke="#d8b9a4" strokeWidth="1.2" />
        {/* Bouquet hint */}
        <g transform="translate(186, 244)">
          <circle cx="0" cy="0" r="6" fill="#8c1d1d" opacity="0.85" />
          <circle cx="-5" cy="-2" r="4" fill="#b34646" opacity="0.85" />
          <circle cx="5" cy="-1" r="4.5" fill="#b34646" opacity="0.85" />
          <circle cx="-2" cy="-6" r="4" fill="#a83434" opacity="0.85" />
          <path d="M0 4 q -2 8 -4 14" stroke="#4a5d2a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M-4 6 q 0 6 -3 10" stroke="#4a5d2a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </g>
      </g>

      {/* Groom (right figure) */}
      <g>
        {/* Hair */}
        <path d="M212 158 q 6 -30 26 -36 q 22 -8 36 8 q 12 14 8 32 q -36 8 -70 -4 z" fill="#3a2418" />
        {/* Face */}
        <ellipse cx="240" cy="180" rx="24" ry="28" fill="url(#ci-skinG)" />
        {/* Eyes */}
        <path d="M228 178 q 4 -3 8 0" fill="none" stroke="#1f1208" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M244 178 q 4 -3 8 0" fill="none" stroke="#1f1208" strokeWidth="1.6" strokeLinecap="round" />
        {/* Cheek blush */}
        <circle cx="228" cy="190" r="2.6" fill="#d68070" opacity="0.55" />
        <circle cx="252" cy="190" r="2.6" fill="#d68070" opacity="0.55" />
        {/* Smile */}
        <path d="M232 196 q 8 6 16 0" fill="none" stroke="#1f1208" strokeWidth="1.4" strokeLinecap="round" />
        {/* Suit body */}
        <path d="M214 210 q -8 36 6 84 q 32 6 60 -2 q 6 -36 -2 -82 q -22 12 -64 0 z" fill="url(#ci-groomSuit)" stroke="#4a0e0e" strokeWidth="1.2" />
        {/* Lapel + collar */}
        <path d="M236 214 l 6 14 l -6 14 l -6 -14 z" fill="#fff7e8" />
        <path d="M232 214 l 4 16" stroke="#fff7e8" strokeWidth="1" fill="none" />
        <path d="M244 214 l -4 16" stroke="#fff7e8" strokeWidth="1" fill="none" />
        {/* Bowtie */}
        <path d="M232 214 l -6 -4 l 0 8 z M244 214 l 6 -4 l 0 8 z" fill="#1f0808" />
        <rect x="234" y="211" width="8" height="6" fill="#1f0808" />
      </g>

      {/* Hands clasped between the two figures */}
      <g>
        <ellipse cx="195" cy="248" rx="8" ry="6" fill="url(#ci-skinB)" stroke="#a87a5e" strokeWidth="0.8" />
        <ellipse cx="208" cy="248" rx="8" ry="6" fill="url(#ci-skinG)" stroke="#a87a5e" strokeWidth="0.8" />
        <path d="M188 246 q 14 -2 28 0" stroke="#8c1d1d" strokeWidth="1.2" fill="none" />
      </g>

      {/* Tiny floating heart between heads */}
      <g transform="translate(200, 130)" fill="#8c1d1d">
        <path d="M0 6 a4 4 0 0 1 8 0 a4 4 0 0 1 8 0 q0 6 -8 11 q-8 -5 -8 -11 z" />
      </g>
    </svg>
  );
}
