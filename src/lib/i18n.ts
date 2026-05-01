"use client";

import { useEffect, useState, useCallback } from "react";
import { enUS, ms as msLocale } from "date-fns/locale";
import type { Locale as DateFnsLocale } from "date-fns";

export type Locale = "en" | "ms";

const STORAGE_KEY = "sweetlove:locale:v1";
const EVENT_NAME = "sweetlove:locale";

type Dict = Record<string, string>;

const en: Dict = {
  // Nav
  "nav.story": "Our Story",
  "nav.program": "Program",
  "nav.gifts": "Gifts",
  "nav.event": "Event",
  "nav.rsvp": "RSVP",
  "nav.travel": "Travel",
  "nav.openMenu": "Open menu",
  "nav.closeMenu": "Close menu",

  // Cover
  "cover.youreInvited": "You're Invited",
  "cover.dearFriend": "Dear Friend,",
  "cover.dearName": "Dear {name},",
  "cover.openInvitation": "Open Invitation",
  "cover.dialogLabel": "Wedding invitation cover",

  // Hero
  "hero.tagline": "The Wedding Of",
  "hero.confirmAttendance": "Confirm Attendance",
  "hero.scroll": "Scroll",

  // Wedding Reception
  "reception.eyebrow": "Wedding Reception",

  // Save The Date
  "std.eyebrow": "Save The Date",
  "std.subline": "Counting hours till forever begins",
  "std.countdownLabel": "Countdown",
  "std.countdown.months": "months",
  "std.countdown.days": "days",
  "std.countdown.hours": "hours",
  "std.countdown.minutes": "minutes",
  "std.calLabel": "Add the celebration to your calendar",
  "std.googleCalendar": "Google Calendar",
  "std.appleCalendar": "Apple Calendar",
  "std.findYourWay": "Find Your Way",
  "std.googleMaps": "Google Maps",
  "std.waze": "Waze",
  "std.eventTitle": "{bride} & {groom} — Wedding",
  "std.defaultDetails": "Join us for our wedding celebration.",

  // Story
  "story.eyebrow": "Our Journey",
  "story.title": "Our Love Story",

  // Program
  "program.eyebrow": "The Schedule",
  "program.title": "Day Program",
  "program.subtitle": "A glimpse of what we have prepared for you on our special day.",

  // Attire
  "attire.eyebrow": "Dress Code",
  "attire.colorsToAvoid": "Colours to Avoid",

  // Event Details
  "event.eyebrow": "Join Us",
  "event.title": "Event Details",
  "event.subtitle": "We can't wait to celebrate this special day with you. Here's everything you need to know.",
  "event.openInMaps": "Open in Maps",
  "event.addToCalendar": "Add to Calendar",
  "event.dressCode": "Dress Code",

  // Gifts
  "gifts.eyebrow": "With Love",
  "gifts.title": "Gifts",
  "gifts.bankTransfer": "Bank Transfer",
  "gifts.showIban": "Show IBAN",
  "gifts.copy": "Copy",
  "gifts.copied": "Copied",

  // RSVP
  "rsvp.eyebrow": "Be Our Guest",
  "rsvp.title": "RSVP",
  "rsvp.deadline": "Please let us know by {date}.",
  "rsvp.fullName": "Full Name",
  "rsvp.email": "Email Address",
  "rsvp.willYouAttend": "Will you be attending?",
  "rsvp.accept": "Joyfully Accept",
  "rsvp.decline": "Regretfully Decline",
  "rsvp.message": "Message for the Couple",
  "rsvp.send": "Send RSVP",
  "rsvp.thanks": "Thank You",
  "rsvp.thanksBody": "Your response has been received. We can't wait to share this day with you.",

  // Travel
  "travel.eyebrow": "Plan Your Visit",
  "travel.title": "Travel & Accommodation",
  "travel.subtitle": "We want to make your visit as comfortable as possible. Here are a few thoughtful recommendations.",
  "travel.whereToStay": "Where to Stay",
  "travel.gettingThere": "Getting There",
  "travel.byAir": "By Air",
  "travel.byCar": "By Car",
  "travel.thingsToDo": "Things to Do",
  "travel.thingsToDoIntro": "If you're extending your stay, here are a few local favourites:",
  "travel.needHelp": "Need Help?",
  "travel.needHelpBody": "Don't hesitate to reach out — we're happy to help with anything.",

  // Footer
  "footer.madeWith": "Made with",
  "footer.justForYou": "just for you.",
};

