"use client";

import { useEffect, useState } from "react";
import styles from "./Cover.module.css";

interface CoverProps {
  monogram: string;
  inviteeName?: string;
  onOpen?: () => void;
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
    const t = setTimeout(() => setRemoved(true), 900);
    return () => clearTimeout(t);
  }, [hidden]);

  if (removed) return null;

  return (
    <div className={`${styles.cover} ${hidden ? styles.dismissed : ""}`} role="dialog" aria-label="Wedding invitation cover">
      <div className={styles.envelope}>
        <div className={styles.flapLeft} />
        <div className={styles.flapRight} />
        <div className={styles.seal}>{monogram}</div>
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
