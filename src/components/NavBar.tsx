"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import styles from "./NavBar.module.css";

interface NavBarProps {
  monogram: string;
}

export function NavBar({ monogram }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#story", label: t("nav.story") },
    { href: "#program", label: t("nav.program") },
    { href: "#gifts", label: t("nav.gifts") },
    { href: "#event", label: t("nav.event") },
    { href: "#rsvp", label: t("nav.rsvp") },
    { href: "#travel", label: t("nav.travel") },
  ];

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <a href="#top" className={styles.brand}>{monogram}</a>
      <ul className={`${styles.menu} ${open ? styles.open : ""}`}>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          </li>
        ))}
      </ul>
      <div className={styles.lang} role="group" aria-label="Language">
        <button
          type="button"
          className={`${styles.langOpt} ${locale === "en" ? styles.langActive : ""}`}
          onClick={() => setLocale("en")}
          aria-pressed={locale === "en"}
        >
          EN
        </button>
        <span className={styles.langSep} aria-hidden="true">|</span>
        <button
          type="button"
          className={`${styles.langOpt} ${locale === "ms" ? styles.langActive : ""}`}
          onClick={() => setLocale("ms")}
          aria-pressed={locale === "ms"}
        >
          MS
        </button>
      </div>
      <button
        type="button"
        className={styles.toggle}
        aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
    </header>
  );
}
