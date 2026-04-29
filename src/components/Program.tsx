import { Clock, Coffee, Heart, Music, Sparkles, Utensils, Users, Sunset } from "lucide-react";
import type { ProgramEntry } from "@/lib/types";
import { Reveal } from "./Reveal";
import { Ornament } from "./Ornament";
import styles from "./Program.module.css";

interface ProgramProps {
  entries: ProgramEntry[];
}

const ICONS = [Users, Heart, Coffee, Utensils, Music, Sparkles, Sunset, Clock];

export function Program({ entries }: ProgramProps) {
  return (
    <section className={`section ${styles.section}`} id="program">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">The Schedule</span>
          <h2 className="section-title">Day Program</h2>
          <p className="section-subtitle">A glimpse of what we have prepared for you on our special day.</p>
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
                    <h3>{entry.title}</h3>
                    <p>{entry.description}</p>
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
