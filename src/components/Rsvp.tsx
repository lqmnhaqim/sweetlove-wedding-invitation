"use client";

import { useState } from "react";
import { Check, Heart, X as XIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import { rsvpSchema } from "@/lib/schemas";
import { appendRsvp } from "@/lib/store";
import type { RsvpEntry } from "@/lib/types";
import { Reveal } from "./Reveal";
import { Ornament } from "./Ornament";
import { useLocale } from "@/lib/i18n";
import styles from "./Rsvp.module.css";

interface RsvpProps {
  rsvpDeadline: string;
}

interface FieldErrors {
  fullName?: string;
  email?: string;
  attending?: string;
  message?: string;
}

export function Rsvp({ rsvpDeadline }: RsvpProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | "">("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const { t, dateLocale } = useLocale();

  const formattedDeadline = (() => {
    try {
      const d = parseISO(rsvpDeadline);
      if (isNaN(d.getTime())) return rsvpDeadline;
      return format(d, "d MMMM yyyy", { locale: dateLocale });
    } catch {
      return rsvpDeadline;
    }
  })();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = rsvpSchema.safeParse({ fullName, email, attending, message });
    if (!result.success) {
      const next: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    const entry: RsvpEntry = {
      id: `rsvp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      fullName: result.data.fullName,
      email: result.data.email,
      attending: result.data.attending,
      message: result.data.message ?? "",
      createdAt: new Date().toISOString(),
    };
    appendRsvp(entry);
    setSubmitted(true);
    setErrors({});
  };

  return (
    <section className={`section ${styles.section}`} id="rsvp">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">{t("rsvp.eyebrow")}</span>
          <h2 className="section-title">{t("rsvp.title")}</h2>
          <Ornament />
          <p className={styles.deadline}>
            {t("rsvp.deadline", { date: formattedDeadline })}
          </p>
        </Reveal>

        <Reveal>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {submitted ? (
              <div className={styles.successCard}>
                <span className={styles.successIcon}>
                  <Heart size={26} />
                </span>
                <h3>{t("rsvp.thanks")}</h3>
                <p>{t("rsvp.thanksBody")}</p>
              </div>
            ) : (
              <div className={styles.row}>
                <div className="form-field">
                  <label htmlFor="fullName">{t("rsvp.fullName")}</label>
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {errors.fullName && <span className="form-error">{errors.fullName}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="email">{t("rsvp.email")}</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className="form-field">
                  <label>{t("rsvp.willYouAttend")}</label>
                  <div className={styles.attendingChoice}>
                    <button
                      type="button"
                      className={`${styles.choice} ${attending === "yes" ? styles.selected : ""}`}
                      onClick={() => setAttending("yes")}
                    >
                      <Check size={16} /> {t("rsvp.accept")}
                    </button>
                    <button
                      type="button"
                      className={`${styles.choice} ${attending === "no" ? styles.selected : ""}`}
                      onClick={() => setAttending("no")}
                    >
                      <XIcon size={16} /> {t("rsvp.decline")}
                    </button>
                  </div>
                  {errors.attending && <span className="form-error">{errors.attending}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="message">{t("rsvp.message")}</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button type="submit" className={`btn ${styles.submit}`}>
                  {t("rsvp.send")}
                </button>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
