"use client";

import { useEffect, useState } from "react";
import { format, parseISO, intervalToDuration } from "date-fns";
import { Petals } from "./Petals";
import type { CoupleInfo } from "@/lib/types";
import styles from "./Hero.module.css";

interface HeroProps {
  couple: CoupleInfo;
}

interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getParts(target: Date): CountdownParts {
  const now = new Date();
  if (target <= now) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const d = intervalToDuration({ start: now, end: target });
  const days = (d.years ?? 0) * 365 + (d.months ?? 0) * 30 + (d.days ?? 0);
  return {
    days,
    hours: d.hours ?? 0,
    minutes: d.minutes ?? 0,
    seconds: d.seconds ?? 0,
  };
}

function BotanicSpray() {
  return (
    <svg viewBox="0 0 220 240" className="" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 220 C 60 180, 80 140, 90 100 S 130 30, 180 20" />
        <path d="M70 170 q 12 -10 30 -8" />
        <path d="M85 140 q 14 -12 32 -8" />
        <path d="M100 110 q 18 -14 38 -8" />
        <path d="M120 80 q 18 -14 40 -10" />
        <path d="M75 175 q 6 -8 18 -10 q -2 10 -18 10 z" fill="currentColor" fillOpacity="0.35" />
        <path d="M92 145 q 8 -10 22 -10 q -2 12 -22 10 z" fill="currentColor" fillOpacity="0.35" />
        <path d="M108 115 q 10 -12 26 -10 q -2 14 -26 10 z" fill="currentColor" fillOpacity="0.35" />
        <path d="M128 85 q 10 -12 28 -10 q -4 14 -28 10 z" fill="currentColor" fillOpacity="0.35" />
        <circle cx="180" cy="20" r="6" fill="currentColor" fillOpacity="0.5" />
        <circle cx="180" cy="20" r="2" fill="currentColor" />
        <circle cx="160" cy="44" r="4.5" fill="currentColor" fillOpacity="0.5" />
        <circle cx="160" cy="44" r="1.5" fill="currentColor" />
      </g>
    </svg>
  );
}

export function Hero({ couple }: HeroProps) {
  const target = (() => {
    try { return parseISO(couple.weddingDate); } catch { return new Date(); }
  })();

  const formattedDate = (() => {
    try { return format(target, "d MMMM yyyy"); } catch { return couple.weddingDate; }
  })();

  const [parts, setParts] = useState<CountdownParts>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setParts(getParts(target));
    const t = setInterval(() => setParts(getParts(target)), 1000);
    return () => clearInterval(t);
  }, [target]);

  const usePhoto = couple.heroImageUrl && couple.heroImageUrl.trim().length > 0;

  return (
    <section className={styles.hero} id="top">
      <div
        className={`${styles.photo} ${usePhoto ? "" : styles.photoFallback}`}
        style={usePhoto ? { backgroundImage: `url("${couple.heroImageUrl}")` } : undefined}
      />
      <div className={styles.wash} />
      <div className={`${styles.botanicCorner} ${styles.tl}`}><BotanicSpray /></div>
      <div className={`${styles.botanicCorner} ${styles.br}`}><BotanicSpray /></div>

      <Petals count={16} />

      <div className={styles.inner}>
        <p className={styles.tagline}>{couple.tagline}</p>
        <h1 className={styles.names}>
          {couple.bride}
          <span className={styles.amp}>&amp;</span>
          {couple.groom}
        </h1>
        <div className={styles.date}>
          <span>{formattedDate}</span>
        </div>
        <div className={styles.countdown} aria-label="Countdown">
          {([
            ["Days", parts.days],
            ["Hours", parts.hours],
            ["Minutes", parts.minutes],
            ["Seconds", parts.seconds],
          ] as const).map(([label, value]) => (
            <div key={label} className={styles.timeBox}>
              <div className={styles.timeNum}>{String(value).padStart(2, "0")}</div>
              <span className={styles.timeLabel}>{label}</span>
            </div>
          ))}
        </div>
        <a className={`btn ${styles.cta}`} href="#rsvp">Confirm Attendance</a>
      </div>
      <div className={styles.scroll}>Scroll</div>
    </section>
  );
}
