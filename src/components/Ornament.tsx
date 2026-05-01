interface OrnamentProps {
  className?: string;
}

export function Ornament({ className = "" }: OrnamentProps) {
  return (
    <div className={`divider ${className}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function FlourishLine() {
  return (
    <svg viewBox="0 0 200 24" aria-hidden="true" className="flourish">
      <path
        d="M2 12 C 30 0, 60 24, 100 12 C 140 0, 170 24, 198 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="100" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}
