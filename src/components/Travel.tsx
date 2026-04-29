"use client";

import { Building2, Car, Mail, MapPinned, Phone, Plane, Sparkles } from "lucide-react";
import type { TravelInfo } from "@/lib/types";
import { Reveal } from "./Reveal";
import { Ornament } from "./Ornament";
import { useLocale } from "@/lib/i18n";
import styles from "./Travel.module.css";

interface TravelProps {
  travel: TravelInfo;
}

export function Travel({ travel }: TravelProps) {
  const { t } = useLocale();
  return (
    <section className={`section ${styles.section}`} id="travel">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">{t("travel.eyebrow")}</span>
          <h2 className="section-title">{t("travel.title")}</h2>
          <p className="section-subtitle">{t("travel.subtitle")}</p>
          <Ornament />
        </Reveal>

        <div className={styles.grid}>
          <Reveal className={styles.column} delay={80}>
            <h3>
              <Building2 size={20} /> {t("travel.whereToStay")}
            </h3>
            {travel.hotels.map((h) => (
              <div key={h.id} className={styles.hotelCard}>
                <div className={styles.hotelName}>{h.name}</div>
                <span className={styles.rating}>{h.rating}</span>
                <div className={styles.distance}>{h.distance}</div>
                <div className={styles.note}>{h.note}</div>
              </div>
            ))}
          </Reveal>

          <Reveal className={styles.column} delay={140}>
            <h3>
              <MapPinned size={20} /> {t("travel.gettingThere")}
            </h3>
            <div className={styles.travelBlock}>
              <h4><Plane size={16} /> {t("travel.byAir")}</h4>
              <p>{travel.byAir}</p>
            </div>
            <div className={styles.travelBlock}>
              <h4><Car size={16} /> {t("travel.byCar")}</h4>
              <p>{travel.byCar}</p>
            </div>
            <div className={styles.travelBlock}>
              <h4><Sparkles size={16} /> {t("travel.thingsToDo")}</h4>
              <p>{t("travel.thingsToDoIntro")}</p>
              <ul className={styles.list}>
                {travel.thingsToDo.map((thing) => (
                  <li key={thing}>{thing}</li>
                ))}
              </ul>
            </div>

            <div className={styles.contactCard}>
              <h4>{t("travel.needHelp")}</h4>
              <p>{t("travel.needHelpBody")}</p>
              <a href={`mailto:${travel.contactEmail}`}>
                <Mail size={14} style={{ display: "inline", marginRight: 6 }} />
                {travel.contactEmail}
              </a>
              <a href={`tel:${travel.contactPhone.replace(/\s+/g, "")}`}>
                <Phone size={14} style={{ display: "inline", marginRight: 6 }} />
                {travel.contactPhone}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
