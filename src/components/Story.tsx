"use client";

import type { StoryEntry } from "@/lib/types";
import { Reveal } from "./Reveal";
import { Ornament } from "./Ornament";
import { useLocale, tx } from "@/lib/i18n";
import styles from "./Story.module.css";

interface StoryProps {
  entries: StoryEntry[];
}

function FloralMarker() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2.2" fill="currentColor" fillOpacity="0.55" />
        <path d="M12 9.6 q -2 -2 -1 -4.4 q 2.2 1 1 4.4 z" fill="currentColor" fillOpacity="0.45" />
        <path d="M12 14.4 q 2 2 1 4.4 q -2.2 -1 -1 -4.4 z" fill="currentColor" fillOpacity="0.45" />
        <path d="M9.6 12 q -2 -2 -4.4 -1 q 1 2.2 4.4 1 z" fill="currentColor" fillOpacity="0.45" />
        <path d="M14.4 12 q 2 2 4.4 1 q -1 2.2 -4.4 -1 z" fill="currentColor" fillOpacity="0.45" />
      </g>
    </svg>
  );
}

export function Story({ entries }: StoryProps) {
  const { t, locale } = useLocale();
  return (
    <section className={`section ${styles.section}`} id="story">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">{t("story.eyebrow")}</span>
          <h2 className="section-title">{t("story.title")}</h2>
          <Ornament />
        </Reveal>

        <div className={styles.timeline}>
          {entries.map((entry, idx) => {
            const side = idx % 2 === 0 ? styles.left : styles.right;
            return (
              <Reveal key={entry.id} className={`${styles.entry} ${side}`} delay={idx * 80}>
                <span className={styles.dot} aria-hidden="true">
                  <FloralMarker />
                </span>
                <span className={styles.year}>{entry.year}</span>
                <h3 className={styles.title}>{tx(entry.title, locale)}</h3>
                <p className={styles.body}>{tx(entry.body, locale)}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
