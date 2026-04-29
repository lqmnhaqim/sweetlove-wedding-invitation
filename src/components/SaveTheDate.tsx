"use client";

import { useEffect, useState } from "react";
import { format, parseISO, intervalToDuration } from "date-fns";
import { Calendar, MapPin, Navigation } from "lucide-react";
import type { CoupleInfo, EventVenue } from "@/lib/types";
import { Reveal } from "./Reveal";
import { Hearts } from "./Hearts";
import styles from "./SaveTheDate.module.css";

interface SaveTheDateProps {
  couple: CoupleInfo;
  ceremony: EventVenue;
}

interface CountdownParts {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getParts(target: Date): CountdownParts {
  const now = new Date();
  if (target <= now) return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  const d = intervalToDuration({ start: now, end: target });
  return {
    months: (d.years ?? 0) * 12 + (d.months ?? 0),
    days: d.days ?? 0,
    hours: d.hours ?? 0,
    minutes: d.minutes ?? 0,
    seconds: d.seconds ?? 0,
  };
}

function HeartFrameSvg() {
  return (
    <svg viewBox="0 0 220 220" aria-hidden="true">
      <defs>
        <radialGradient id="stdHeartFill" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fbe4dc" />
          <stop offset="100%" stopColor="#f3c5b3" />
        </radialGradient>
      </defs>
      <path
        d="M110 200 C 30 150, 12 90, 36 56 C 60 28, 96 30, 110 64 C 124 30, 160 28, 184 56 C 208 90, 190 150, 110 200 Z"
        fill="url(#stdHeartFill)"
        stroke="#8c1d1d"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Hand-drawn ribbon flourish around the heart */}
      <path
        d="M30 96 q -10 22 4 38 q 16 14 36 8"
        fill="none"
        stroke="#8c1d1d"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M190 96 q 10 22 -4 38 q -16 14 -36 8"
        fill="none"
        stroke="#8c1d1d"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

function buildGoogleCalendarUrl(opts: {
  title: string;
  start: Date;
  durationHours: number;
  location: string;
  details: string;
}) {
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const end = new Date(opts.start.getTime() + opts.durationHours * 3600 * 1000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: opts.title,
    dates: `${fmt(opts.start)}/${fmt(end)}`,
    details: opts.details,
    location: opts.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildIcsBlobUrl(opts: {
  title: string;
  start: Date;
  durationHours: number;
  location: string;
  details: string;
}) {
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const end = new Date(opts.start.getTime() + opts.durationHours * 3600 * 1000);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SweetLove//Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@sweetlove`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(opts.start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${opts.title}`,
    `DESCRIPTION:${opts.details}`,
    `LOCATION:${opts.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
}

export function SaveTheDate({ couple, ceremony }: SaveTheDateProps) {
  const [target, setTarget] = useState<Date | null>(null);
  const [parts, setParts] = useState<CountdownParts>({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    let t: Date;
    try {
      t = parseISO(couple.weddingDate);
    } catch {
      t = new Date();
    }
    setTarget(t);
    setParts(getParts(t));
    const id = setInterval(() => setParts(getParts(t)), 1000);
    return () => clearInterval(id);
  }, [couple.weddingDate]);

  const monthLabel = target ? format(target, "MMMM").toUpperCase() : "";
  const day = target ? Number(format(target, "d")) : 0;
  const dayPrev = day > 1 ? day - 1 : "";
  const dayNext = day + 1;
  const weekday = target ? format(target, "EEEE") : "";

  const eventTitle = `${couple.bride} & ${couple.groom} — Wedding`;
  const ceremonyDate = (() => {
    if (!target) return new Date();
    const [hh = "16", mm = "00"] = (ceremony.time || "16:00").split(":");
    const d = new Date(target);
    d.setHours(Number(hh) || 16, Number(mm) || 0, 0, 0);
    return d;
  })();

  const calendarOpts = {
    title: eventTitle,
    start: ceremonyDate,
    durationHours: 6,
    location: `${ceremony.name}, ${ceremony.addressLine1} ${ceremony.addressLine2}`.trim(),
    details: ceremony.description || "Join us for our wedding celebration.",
  };

  const googleUrl = buildGoogleCalendarUrl(calendarOpts);

  const handleAppleCalendar = () => {
    const url = buildIcsBlobUrl(calendarOpts);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wedding.ics";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const wazeUrl = (() => {
    const q = encodeURIComponent(`${ceremony.name} ${ceremony.addressLine1}`.trim());
    return `https://waze.com/ul?q=${q}`;
  })();

  return (
    <section className={styles.section} id="save-the-date">
      <Hearts count={12} spread={{ top: 0.05, bottom: 0.95 }} />

      <div className="container">
        <Reveal>
          <div className={styles.inner}>
            <p className="section-eyebrow">Save The Date</p>

            <div className={styles.dateRow}>
              <span className={styles.sideDay}>{dayPrev}</span>
              <div className={styles.heartFrame}>
                <HeartFrameSvg />
                <span className={styles.heartFrameDay}>{String(day).padStart(2, "0")}</span>
              </div>
              <span className={styles.sideDay}>{dayNext}</span>
            </div>

            <p className={styles.month}>{monthLabel}</p>
            <p className={styles.weekday}>{weekday}</p>

            <p className={styles.subline}>Counting hours till forever begins</p>

            <div className={styles.countdown} aria-label="Countdown">
              {([
                ["Month", parts.months],
                ["Days", parts.days],
                ["Hours", parts.hours],
                ["Minutes", parts.minutes],
              ] as const).slice(0, 4).map(([label, value]) => (
                <div key={label} className={styles.timeBox}>
                  <div className={styles.timeNum}>{String(value).padStart(2, "0")}</div>
                  <span className={styles.timeLabel}>{label.toLowerCase()}</span>
                </div>
              ))}
            </div>

            <p className={styles.calLabel}>Add the celebration to your calendar</p>
            <div className={styles.calButtons}>
              <a className="btn" href={googleUrl} target="_blank" rel="noopener noreferrer">
                <Calendar size={16} /> Google Calendar
              </a>
              <button className="btn" type="button" onClick={handleAppleCalendar}>
                <Calendar size={16} /> Apple Calendar
              </button>
            </div>

            <div className={styles.findWay}>
              <p className="section-eyebrow">Find Your Way</p>
              <p className={styles.address}>
                {ceremony.name}
                <br />
                {ceremony.addressLine1}
                <br />
                {ceremony.addressLine2}
              </p>
              <div className={styles.mapLinks}>
                <a className="btn" href={ceremony.mapUrl} target="_blank" rel="noopener noreferrer">
                  <MapPin size={16} /> Google Maps
                </a>
                <a className="btn btn-rose" href={wazeUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation size={16} /> Waze
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