const ms: Dict = {
  // Nav
  "nav.story": "Kisah Kami",
  "nav.program": "Atur Cara",
  "nav.gifts": "Hadiah",
  "nav.event": "Majlis",
  "nav.rsvp": "RSVP",
  "nav.travel": "Perjalanan",
  "nav.openMenu": "Buka menu",
  "nav.closeMenu": "Tutup menu",

  // Cover
  "cover.youreInvited": "Anda Dijemput",
  "cover.dearFriend": "Sahabat Yang Dihormati,",
  "cover.dearName": "Yang Dihormati {name},",
  "cover.openInvitation": "Buka Jemputan",
  "cover.dialogLabel": "Muka depan kad jemputan perkahwinan",

  // Hero
  "hero.tagline": "Walimatul Urus",
  "hero.confirmAttendance": "Sahkan Kehadiran",
  "hero.scroll": "Tatal",

  // Wedding Reception
  "reception.eyebrow": "Majlis Resepsi",

  // Save The Date
  "std.eyebrow": "Simpan Tarikh",
  "std.subline": "Menghitung saat menuju selamanya",
  "std.countdownLabel": "Kira detik",
  "std.countdown.months": "bulan",
  "std.countdown.days": "hari",
  "std.countdown.hours": "jam",
  "std.countdown.minutes": "minit",
  "std.calLabel": "Tambah majlis ini ke kalendar anda",
  "std.googleCalendar": "Kalendar Google",
  "std.appleCalendar": "Kalendar Apple",
  "std.findYourWay": "Cari Jalan Anda",
  "std.googleMaps": "Google Maps",
  "std.waze": "Waze",
  "std.eventTitle": "{bride} & {groom} — Majlis Perkahwinan",
  "std.defaultDetails": "Sertailah kami meraikan majlis perkahwinan kami.",

  // Story
  "story.eyebrow": "Perjalanan Kami",
  "story.title": "Kisah Cinta Kami",

  // Program
  "program.eyebrow": "Jadual",
  "program.title": "Atur Cara Majlis",
  "program.subtitle": "Sekilas pandang apa yang telah kami sediakan untuk anda pada hari istimewa kami.",

  // Attire
  "attire.eyebrow": "Kod Pakaian",
  "attire.colorsToAvoid": "Warna Untuk Dielakkan",

  // Event Details
  "event.eyebrow": "Sertailah Kami",
  "event.title": "Butiran Majlis",
  "event.subtitle": "Kami tidak sabar untuk meraikan hari istimewa ini bersama anda. Berikut maklumat penting.",
  "event.openInMaps": "Buka di Peta",
  "event.addToCalendar": "Tambah ke Kalendar",
  "event.dressCode": "Kod Pakaian",

  // Gifts
  "gifts.eyebrow": "Dengan Kasih",
  "gifts.title": "Hadiah",
  "gifts.bankTransfer": "Pindahan Bank",
  "gifts.showIban": "Tunjukkan IBAN",
  "gifts.copy": "Salin",
  "gifts.copied": "Disalin",

  // RSVP
  "rsvp.eyebrow": "Tetamu Istimewa",
  "rsvp.title": "RSVP",
  "rsvp.deadline": "Mohon maklumkan kepada kami sebelum {date}.",
  "rsvp.fullName": "Nama Penuh",
  "rsvp.email": "Alamat E-mel",
  "rsvp.willYouAttend": "Adakah anda akan hadir?",
  "rsvp.accept": "Hadir Dengan Gembira",
  "rsvp.decline": "Tidak Dapat Hadir",
  "rsvp.message": "Pesanan Untuk Pengantin",
  "rsvp.send": "Hantar RSVP",
  "rsvp.thanks": "Terima Kasih",
  "rsvp.thanksBody": "Maklum balas anda telah diterima. Kami tidak sabar untuk berkongsi hari istimewa ini bersama anda.",

  // Travel
  "travel.eyebrow": "Rancang Lawatan Anda",
  "travel.title": "Perjalanan & Penginapan",
  "travel.subtitle": "Kami ingin pastikan lawatan anda selesa. Berikut adalah beberapa cadangan.",
  "travel.whereToStay": "Tempat Penginapan",
  "travel.gettingThere": "Menuju Ke Majlis",
  "travel.byAir": "Melalui Udara",
  "travel.byCar": "Melalui Jalan Raya",
  "travel.thingsToDo": "Aktiviti Menarik",
  "travel.thingsToDoIntro": "Jika anda melanjutkan lawatan, berikut beberapa tempat tempatan yang menarik:",
  "travel.needHelp": "Perlukan Bantuan?",
  "travel.needHelpBody": "Jangan teragak-agak untuk menghubungi kami — kami sentiasa sedia membantu.",

  // Footer
  "footer.madeWith": "Dibuat dengan",
  "footer.justForYou": "khas untuk anda.",
};

const dictionaries: Record<Locale, Dict> = { en, ms };

export const dateFnsLocales: Record<Locale, DateFnsLocale> = {
  en: enUS,
  ms: msLocale,
};

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "ms" || v === "en" ? v : "en";
}

export function getLocale(): Locale {
  return readStoredLocale();
}

/**
 * A translatable content field. Either a single string (legacy / untranslated)
 * or an object with per-locale variants. `tx()` resolves it for a given locale
 * and falls back to EN if the locale value is missing.
 */
export type LocalizedText = string | { en: string; ms: string };

export function tx(value: LocalizedText | undefined | null, locale: Locale): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[locale] || value.en || "";
}

/** Build a LocalizedText from two strings. */
export function lt(en: string, ms: string): { en: string; ms: string } {
  return { en, ms };
}

/** Resolve an array of LocalizedText entries against the active locale. */
export function txList(
  values: LocalizedText[] | undefined | null,
  locale: Locale,
): string[] {
  if (!values) return [];
  return values.map((v) => tx(v, locale));
}

export function translate(locale: Locale, key: string, vars?: Record<string, string | number>): string {
  const dict = dictionaries[locale] ?? dictionaries.en;
  let value = dict[key] ?? dictionaries.en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      value = value.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    }
  }
  return value;
}

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLocaleState(readStoredLocale());
    setHydrated(true);
    const handler = () => setLocaleState(readStoredLocale());
    window.addEventListener("storage", handler);
    window.addEventListener(EVENT_NAME, handler as EventListener);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener(EVENT_NAME, handler as EventListener);
    };
  }, []);

  const setLocale = useCallback((next: Locale) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, next);
    setLocaleState(next);
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => translate(locale, key, vars),
    [locale],
  );

  return { locale, setLocale, t, hydrated, dateLocale: dateFnsLocales[locale] };
}
