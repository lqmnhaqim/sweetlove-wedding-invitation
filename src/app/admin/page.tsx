"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarRange,
  Gift,
  Heart,
  Home,
  Inbox,
  Map,
  Save,
  Settings,
  RotateCcw,
  Users,
} from "lucide-react";
import { useContent, isAdminAuthed, setAdminAuth } from "@/lib/store";
import { invitationContentSchema } from "@/lib/schemas";
import { AdminLogin } from "./AdminLogin";
import { AdminEditor } from "./AdminEditor";
import { RsvpTable } from "./RsvpTable";
import type { InvitationContent } from "@/lib/types";
import styles from "./admin.module.css";

const tabs = [
  { id: "couple", label: "Couple", icon: Heart },
  { id: "story", label: "Our Story", icon: Users },
  { id: "program", label: "Program", icon: CalendarRange },
  { id: "gift", label: "Gifts", icon: Gift },
  { id: "event", label: "Event", icon: Map },
  { id: "travel", label: "Travel", icon: Home },
  { id: "rsvp", label: "RSVPs", icon: Inbox },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

export default function AdminPage() {
  const { content, hydrated, update, reset } = useContent();
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("couple");
  const [draft, setDraft] = useState<InvitationContent>(content);
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hydrated) {
      setAuthed(isAdminAuthed());
      setDraft(content);
    }
  }, [hydrated, content]);

  const dirty = useMemo(() => JSON.stringify(content) !== JSON.stringify(draft), [content, draft]);

  if (!hydrated) {
    return <div className={styles.shell} aria-hidden="true" />;
  }

  if (!authed) {
    return (
      <div className={styles.shell}>
        <AdminLogin
          expectedPin={content.adminPin}
          onAuthed={() => setAuthed(true)}
        />
      </div>
    );
  }

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  };

  const handleSave = () => {
    const parsed = invitationContentSchema.safeParse(draft);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      setError(`${first.path.join(".") || "form"}: ${first.message}`);
      return;
    }
    update(parsed.data);
    setError(null);
    showToast("Changes saved");
  };

  const handleReset = () => {
    if (!window.confirm("Reset all content to defaults? This cannot be undone.")) return;
    reset();
    showToast("Content reset to defaults");
  };

  const handleSignOut = () => {
    setAdminAuth(false);
    setAuthed(false);
  };

  return (
    <div className={styles.shell}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Invitation Admin</h1>
            <p className={styles.subtitle}>Edit content, manage RSVPs, and reset to defaults.</p>
          </div>
          <div className={styles.barActions}>
            <Link href="/" className="btn btn-outline">
              <ArrowLeft size={16} /> View Site
            </Link>
            {tab !== "rsvp" && (
              <button type="button" className="btn btn-outline" onClick={handleReset}>
                <RotateCcw size={16} /> Reset
              </button>
            )}
            {tab !== "rsvp" && (
              <button type="button" className="btn" onClick={handleSave} disabled={!dirty}>
                <Save size={16} /> {dirty ? "Save Changes" : "Saved"}
              </button>
            )}
            <button type="button" className="btn-ghost" onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>

        {error && (
          <div className="form-error" style={{ background: "#fde7e3", padding: 12, borderRadius: 8, marginBottom: 16 }}>
            {error}
          </div>
        )}

        <div className={styles.layout}>
          <nav className={styles.tabs}>
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`${styles.tab} ${tab === t.id ? styles.active : ""}`}
                  onClick={() => setTab(t.id)}
                >
                  <Icon size={16} /> {t.label}
                </button>
              );
            })}
          </nav>

          <div>
            {tab === "rsvp" ? (
              <RsvpTable />
            ) : (
              <AdminEditor tab={tab} draft={draft} setDraft={setDraft} />
            )}
          </div>
        </div>
      </div>

      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}
