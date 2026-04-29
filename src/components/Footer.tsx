import { Heart } from "lucide-react";
import { format, parseISO } from "date-fns";
import type { CoupleInfo } from "@/lib/types";

interface FooterProps {
  couple: CoupleInfo;
}

export function Footer({ couple }: FooterProps) {
  const dateStr = (() => {
    try {
      return format(parseISO(couple.weddingDate), "d MMMM yyyy");
    } catch {
      return couple.weddingDate;
    }
  })();

  return (
    <footer
      style={{
        padding: "48px 24px 32px",
        textAlign: "center",
        borderTop: "1px solid var(--color-border)",
        background: "var(--color-bg)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-script)",
          color: "var(--color-rose-dark)",
          fontSize: "2.2rem",
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        {couple.bride} & {couple.groom}
      </div>
      <div
        style={{
          color: "var(--color-text-muted)",
          fontSize: "0.85rem",
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        {dateStr}
      </div>
      <div
        style={{
          color: "var(--color-text-muted)",
          fontSize: "0.85rem",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        Made with <Heart size={14} style={{ color: "var(--color-rose)" }} /> just for you.
      </div>
    </footer>
  );
}
