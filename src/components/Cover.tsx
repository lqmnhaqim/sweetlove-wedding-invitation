"use client";

import { useEffect, useState } from "react";
import styles from "./Cover.module.css";

interface CoverProps {
  monogram: string;
  inviteeName?: string;
  onOpen?: () => void;
}

function SealWreath() {
  return (
    <svg viewBox="0 0 64 64" className={styles.sealWreath} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        {/* left vine */}
        <path d="M14 30 C 12 24, 14 18, 20 14" />
        <path d="M16 26 q -2 -1 -3 -3" />
        <path d="M18 22 q -2 -1 -3 -2" />
        <path d="M20 18 q -2 -1 -3 -1" />
        {/* right vine */}
        <path d="M50 30 C 52 24, 50 18, 44 14" />
        <path d="M48 26 q 2 -1 3 -3" />
        <path d="M46 22 q 2 -1 3 -2" />
        <path d="M44 18 q 2 -1 3 -1" />
        {/* leaves */}
        <path d="M16 28 q 3 -2 5 0 q -2 2 -5 0 z" fill="currentColor" fillOpacity="0.45" />
        <path d="M18 23 q 3 -2 5 0 q -2 2 -5 0 z" fill="currentColor" fillOpacity="0.45" />
        <path d="M48 28 q -3 -2 -5 0 q 2 2 5 0 z" fill="currentColor" fillOpacity="0.45" />
        <path d="M46 23 q -3 -2 -5 0 q 2 2 5 0 z" fill="currentColor" fillOpacity="0.45" />
        {/* small flowers */}
        <circle cx="22" cy="12" r="1.6" fill="currentColor" fillOpacity="0.55" />
        <circle cx="42" cy="12" r="1.6" fill="currentColor" fillOpacity="0.55" />
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
      <div className={styles.envelope}>
        <div className={styles.flapTop} />
        <div className={styles.flapShadow} />
        <div className={styles.seal}>
          <div className={styles.sealInner}>
            <SealWreath />
            <span className={styles.monogram}>{monogram}</span>
          </div>
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
    </div>
  );
}
