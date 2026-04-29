"use client";

import { useState } from "react";
import { Download, Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import * as XLSX from "xlsx";
import { useRsvpList } from "@/lib/store";
import styles from "./admin.module.css";

export function RsvpTable() {
  const { list, remove, clear } = useRsvpList();
  const [confirmClear, setConfirmClear] = useState(false);

  const handleExport = () => {
    const rows = list.map((r) => ({
      Name: r.fullName,
      Email: r.email,
      Attending: r.attending === "yes" ? "Yes" : "No",
      Message: r.message,
      "Submitted At": format(parseISO(r.createdAt), "yyyy-MM-dd HH:mm"),
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "RSVPs");
    XLSX.writeFile(wb, `rsvps-${format(new Date(), "yyyy-MM-dd")}.xlsx`);
  };

  const total = list.length;
  const yes = list.filter((r) => r.attending === "yes").length;
  const no = total - yes;

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div>
          <h2 style={{ marginBottom: 4 }}>RSVP Responses</h2>
          <span className="muted" style={{ fontSize: "0.92rem" }}>
            {total} total · {yes} attending · {no} declined
          </span>
        </div>
        <div className={styles.barActions}>
          <button type="button" className="btn btn-outline" onClick={handleExport} disabled={total === 0}>
            <Download size={16} /> Export Excel
          </button>
          {confirmClear ? (
            <>
              <button type="button" className="btn btn-outline" onClick={() => { clear(); setConfirmClear(false); }}>
                Confirm Clear
              </button>
              <button type="button" className="btn-ghost" onClick={() => setConfirmClear(false)}>Cancel</button>
            </>
          ) : (
            <button type="button" className="btn btn-outline" onClick={() => setConfirmClear(true)} disabled={total === 0}>
              <Trash2 size={16} /> Clear All
            </button>
          )}
        </div>
      </div>

      {total === 0 ? (
        <div className={styles.empty}>No responses yet. RSVPs submitted on the public page will appear here.</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Attending</th>
                <th>Message</th>
                <th>Submitted</th>
                <th style={{ width: 56 }}></th>
              </tr>
            </thead>
            <tbody>
              {list.map((r) => (
                <tr key={r.id}>
                  <td>{r.fullName}</td>
                  <td>{r.email}</td>
                  <td>
                    <span className={`${styles.badge} ${r.attending === "yes" ? styles.badgeYes : styles.badgeNo}`}>
                      {r.attending === "yes" ? "Yes" : "No"}
                    </span>
                  </td>
                  <td style={{ maxWidth: 280 }}>{r.message || <span className="muted">—</span>}</td>
                  <td>{format(parseISO(r.createdAt), "yyyy-MM-dd HH:mm")}</td>
                  <td>
                    <button
                      type="button"
                      className={`${styles.iconBtn} ${styles.danger}`}
                      aria-label="Delete"
                      onClick={() => remove(r.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
