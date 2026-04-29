"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import type {
  Hotel,
  InvitationContent,
  ProgramEntry,
  StoryEntry,
} from "@/lib/types";
import styles from "./admin.module.css";

interface EditorProps {
  draft: InvitationContent;
  setDraft: (next: InvitationContent) => void;
}

interface AdminEditorProps extends EditorProps {
  tab: string;
}

function genId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

function move<T>(arr: T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return arr;
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export function AdminEditor({ tab, draft, setDraft }: AdminEditorProps) {
  if (tab === "couple") return <CoupleEditor draft={draft} setDraft={setDraft} />;
  if (tab === "story") return <StoryEditor draft={draft} setDraft={setDraft} />;
  if (tab === "program") return <ProgramEditor draft={draft} setDraft={setDraft} />;
  if (tab === "gift") return <GiftEditor draft={draft} setDraft={setDraft} />;
  if (tab === "event") return <EventEditor draft={draft} setDraft={setDraft} />;
  if (tab === "travel") return <TravelEditor draft={draft} setDraft={setDraft} />;
  if (tab === "settings") return <SettingsEditor draft={draft} setDraft={setDraft} />;
  return null;
}

function CoupleEditor({ draft, setDraft }: EditorProps) {
  const c = draft.couple;
  const upd = (patch: Partial<typeof c>) => setDraft({ ...draft, couple: { ...c, ...patch } });
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}><h2>Couple & Date</h2></div>
      <div className={styles.grid2}>
        <div className="form-field">
          <label>Bride / Partner 1</label>
          <input value={c.bride} onChange={(e) => upd({ bride: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Groom / Partner 2</label>
          <input value={c.groom} onChange={(e) => upd({ groom: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Monogram</label>
          <input value={c.monogram} onChange={(e) => upd({ monogram: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Tagline</label>
          <input value={c.tagline} onChange={(e) => upd({ tagline: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Wedding Date</label>
          <input type="date" value={c.weddingDate} onChange={(e) => upd({ weddingDate: e.target.value })} />
        </div>
        <div className="form-field">
          <label>RSVP Deadline</label>
          <input type="date" value={c.rsvpDeadline} onChange={(e) => upd({ rsvpDeadline: e.target.value })} />
        </div>
      </div>
      <div className="form-field" style={{ marginTop: 16 }}>
        <label>Hero Background Image URL (optional)</label>
        <input
          type="url"
          placeholder="https://..."
          value={c.heroImageUrl}
          onChange={(e) => upd({ heroImageUrl: e.target.value })}
        />
        <span className="muted" style={{ fontSize: "0.85rem" }}>
          Paste a URL to a photo to use as the hero background. Leave empty to use the painterly default.
        </span>
      </div>
    </div>
  );
}

function StoryEditor({ draft, setDraft }: EditorProps) {
  const setStory = (next: StoryEntry[]) => setDraft({ ...draft, story: next });

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Our Love Story</h2>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() =>
            setStory([
              ...draft.story,
              { id: genId("story"), year: "Year", title: "New Chapter", body: "" },
            ])
          }
        >
          <Plus size={16} /> Add Entry
        </button>
      </div>

      {draft.story.map((entry, idx) => (
        <div key={entry.id} className={styles.itemCard}>
          <div className={styles.itemHeader}>
            <span className={styles.itemTitle}>{entry.year} — {entry.title || "Untitled"}</span>
            <div className={styles.barActions}>
              <button type="button" className={styles.iconBtn} aria-label="Move up"
                onClick={() => setStory(move(draft.story, idx, idx - 1))}>
                <ChevronUp size={16} />
              </button>
              <button type="button" className={styles.iconBtn} aria-label="Move down"
                onClick={() => setStory(move(draft.story, idx, idx + 1))}>
                <ChevronDown size={16} />
              </button>
              <button type="button" className={`${styles.iconBtn} ${styles.danger}`} aria-label="Delete"
                onClick={() => setStory(draft.story.filter((_, i) => i !== idx))}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <div className={styles.grid2}>
            <div className="form-field">
              <label>Year</label>
              <input value={entry.year}
                onChange={(e) => setStory(draft.story.map((s, i) => i === idx ? { ...s, year: e.target.value } : s))} />
            </div>
            <div className="form-field">
              <label>Title</label>
              <input value={entry.title}
                onChange={(e) => setStory(draft.story.map((s, i) => i === idx ? { ...s, title: e.target.value } : s))} />
            </div>
          </div>
          <div className="form-field">
            <label>Body</label>
            <textarea rows={3} value={entry.body}
              onChange={(e) => setStory(draft.story.map((s, i) => i === idx ? { ...s, body: e.target.value } : s))} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProgramEditor({ draft, setDraft }: EditorProps) {
  const setProgram = (next: ProgramEntry[]) => setDraft({ ...draft, program: next });
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Day Program</h2>
        <button type="button" className="btn btn-outline"
          onClick={() => setProgram([...draft.program, { id: genId("p"), time: "12:00", title: "New Step", description: "" }])}>
          <Plus size={16} /> Add Step
        </button>
      </div>
      {draft.program.map((entry, idx) => (
        <div key={entry.id} className={styles.itemCard}>
          <div className={styles.itemHeader}>
            <span className={styles.itemTitle}>{entry.time} — {entry.title}</span>
            <div className={styles.barActions}>
              <button type="button" className={styles.iconBtn} onClick={() => setProgram(move(draft.program, idx, idx - 1))} aria-label="Move up"><ChevronUp size={16} /></button>
              <button type="button" className={styles.iconBtn} onClick={() => setProgram(move(draft.program, idx, idx + 1))} aria-label="Move down"><ChevronDown size={16} /></button>
              <button type="button" className={`${styles.iconBtn} ${styles.danger}`} onClick={() => setProgram(draft.program.filter((_, i) => i !== idx))} aria-label="Delete"><Trash2 size={16} /></button>
            </div>
          </div>
          <div className={styles.grid2}>
            <div className="form-field">
              <label>Time</label>
              <input value={entry.time}
                onChange={(e) => setProgram(draft.program.map((p, i) => i === idx ? { ...p, time: e.target.value } : p))} />
            </div>
            <div className="form-field">
              <label>Title</label>
              <input value={entry.title}
                onChange={(e) => setProgram(draft.program.map((p, i) => i === idx ? { ...p, title: e.target.value } : p))} />
            </div>
          </div>
          <div className="form-field">
            <label>Description</label>
            <input value={entry.description}
              onChange={(e) => setProgram(draft.program.map((p, i) => i === idx ? { ...p, description: e.target.value } : p))} />
          </div>
        </div>
      ))}
    </div>
  );
}

function GiftEditor({ draft, setDraft }: EditorProps) {
  const g = draft.gift;
  const upd = (patch: Partial<typeof g>) => setDraft({ ...draft, gift: { ...g, ...patch } });
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}><h2>Gifts</h2></div>
      <div className="form-field">
        <label>Intro</label>
        <textarea rows={3} value={g.intro} onChange={(e) => upd({ intro: e.target.value })} />
      </div>
      <div className={styles.grid2} style={{ marginTop: 16 }}>
        <div className="form-field">
          <label>Contribution Label</label>
          <input value={g.contributionLabel} onChange={(e) => upd({ contributionLabel: e.target.value })} />
        </div>
        <div className="form-field">
          <label>IBAN / Account</label>
          <input value={g.iban} onChange={(e) => upd({ iban: e.target.value })} />
        </div>
      </div>
      <div className="form-field" style={{ marginTop: 16 }}>
        <label>Contribution Description</label>
        <textarea rows={2} value={g.contributionDescription} onChange={(e) => upd({ contributionDescription: e.target.value })} />
      </div>
      <div className="form-field" style={{ marginTop: 16 }}>
        <label>Bank Note</label>
        <textarea rows={2} value={g.bankNote} onChange={(e) => upd({ bankNote: e.target.value })} />
      </div>
    </div>
  );
}

function EventEditor({ draft, setDraft }: EditorProps) {
  const ev = draft.ceremony;
  const dc = draft.dressCode;
  const updEv = (patch: Partial<typeof ev>) => setDraft({ ...draft, ceremony: { ...ev, ...patch } });
  const updDc = (patch: Partial<typeof dc>) => setDraft({ ...draft, dressCode: { ...dc, ...patch } });
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}><h2>Event Details</h2></div>
      <div className={styles.grid2}>
        <div className="form-field">
          <label>Title</label>
          <input value={ev.title} onChange={(e) => updEv({ title: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Time</label>
          <input value={ev.time} onChange={(e) => updEv({ time: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Venue Name</label>
          <input value={ev.name} onChange={(e) => updEv({ name: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Map URL</label>
          <input value={ev.mapUrl} onChange={(e) => updEv({ mapUrl: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Address Line 1</label>
          <input value={ev.addressLine1} onChange={(e) => updEv({ addressLine1: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Address Line 2</label>
          <input value={ev.addressLine2} onChange={(e) => updEv({ addressLine2: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Calendar URL</label>
          <input value={ev.calendarUrl} onChange={(e) => updEv({ calendarUrl: e.target.value })} />
        </div>
      </div>
      <div className="form-field" style={{ marginTop: 16 }}>
        <label>Description</label>
        <textarea rows={3} value={ev.description} onChange={(e) => updEv({ description: e.target.value })} />
      </div>

      <h3 style={{ marginTop: 28, marginBottom: 12 }}>Dress Code</h3>
      <div className={styles.grid2}>
        <div className="form-field">
          <label>Title</label>
          <input value={dc.title} onChange={(e) => updDc({ title: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Description</label>
          <input value={dc.description} onChange={(e) => updDc({ description: e.target.value })} />
        </div>
      </div>
    </div>
  );
}

function TravelEditor({ draft, setDraft }: EditorProps) {
  const t = draft.travel;
  const upd = (patch: Partial<typeof t>) => setDraft({ ...draft, travel: { ...t, ...patch } });
  const setHotels = (hotels: Hotel[]) => upd({ hotels });
  const [thingsRaw, setThingsRaw] = useState(t.thingsToDo.join(", "));
  useEffect(() => { setThingsRaw(t.thingsToDo.join(", ")); }, [t.thingsToDo]);

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Travel & Accommodation</h2>
        <button type="button" className="btn btn-outline"
          onClick={() => setHotels([...t.hotels, { id: genId("h"), name: "New Hotel", rating: "4 Star", distance: "10 minutes from venue", note: "" }])}>
          <Plus size={16} /> Add Hotel
        </button>
      </div>

      {t.hotels.map((h, idx) => (
        <div key={h.id} className={styles.itemCard}>
          <div className={styles.itemHeader}>
            <span className={styles.itemTitle}>{h.name}</span>
            <div className={styles.barActions}>
              <button type="button" className={styles.iconBtn} onClick={() => setHotels(move(t.hotels, idx, idx - 1))} aria-label="Move up"><ChevronUp size={16} /></button>
              <button type="button" className={styles.iconBtn} onClick={() => setHotels(move(t.hotels, idx, idx + 1))} aria-label="Move down"><ChevronDown size={16} /></button>
              <button type="button" className={`${styles.iconBtn} ${styles.danger}`} onClick={() => setHotels(t.hotels.filter((_, i) => i !== idx))} aria-label="Delete"><Trash2 size={16} /></button>
            </div>
          </div>
          <div className={styles.grid2}>
            <div className="form-field">
              <label>Name</label>
              <input value={h.name} onChange={(e) => setHotels(t.hotels.map((x, i) => i === idx ? { ...x, name: e.target.value } : x))} />
            </div>
            <div className="form-field">
              <label>Rating</label>
              <input value={h.rating} onChange={(e) => setHotels(t.hotels.map((x, i) => i === idx ? { ...x, rating: e.target.value } : x))} />
            </div>
            <div className="form-field">
              <label>Distance</label>
              <input value={h.distance} onChange={(e) => setHotels(t.hotels.map((x, i) => i === idx ? { ...x, distance: e.target.value } : x))} />
            </div>
            <div className="form-field">
              <label>Note</label>
              <input value={h.note} onChange={(e) => setHotels(t.hotels.map((x, i) => i === idx ? { ...x, note: e.target.value } : x))} />
            </div>
          </div>
        </div>
      ))}

      <h3 style={{ marginTop: 28, marginBottom: 12 }}>Travel Info</h3>
      <div className="form-field">
        <label>By Air</label>
        <textarea rows={2} value={t.byAir} onChange={(e) => upd({ byAir: e.target.value })} />
      </div>
      <div className="form-field" style={{ marginTop: 16 }}>
        <label>By Car</label>
        <textarea rows={2} value={t.byCar} onChange={(e) => upd({ byCar: e.target.value })} />
      </div>
      <div className="form-field" style={{ marginTop: 16 }}>
        <label>Things to Do (comma separated)</label>
        <input
          value={thingsRaw}
          onChange={(e) => {
            setThingsRaw(e.target.value);
            upd({ thingsToDo: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) });
          }}
        />
      </div>

      <div className={styles.grid2} style={{ marginTop: 16 }}>
        <div className="form-field">
          <label>Contact Email</label>
          <input value={t.contactEmail} onChange={(e) => upd({ contactEmail: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Contact Phone</label>
          <input value={t.contactPhone} onChange={(e) => upd({ contactPhone: e.target.value })} />
        </div>
      </div>
    </div>
  );
}

function SettingsEditor({ draft, setDraft }: EditorProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}><h2>Settings</h2></div>
      <div className="form-field">
        <label>Admin PIN</label>
        <input
          type="text"
          value={draft.adminPin}
          onChange={(e) => setDraft({ ...draft, adminPin: e.target.value })}
        />
        <span className="muted" style={{ fontSize: "0.85rem" }}>
          Used to access this admin page. Change this when reusing the template.
        </span>
      </div>
    </div>
  );
}
