"use client";

import { Calendar, MapPin, Shirt } from "lucide-react";
import type { DressCode, EventVenue } from "@/lib/types";
import { Reveal } from "./Reveal";
import { Ornament } from "./Ornament";
import { useLocale, tx } from "@/lib/i18n";
import styles from "./EventDetails.module.css";

interface EventDetailsProps {
  ceremony: EventVenue;
  dressCode: DressCode;
}

export function EventDetails({ ceremony, dressCode }: EventDetailsProps) {
  const { t, locale } = useLocale();
  return (
    <section className={`section ${styles.section}`} id="event">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">{t("event.eyebrow")}</span>
          <h2 className="section-title">{t("event.title")}</h2>
          <p className="section-subtitle">{t("event.subtitle")}</p>
          <Ornament />
        </Reveal>

        <div className={styles.grid}>
          <Reveal className={styles.card} delay={80}>
            <h3 className={styles.title}>{tx(ceremony.title, locale)}</h3>
            <div className={styles.time}>{ceremony.time}</div>
            <div className={styles.venueName}>{tx(ceremony.name, locale)}</div>
            <div className={styles.address}>{tx(ceremony.addressLine1, locale)}</div>
            <div className={styles.address}>{tx(ceremony.addressLine2, locale)}</div>
            <p className={styles.description}>{tx(ceremony.description, locale)}</p>
            <div className={styles.actions}>
              <a className="btn btn-outline" href={ceremony.mapUrl} target="_blank" rel="noopener noreferrer">
                <MapPin size={16} /> {t("event.openInMaps")}
              </a>
              <a className="btn btn-outline" href={ceremony.calendarUrl} target="_blank" rel="noopener noreferrer">
                <Calendar size={16} /> {t("event.addToCalendar")}
              </a>
            </div>
          </Reveal>

          <Reveal className={styles.card} delay={160}>
            <h3 className={styles.title}>
              <Shirt size={18} style={{ display: "inline-block", marginRight: 8, color: "var(--color-rose-dark)" }} />
              {t("event.dressCode")}
            </h3>
            <p className={styles.dressBig}>{tx(dressCode.title, locale)}</p>
            <p className={styles.description}>{tx(dressCode.description, locale)}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
