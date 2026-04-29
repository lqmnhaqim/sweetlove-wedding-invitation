import { Building2, Car, Mail, MapPinned, Phone, Plane, Sparkles } from "lucide-react";
import type { TravelInfo } from "@/lib/types";
import { Reveal } from "./Reveal";
import { Ornament } from "./Ornament";
import styles from "./Travel.module.css";

interface TravelProps {
  travel: TravelInfo;
}

export function Travel({ travel }: TravelProps) {
  return (
    <section className={`section ${styles.section}`} id="travel">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">Plan Your Visit</span>
          <h2 className="section-title">Travel & Accommodation</h2>
          <p className="section-subtitle">
            We want to make your visit as comfortable as possible. Here are a few thoughtful recommendations.
          </p>
          <Ornament />
        </Reveal>

        <div className={styles.grid}>
          <Reveal className={styles.column} delay={80}>
            <h3>
              <Building2 size={20} /> Where to Stay
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
              <MapPinned size={20} /> Getting There
            </h3>
            <div className={styles.travelBlock}>
              <h4><Plane size={16} /> By Air</h4>
              <p>{travel.byAir}</p>
            </div>
            <div className={styles.travelBlock}>
              <h4><Car size={16} /> By Car</h4>
              <p>{travel.byCar}</p>
            </div>
            <div className={styles.travelBlock}>
              <h4><Sparkles size={16} /> Things to Do</h4>
              <p>If you're extending your stay, here are a few local favourites:</p>
              <ul className={styles.list}>
                {travel.thingsToDo.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>

            <div className={styles.contactCard}>
              <h4>Need Help?</h4>
              <p>Don't hesitate to reach out — we're happy to help with anything.</p>
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
