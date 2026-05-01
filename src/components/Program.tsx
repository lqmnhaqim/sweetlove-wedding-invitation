"use client";

import { Clock, Coffee, Heart, Music, Sparkles, Utensils, Users, Sunset } from "lucide-react";
import type { ProgramEntry } from "@/lib/types";
import { Reveal } from "./Reveal";
import { Ornament } from "./Ornament";
import { useLocale, tx } from "@/lib/i18n";
import styles from "./Program.module.css";

interface ProgramProps {
  entries: ProgramEntry[];
}

const ICONS = [Users, Heart, Coffee, Utensils, Music, Sparkles, Sunset, Clock];

export function Program({ entries }: ProgramProps) {
  const { t, locale } = useLocale();
  return (
    <section className={`section ${styles.section}`} id="program">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">{t("program.eyebrow")}</span>
          <h2 className="section-title">{t("program.title")}</h2>
          <p className="section-subtitle">{t("program.subtitle")}</p>
          <Ornament />
        </Reveal>

        <div className={styles.list}>
          {entries.map((entry, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <Reveal key={entry.id} className={styles.entry} delay={idx * 60}>
                <div className={styles.time}>
                  {entry.time}
                  <span className={styles.dot} aria-hidden="true" />
                </div>
                <div className={styles.bodyRow}>
                  <span className={styles.icon} aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <div className={styles.body}>
                    <h3>{tx(entry.title, locale)}</h3>
                    <p>{tx(entry.description, locale)}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
