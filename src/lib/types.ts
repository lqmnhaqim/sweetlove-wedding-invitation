export type Locale = "en" | "fr";

export interface CoupleInfo {
  bride: string;
  groom: string;
  monogram: string;
  weddingDate: string;
  rsvpDeadline: string;
  tagline: string;
  heroImageUrl: string;
}

export interface StoryEntry {
  id: string;
  year: string;
  title: string;
  body: string;
}

export interface ProgramEntry {
  id: string;
  time: string;
  title: string;
  description: string;
}

export interface EventVenue {
  title: string;
  time: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  description: string;
  mapUrl: string;
  calendarUrl: string;
}

export interface DressCode {
  title: string;
  description: string;
}

export interface Hotel {
  id: string;
  name: string;
  rating: string;
  distance: string;
  note: string;
}

export interface TravelInfo {
  hotels: Hotel[];
  byAir: string;
  byCar: string;
  thingsToDo: string[];
  contactEmail: string;
  contactPhone: string;
}

export interface GiftInfo {
  intro: string;
  contributionLabel: string;
  contributionDescription: string;
  bankNote: string;
  iban: string;
}

export interface InvitationContent {
  couple: CoupleInfo;
  story: StoryEntry[];
  program: ProgramEntry[];
  gift: GiftInfo;
  ceremony: EventVenue;
  dressCode: DressCode;
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
