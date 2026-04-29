"use client";

import type { AttireGuide } from "@/lib/types";
import { Reveal } from "./Reveal";
import { useLocale } from "@/lib/i18n";
import styles from "./Attire.module.css";

interface AttireProps {
  attire: AttireGuide;
}

function DressIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10 l 10 6 l 10 -6" />
        <path d="M32 16 v 6" />
        <path d="M24 22 q 2 12 -8 24 q 4 6 16 6 q 12 0 16 -6 q -10 -12 -8 -24 q -8 4 -16 0 z" />
        <path d="M24 22 l -2 -4 q 4 -2 10 -2 q 6 0 10 2 l -2 4" />
        <path d="M28 32 q 4 2 8 0" />
      </g>
    </svg>
  );
}

export function Attire({ attire }: AttireProps) {
  const { t } = useLocale();
  if (!attire || !attire.title) return null;

  return (
    <section className={styles.section} id="attire">
      <div className="container">
        <Reveal>
          <div className={styles.inner}>
            <div className={styles.icon}>
              <DressIcon />
            </div>
            <p className="section-eyebrow">{t("attire.eyebrow")}</p>
            <h2 className="section-title">{attire.title}</h2>
            <p className={styles.description}>{attire.description}</p>

            {attire.colorsToAvoid?.length > 0 && (
              <>
                <span className={styles.colorsLabel}>
                  {attire.colorsToAvoidLabel || t("attire.colorsToAvoid")}
                </span>
                <div className={styles.swatches}>
                  {attire.colorsToAvoid.map((c) => (
                    <div key={c.id} className={styles.swatch}>
                      <span
                        className={styles.swatchDot}
                        style={{ backgroundColor: c.hex }}
                        aria-label={c.name}
                      />
                      <span className={styles.swatchName}>{c.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {attire.note && <p className={styles.note}>{attire.note}</p>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
