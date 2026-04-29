"use client";

import { useState } from "react";
import { Gift, Wallet, Copy, Check } from "lucide-react";
import type { GiftInfo } from "@/lib/types";
import { Reveal } from "./Reveal";
import { Ornament } from "./Ornament";
import styles from "./Gifts.module.css";

interface GiftsProps {
  gift: GiftInfo;
}

export function Gifts({ gift }: GiftsProps) {
  const [showIban, setShowIban] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(gift.iban);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section className={`section ${styles.section}`} id="gifts">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow">With Love</span>
          <h2 className="section-title">Gifts</h2>
          <Ornament />
          <p className={styles.intro}>{gift.intro}</p>
        </Reveal>

        <div className={styles.cards}>
          <Reveal className={styles.card} delay={80}>
            <span className={styles.icon}><Gift size={22} /></span>
            <h3 className={styles.label}>{gift.contributionLabel}</h3>
            <p className={styles.desc}>{gift.contributionDescription}</p>
          </Reveal>

          <Reveal className={styles.card} delay={160}>
            <span className={styles.icon}><Wallet size={22} /></span>
            <h3 className={styles.label}>Bank Transfer</h3>
            <p className={styles.desc}>{gift.bankNote}</p>

            {!showIban ? (
              <button type="button" className="btn btn-outline" onClick={() => setShowIban(true)}>
                Show IBAN
              </button>
            ) : (
              <>
                <div className={styles.iban}>{gift.iban}</div>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleCopy}
                  style={{ marginTop: 12 }}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
