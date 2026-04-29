"use client";

import { useEffect, useState, useCallback } from "react";
import type { InvitationContent, RsvpEntry } from "./types";
import { defaultContent } from "./defaults";

const CONTENT_KEY = "sweetlove:content:v1";
const RSVP_KEY = "sweetlove:rsvp:v1";
const ADMIN_SESSION_KEY = "sweetlove:admin:v1";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function loadContent(): InvitationContent {
  if (typeof window === "undefined") return defaultContent;
  const stored = safeParse<Partial<InvitationContent> | null>(
    window.localStorage.getItem(CONTENT_KEY),
    null,
  );
  if (!stored) return defaultContent;
  return { ...defaultContent, ...stored } as InvitationContent;
}

export function saveContent(content: InvitationContent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
  window.dispatchEvent(new CustomEvent("sweetlove:content"));
}

export function resetContent() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CONTENT_KEY);
  window.dispatchEvent(new CustomEvent("sweetlove:content"));
}

export function loadRsvp(): RsvpEntry[] {
  if (typeof window === "undefined") return [];
  return safeParse<RsvpEntry[]>(window.localStorage.getItem(RSVP_KEY), []);
}

export function saveRsvp(entries: RsvpEntry[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(RSVP_KEY, JSON.stringify(entries));
  window.dispatchEvent(new CustomEvent("sweetlove:rsvp"));
}

export function appendRsvp(entry: RsvpEntry) {
  const next = [...loadRsvp(), entry];
  saveRsvp(next);
}

export function setAdminAuth(granted: boolean) {
  if (typeof window === "undefined") return;
  if (granted) window.sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
  else window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "1";
}

export function useContent() {
  const [content, setContentState] = useState<InvitationContent>(defaultContent);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setContentState(loadContent());
    setHydrated(true);
    const handler = () => setContentState(loadContent());
    window.addEventListener("storage", handler);
    window.addEventListener("sweetlove:content", handler as EventListener);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("sweetlove:content", handler as EventListener);
    };
  }, []);

  const update = useCallback((next: InvitationContent) => {
    setContentState(next);
    saveContent(next);
  }, []);

  const reset = useCallback(() => {
    resetContent();
    setContentState(defaultContent);
  }, []);

  return { content, hydrated, update, reset };
}

export function useRsvpList() {
  const [list, setList] = useState<RsvpEntry[]>([]);

  useEffect(() => {
    setList(loadRsvp());
    const handler = () => setList(loadRsvp());
    window.addEventListener("storage", handler);
    window.addEventListener("sweetlove:rsvp", handler as EventListener);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("sweetlove:rsvp", handler as EventListener);
    };
  }, []);

  const remove = useCallback((id: string) => {
    const next = loadRsvp().filter((r) => r.id !== id);
    saveRsvp(next);
    setList(next);
  }, []);

  const clear = useCallback(() => {
    saveRsvp([]);
    setList([]);
  }, []);

  return { list, remove, clear };
}
