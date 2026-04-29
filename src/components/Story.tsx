import type { StoryEntry } from "@/lib/types";
import { Reveal } from "./Reveal";
import { Ornament } from "./Ornament";
import styles from "./Story.module.css";

interface StoryProps {
  entries: StoryEntry[];
}

export function Story({ entries }: StoryProps) {
  return (
    <section className={`section ${styles.section}`} id="story">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">Our Journey</span>
          <h2 className="section-title">Our Love Story</h2>
          <Ornament />
        </Reveal>

        <div className={styles.timeline}>
          {entries.map((entry, idx) => {
            const side = idx % 2 === 0 ? styles.left : styles.right;
            return (
              <Reveal key={entry.id} className={`${styles.entry} ${side}`} delay={idx * 80}>
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.year}>{entry.year}</span>
                <h3 className={styles.title}>{entry.title}</h3>
                <p className={styles.body}>{entry.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
