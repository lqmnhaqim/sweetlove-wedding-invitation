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
  const days =
    (d.years ?? 0) * 365 + (d.months ?? 0) * 30 + (d.days ?? 0);
  return {
    days,
    hours: d.hours ?? 0,
    minutes: d.minutes ?? 0,
    seconds: d.seconds ?? 0,
  };
}

export function Hero({ couple }: HeroProps) {
  const target = (() => {
    try {
      return parseISO(couple.weddingDate);
    } catch {
      return new Date();
    }
  })();

  const formattedDate = (() => {
    try {
      return format(target, "d MMMM yyyy");
    } catch {
      return couple.weddingDate;
    }
  })();

  const [parts, setParts] = useState<CountdownParts>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setParts(getParts(target));
    const t = setInterval(() => setParts(getParts(target)), 1000);
    return () => clearInterval(t);
  }, [target]);

  return (
    <section className={styles.hero} id="top">
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
