"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "./NavBar.module.css";

interface NavBarProps {
  monogram: string;
}

const links = [
  { href: "#story", label: "Our Story" },
  { href: "#program", label: "Program" },
  { href: "#gifts", label: "Gifts" },
  { href: "#event", label: "Event" },
  { href: "#rsvp", label: "RSVP" },
  { href: "#travel", label: "Travel" },
];

export function NavBar({ monogram }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <span className={styles.lang}>EN</span>
      <button
        type="button"
        className={styles.toggle}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
    </header>
  );
}
