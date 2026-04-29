"use client";

import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Hearts } from "./Hearts";
import { Petals } from "./Petals";
import { CoupleIllustration } from "./CoupleIllustration";
import { useLocale } from "@/lib/i18n";
import type { CoupleInfo } from "@/lib/types";
import styles from "./Hero.module.css";

interface HeroProps {
  couple: CoupleInfo;
}

export function Hero({ couple }: HeroProps) {
  const [target, setTarget] = useState<Date | null>(null);
  const { t, dateLocale } = useLocale();

  useEffect(() => {
    try {
      const d = parseISO(couple.weddingDate);
      setTarget(isNaN(d.getTime()) ? new Date() : d);
    } catch {
      setTarget(new Date());
    }
  }, [couple.weddingDate]);

  const formattedDate = (() => {
    if (!target) return couple.weddingDate;
    try { return format(target, "EEEE, d MMMM yyyy", { locale: dateLocale }); } catch { return couple.weddingDate; }
  })();

  const usePhoto = couple.heroImageUrl && couple.heroImageUrl.trim().length > 0;

  return (
    <section className={styles.hero} id="top">
      <div className={styles.paper} />
      {usePhoto && (
        <div
          className={styles.photo}
          style={{ backgroundImage: `url("${couple.heroImageUrl}")` }}
        />
      )}

      <Hearts count={18} spread={{ top: 0.04, bottom: 0.94 }} />
      <Petals count={10} />

      <div className={styles.inner}>
        <p className={styles.tagline}>{couple.tagline || t("hero.tagline")}</p>

        <div className={styles.namesStack}>
          <span className={styles.name}>{couple.bride}</span>
          <span className={styles.amp}>&amp;</span>
          <span className={styles.name}>{couple.groom}</span>
        </div>

        <CoupleIllustration className={styles.coupleArt} />

        <div className={styles.date}>
          <span>{formattedDate}</span>
        </div>

        <a className={`btn ${styles.cta}`} href="#rsvp">
          {t("hero.confirmAttendance")}
        </a>
      </div>

      <div className={styles.scroll}>{t("hero.scroll")}</div>
    </section>
  );
}
