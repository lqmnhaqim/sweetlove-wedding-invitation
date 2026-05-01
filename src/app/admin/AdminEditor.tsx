"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import type {
  Hotel,
  InvitationContent,
  LocalizedText,
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

/** Normalize a LocalizedText to an editable {en, ms} pair. */
function toPair(value: LocalizedText | undefined | null): { en: string; ms: string } {
  if (value == null) return { en: "", ms: "" };
  if (typeof value === "string") return { en: value, ms: value };
  return { en: value.en ?? "", ms: value.ms ?? "" };
}

interface LocalizedFieldProps {
  label: string;
  value: LocalizedText | undefined | null;
  onChange: (next: { en: string; ms: string }) => void;
  rows?: number;
  placeholder?: string;
}

/**
 * Side-by-side English + Malay inputs for a translatable text field.
 * Always stores as `{en, ms}` object; renders a single row if `rows=1` else textareas.
 */
function LocalizedField({ label, value, onChange, rows, placeholder }: LocalizedFieldProps) {
  const pair = toPair(value);
  const multi = rows && rows > 1;
  const InputEl = multi ? "textarea" : "input";

  return (
    <div className="form-field" style={{ marginTop: 12 }}>
      <label>{label}</label>
      <div className={styles.localizedRow}>
        <div className={styles.localizedCell}>
          <span className={styles.localizedFlag}>EN</span>
          <InputEl
            rows={multi ? rows : undefined}
            value={pair.en}
            placeholder={placeholder}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              onChange({ ...pair, en: e.target.value })
            }
          />
        </div>
        <div className={styles.localizedCell}>
          <span className={styles.localizedFlag}>MS</span>
          <InputEl
            rows={multi ? rows : undefined}
            value={pair.ms}
            placeholder={placeholder}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              onChange({ ...pair, ms: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
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
  const r = draft.reception;
  const upd = (patch: Partial<typeof c>) => setDraft({ ...draft, couple: { ...c, ...patch } });
  const updR = (patch: Partial<typeof r>) => setDraft({ ...draft, reception: { ...r, ...patch } });
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}><h2>Couple &amp; Date</h2></div>
      <p className="muted" style={{ fontSize: "0.85rem", marginBottom: 12 }}>
        Fields with EN + MS pairs show the English version when the site language is English, and the Malay version when set to Malay.
      </p>
      <div className={styles.grid2}>
        <div className="form-field">
          <label>Bride / Partner 1 (display name)</label>
          <input value={c.bride} onChange={(e) => upd({ bride: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Groom / Partner 2 (display name)</label>
          <input value={c.groom} onChange={(e) => upd({ groom: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Monogram</label>
          <input value={c.monogram} onChange={(e) => upd({ monogram: e.target.value })} />
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

      <LocalizedField
        label="Bride full name (Wedding Reception card)"
        value={c.brideFullName}
        onChange={(next) => upd({ brideFullName: next })}
      />
      <LocalizedField
        label="Groom full name (Wedding Reception card)"
        value={c.groomFullName}
        onChange={(next) => upd({ groomFullName: next })}
      />
      <LocalizedField
        label="Tagline (Hero eyebrow)"
        value={c.tagline}
        onChange={(next) => upd({ tagline: next })}
      />

      <div className="form-field" style={{ marginTop: 16 }}>
        <label>Hero Background Image URL (optional)</label>
        <input
          type="url"
          placeholder="https://..."
          value={c.heroImageUrl}
          onChange={(e) => upd({ heroImageUrl: e.target.value })}
        />
        <span className="muted" style={{ fontSize: "0.85rem" }}>
          Paste a URL to a photo to use as a soft wash behind the hero. Leave empty for the parchment default.
        </span>
      </div>

      <h3 style={{ marginTop: 28, marginBottom: 12 }}>Wedding Reception Card</h3>
      <LocalizedField
        label="Bride's parents"
        value={r.brideParents}
        onChange={(next) => updR({ brideParents: next })}
      />
      <LocalizedField
        label="Groom's parents"
        value={r.groomParents}
        onChange={(next) => updR({ groomParents: next })}
      />
      <LocalizedField
        label="Greeting / Invitation message"
        rows={3}
        value={r.greeting}
        onChange={(next) => updR({ greeting: next })}
      />
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
              {
                id: genId("story"),
                year: "Year",
                title: { en: "New Chapter", ms: "Bab Baru" },
                body: { en: "", ms: "" },
              },
            ])
          }
        >
          <Plus size={16} /> Add Entry
        </button>
      </div>

      {draft.story.map((entry, idx) => {
        const titlePreview = toPair(entry.title).en;
        return (
          <div key={entry.id} className={styles.itemCard}>
            <div className={styles.itemHeader}>
              <span className={styles.itemTitle}>{entry.year} — {titlePreview || "Untitled"}</span>
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
            <div className="form-field">
              <label>Year</label>
              <input value={entry.year}
                onChange={(e) => setStory(draft.story.map((s, i) => i === idx ? { ...s, year: e.target.value } : s))} />
            </div>
            <LocalizedField
              label="Title"
              value={entry.title}
              onChange={(next) => setStory(draft.story.map((s, i) => i === idx ? { ...s, title: next } : s))}
            />
            <LocalizedField
              label="Body"
              rows={3}
              value={entry.body}
              onChange={(next) => setStory(draft.story.map((s, i) => i === idx ? { ...s, body: next } : s))}
            />
          </div>
        );
      })}
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
          onClick={() => setProgram([...draft.program, {
            id: genId("p"),
            time: "12:00",
            title: { en: "New Step", ms: "Acara Baru" },
            description: { en: "", ms: "" },
          }])}>
          <Plus size={16} /> Add Step
        </button>
      </div>
      {draft.program.map((entry, idx) => {
        const titlePreview = toPair(entry.title).en;
        return (
          <div key={entry.id} className={styles.itemCard}>
            <div className={styles.itemHeader}>
              <span className={styles.itemTitle}>{entry.time} — {titlePreview}</span>
              <div className={styles.barActions}>
                <button type="button" className={styles.iconBtn} onClick={() => setProgram(move(draft.program, idx, idx - 1))} aria-label="Move up"><ChevronUp size={16} /></button>
                <button type="button" className={styles.iconBtn} onClick={() => setProgram(move(draft.program, idx, idx + 1))} aria-label="Move down"><ChevronDown size={16} /></button>
                <button type="button" className={`${styles.iconBtn} ${styles.danger}`} onClick={() => setProgram(draft.program.filter((_, i) => i !== idx))} aria-label="Delete"><Trash2 size={16} /></button>
              </div>
            </div>
            <div className="form-field">
              <label>Time</label>
              <input value={entry.time}
                onChange={(e) => setProgram(draft.program.map((p, i) => i === idx ? { ...p, time: e.target.value } : p))} />
            </div>
            <LocalizedField
              label="Title"
              value={entry.title}
              onChange={(next) => setProgram(draft.program.map((p, i) => i === idx ? { ...p, title: next } : p))}
            />
            <LocalizedField
              label="Description"
              value={entry.description}
              onChange={(next) => setProgram(draft.program.map((p, i) => i === idx ? { ...p, description: next } : p))}
            />
          </div>
        );
      })}
    </div>
  );
}

function GiftEditor({ draft, setDraft }: EditorProps) {
  const g = draft.gift;
  const upd = (patch: Partial<typeof g>) => setDraft({ ...draft, gift: { ...g, ...patch } });
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}><h2>Gifts</h2></div>
      <LocalizedField
        label="Intro"
        rows={3}
        value={g.intro}
        onChange={(next) => upd({ intro: next })}
      />
      <div className={styles.grid2} style={{ marginTop: 16 }}>
        <div className="form-field">
          <label>IBAN / Account</label>
          <input value={g.iban} onChange={(e) => upd({ iban: e.target.value })} />
        </div>
      </div>
      <LocalizedField
        label="Contribution Label"
        value={g.contributionLabel}
        onChange={(next) => upd({ contributionLabel: next })}
      />
      <LocalizedField
        label="Contribution Description"
        rows={2}
        value={g.contributionDescription}
        onChange={(next) => upd({ contributionDescription: next })}
      />
      <LocalizedField
        label="Bank Note"
        rows={2}
        value={g.bankNote}
        onChange={(next) => upd({ bankNote: next })}
      />
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
          <label>Time</label>
          <input value={ev.time} onChange={(e) => updEv({ time: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Map URL</label>
          <input value={ev.mapUrl} onChange={(e) => updEv({ mapUrl: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Calendar URL</label>
          <input value={ev.calendarUrl} onChange={(e) => updEv({ calendarUrl: e.target.value })} />
        </div>
      </div>

      <LocalizedField label="Title" value={ev.title} onChange={(next) => updEv({ title: next })} />
      <LocalizedField label="Venue Name" value={ev.name} onChange={(next) => updEv({ name: next })} />
      <LocalizedField label="Address Line 1" value={ev.addressLine1} onChange={(next) => updEv({ addressLine1: next })} />
      <LocalizedField label="Address Line 2" value={ev.addressLine2} onChange={(next) => updEv({ addressLine2: next })} />
      <LocalizedField
        label="Description"
        rows={3}
        value={ev.description}
        onChange={(next) => updEv({ description: next })}
      />

      <h3 style={{ marginTop: 28, marginBottom: 12 }}>Dress Code</h3>
      <LocalizedField label="Title" value={dc.title} onChange={(next) => updDc({ title: next })} />
      <LocalizedField label="Description" value={dc.description} onChange={(next) => updDc({ description: next })} />

      <AttireFields draft={draft} setDraft={setDraft} />
    </div>
  );
}

function AttireFields({ draft, setDraft }: EditorProps) {
  const a = draft.attire;
  const upd = (patch: Partial<typeof a>) => setDraft({ ...draft, attire: { ...a, ...patch } });
  const updColors = (next: typeof a.colorsToAvoid) => upd({ colorsToAvoid: next });

  return (
    <>
      <h3 style={{ marginTop: 28, marginBottom: 12 }}>Attire Guide (extended)</h3>
      <LocalizedField label="Title" value={a.title} onChange={(next) => upd({ title: next })} />
      <LocalizedField label="Colours-to-avoid label" value={a.colorsToAvoidLabel} onChange={(next) => upd({ colorsToAvoidLabel: next })} />
      <LocalizedField label="Description" rows={2} value={a.description} onChange={(next) => upd({ description: next })} />
      <LocalizedField label="Note (shown in dashed box)" rows={3} value={a.note} onChange={(next) => upd({ note: next })} />

      <div style={{ marginTop: 16 }}>
        <div className={styles.panelHeader}>
          <h3 style={{ margin: 0 }}>Colours to Avoid</h3>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() =>
              updColors([
                ...a.colorsToAvoid,
                { id: genId("c"), name: { en: "New Colour", ms: "Warna Baru" }, hex: "#888888" },
              ])
            }
          >
            <Plus size={16} /> Add Colour
          </button>
        </div>
        {a.colorsToAvoid.map((c, idx) => (
          <div key={c.id} className={styles.itemCard}>
            <LocalizedField
              label="Name"
              value={c.name}
              onChange={(next) => {
                const arr = [...a.colorsToAvoid];
                arr[idx] = { ...c, name: next };
                updColors(arr);
              }}
            />
            <div className="form-field">
              <label>Hex (e.g. #2f4a1e)</label>
              <input
                value={c.hex}
                onChange={(e) => {
                  const next = [...a.colorsToAvoid];
                  next[idx] = { ...c, hex: e.target.value };
                  updColors(next);
                }}
              />
            </div>
            <div className={styles.barActions} style={{ marginTop: 8 }}>
              <span
                aria-hidden="true"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  border: "1px solid var(--color-border)",
                  backgroundColor: c.hex,
                  display: "inline-block",
                }}
              />
              <button
                type="button"
                className={`${styles.iconBtn} ${styles.danger}`}
                aria-label="Delete colour"
                onClick={() => updColors(a.colorsToAvoid.filter((_, i) => i !== idx))}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function TravelEditor({ draft, setDraft }: EditorProps) {
  const t = draft.travel;
  const upd = (patch: Partial<typeof t>) => setDraft({ ...draft, travel: { ...t, ...patch } });
  const setHotels = (hotels: Hotel[]) => upd({ hotels });

  // Things To Do: two separate comma-separated inputs (EN and MS).
  const initialEn = t.thingsToDo.map((x) => toPair(x).en).join(", ");
  const initialMs = t.thingsToDo.map((x) => toPair(x).ms).join(", ");
  const [thingsEnRaw, setThingsEnRaw] = useState(initialEn);
  const [thingsMsRaw, setThingsMsRaw] = useState(initialMs);
  useEffect(() => {
    const newEn = t.thingsToDo.map((x) => toPair(x).en).join(", ");
    const newMs = t.thingsToDo.map((x) => toPair(x).ms).join(", ");
    if (newEn !== thingsEnRaw) setThingsEnRaw(newEn);
    if (newMs !== thingsMsRaw) setThingsMsRaw(newMs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t.thingsToDo]);

  const commitThings = (enRaw: string, msRaw: string) => {
    const ens = enRaw.split(",").map((s) => s.trim()).filter(Boolean);
    const mss = msRaw.split(",").map((s) => s.trim()).filter(Boolean);
    const count = Math.max(ens.length, mss.length);
    const next: LocalizedText[] = [];
    for (let i = 0; i < count; i++) {
      next.push({ en: ens[i] ?? "", ms: mss[i] ?? ens[i] ?? "" });
    }
    upd({ thingsToDo: next });
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Travel &amp; Accommodation</h2>
        <button type="button" className="btn btn-outline"
          onClick={() => setHotels([...t.hotels, {
            id: genId("h"),
            name: { en: "New Hotel", ms: "Hotel Baru" },
            rating: { en: "4 Star", ms: "4 Bintang" },
            distance: { en: "10 minutes from venue", ms: "10 minit dari lokasi majlis" },
            note: { en: "", ms: "" },
          }])}>
          <Plus size={16} /> Add Hotel
        </button>
      </div>

      {t.hotels.map((h, idx) => {
        const namePreview = toPair(h.name).en;
        const setField = (patch: Partial<Hotel>) => setHotels(t.hotels.map((x, i) => i === idx ? { ...x, ...patch } : x));
        return (
          <div key={h.id} className={styles.itemCard}>
            <div className={styles.itemHeader}>
              <span className={styles.itemTitle}>{namePreview}</span>
              <div className={styles.barActions}>
                <button type="button" className={styles.iconBtn} onClick={() => setHotels(move(t.hotels, idx, idx - 1))} aria-label="Move up"><ChevronUp size={16} /></button>
                <button type="button" className={styles.iconBtn} onClick={() => setHotels(move(t.hotels, idx, idx + 1))} aria-label="Move down"><ChevronDown size={16} /></button>
                <button type="button" className={`${styles.iconBtn} ${styles.danger}`} onClick={() => setHotels(t.hotels.filter((_, i) => i !== idx))} aria-label="Delete"><Trash2 size={16} /></button>
              </div>
            </div>
            <LocalizedField label="Name" value={h.name} onChange={(next) => setField({ name: next })} />
            <LocalizedField label="Rating" value={h.rating} onChange={(next) => setField({ rating: next })} />
            <LocalizedField label="Distance" value={h.distance} onChange={(next) => setField({ distance: next })} />
            <LocalizedField label="Note" value={h.note} onChange={(next) => setField({ note: next })} />
          </div>
        );
      })}

      <h3 style={{ marginTop: 28, marginBottom: 12 }}>Travel Info</h3>
      <LocalizedField label="By Air" rows={2} value={t.byAir} onChange={(next) => upd({ byAir: next })} />
      <LocalizedField label="By Car" rows={2} value={t.byCar} onChange={(next) => upd({ byCar: next })} />

      <div className="form-field" style={{ marginTop: 16 }}>
        <label>Things to Do (comma separated — EN / MS pair items by position)</label>
        <div className={styles.localizedRow}>
          <div className={styles.localizedCell}>
            <span className={styles.localizedFlag}>EN</span>
            <input
              value={thingsEnRaw}
              onChange={(e) => {
                setThingsEnRaw(e.target.value);
                commitThings(e.target.value, thingsMsRaw);
              }}
            />
          </div>
          <div className={styles.localizedCell}>
            <span className={styles.localizedFlag}>MS</span>
            <input
              value={thingsMsRaw}
              onChange={(e) => {
                setThingsMsRaw(e.target.value);
                commitThings(thingsEnRaw, e.target.value);
              }}
            />
          </div>
        </div>
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
