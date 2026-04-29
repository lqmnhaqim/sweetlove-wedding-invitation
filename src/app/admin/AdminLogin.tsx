"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { setAdminAuth } from "@/lib/store";
import styles from "./admin.module.css";

interface AdminLoginProps {
  expectedPin: string;
  onAuthed: () => void;
}

export function AdminLogin({ expectedPin, onAuthed }: AdminLoginProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === expectedPin) {
      setAdminAuth(true);
      onAuthed();
    } else {
      setError("Incorrect PIN. Please try again.");
    }
  };

  return (
    <div className={styles.login}>
      <Lock size={28} style={{ margin: "0 auto 12px", color: "var(--color-rose-dark)" }} />
      <h1>Admin Access</h1>
      <p>Enter your admin PIN to manage invitation content and RSVP responses.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="pin">PIN</label>
          <input
            id="pin"
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              setError("");
            }}
            autoFocus
          />
          {error && <span className="form-error">{error}</span>}
        </div>
        <button type="submit" className="btn" style={{ marginTop: 16, width: "100%" }}>
          Sign In
        </button>
        <p style={{ marginTop: 18, fontSize: "0.82rem" }}>
          Default PIN is <code style={{ background: "var(--color-blush)", padding: "2px 6px", borderRadius: 4 }}>1234</code>. You can change it from the Settings tab.
        </p>
      </form>
    </div>
  );
}
