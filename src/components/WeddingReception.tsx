"use client";

import type { CoupleInfo, WeddingReception as WeddingReceptionType } from "@/lib/types";
import { Reveal } from "./Reveal";
import { Hearts } from "./Hearts";
import { useLocale, tx } from "@/lib/i18n";
import styles from "./WeddingReception.module.css";

interface WeddingReceptionProps {
  reception: WeddingReceptionType;
  couple: CoupleInfo;
}

export function WeddingReception({ reception, couple }: WeddingReceptionProps) {
  const { t, locale } = useLocale();
  const brideParents = tx(reception.brideParents, locale);
  const groomParents = tx(reception.groomParents, locale);
  const greeting = tx(reception.greeting, locale);
  const brideFullName = tx(couple.brideFullName, locale);
  const groomFullName = tx(couple.groomFullName, locale);
  return (
    <section className={styles.section} id="reception">
      <Hearts count={10} spread={{ top: 0.05, bottom: 0.95 }} />

      <div className="container">
        <Reveal>
          <div className={styles.card}>
            <p className={styles.eyebrow}>{t("reception.eyebrow")}</p>

            {brideParents && (
              <p className={styles.parents}>{brideParents}</p>
            )}
            {brideParents && groomParents && (
              <span className={styles.amp}>&amp;</span>
            )}
            {groomParents && (
              <p className={styles.parents}>{groomParents}</p>
            )}

            {greeting && (
              <p className={styles.greeting}>{greeting}</p>
            )}

            <div className={styles.divider} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21s-7.5-4.7-9.5-9.2C1.1 8.7 3.1 5.5 6.4 5.5c1.9 0 3.5 1 4.6 2.4 1.1-1.5 2.7-2.4 4.6-2.4 3.3 0 5.3 3.2 3.9 6.3-2 4.5-7.5 9.2-7.5 9.2z" />
              </svg>
            </div>

            <div className={styles.couple}>
              <span className={styles.coupleName}>
                {brideFullName || couple.bride}
              </span>
              <span className={styles.coupleAmp}>&amp;</span>
              <span className={styles.coupleName}>
                {groomFullName || couple.groom}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
