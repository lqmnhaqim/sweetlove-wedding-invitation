import type { LocalizedText } from "./i18n";

export type { LocalizedText } from "./i18n";

export type Locale = "en" | "ms";

export interface CoupleInfo {
  bride: string;
  groom: string;
  brideFullName: LocalizedText;
  groomFullName: LocalizedText;
  monogram: string;
  weddingDate: string;
  rsvpDeadline: string;
  tagline: LocalizedText;
  heroImageUrl: string;
}

export interface WeddingReception {
  brideParents: LocalizedText;
  groomParents: LocalizedText;
  greeting: LocalizedText;
}

export interface AttireColor {
  id: string;
  name: LocalizedText;
  hex: string;
}

export interface AttireGuide {
  title: LocalizedText;
  description: LocalizedText;
  colorsToAvoidLabel: LocalizedText;
  colorsToAvoid: AttireColor[];
  note: LocalizedText;
}

export interface StoryEntry {
  id: string;
  year: string;
  title: LocalizedText;
  body: LocalizedText;
}

export interface ProgramEntry {
  id: string;
  time: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface EventVenue {
  title: LocalizedText;
  time: string;
  name: LocalizedText;
  addressLine1: LocalizedText;
  addressLine2: LocalizedText;
  description: LocalizedText;
  mapUrl: string;
  calendarUrl: string;
}

export interface DressCode {
  title: LocalizedText;
  description: LocalizedText;
}

export interface Hotel {
  id: string;
  name: LocalizedText;
  rating: LocalizedText;
  distance: LocalizedText;
  note: LocalizedText;
}

export interface TravelInfo {
  hotels: Hotel[];
  byAir: LocalizedText;
  byCar: LocalizedText;
  thingsToDo: LocalizedText[];
  contactEmail: string;
  contactPhone: string;
}

export interface GiftInfo {
  intro: LocalizedText;
  contributionLabel: LocalizedText;
  contributionDescription: LocalizedText;
  bankNote: LocalizedText;
  iban: string;
}

export interface InvitationContent {
  couple: CoupleInfo;
  reception: WeddingReception;
  story: StoryEntry[];
  program: ProgramEntry[];
  gift: GiftInfo;
  ceremony: EventVenue;
  dressCode: DressCode;
  attire: AttireGuide;
  travel: TravelInfo;
  adminPin: string;
}

export interface RsvpEntry {
  id: string;
  fullName: string;
  email: string;
  attending: "yes" | "no";
  message: string;
  createdAt: string;
}
