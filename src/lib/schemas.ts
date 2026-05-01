import { z } from "zod";

export const rsvpSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email"),
  attending: z.enum(["yes", "no"]),
  message: z.string().trim().max(1000).optional().default(""),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;

/** A translatable text field: either a plain string (legacy) or an {en, ms} pair. */
const localized = (max = 800) =>
  z.union([
    z.string().trim().max(max),
    z.object({
      en: z.string().trim().max(max),
      ms: z.string().trim().max(max),
    }),
  ]);

export const coupleSchema = z.object({
  bride: z.string().trim().min(1).max(60),
  groom: z.string().trim().min(1).max(60),
  brideFullName: localized(160).optional().default(""),
  groomFullName: localized(160).optional().default(""),
  monogram: z.string().trim().min(1).max(10),
  weddingDate: z.string().trim().min(1),
  rsvpDeadline: z.string().trim().min(1),
  tagline: localized(120),
  heroImageUrl: z.string().trim().max(800).optional().default(""),
});

export const receptionSchema = z.object({
  brideParents: localized(240).optional().default(""),
  groomParents: localized(240).optional().default(""),
  greeting: localized(800).optional().default(""),
});

export const attireColorSchema = z.object({
  id: z.string(),
  name: localized(80),
  hex: z.string().trim().max(20),
});

export const attireSchema = z.object({
  title: localized(120).optional().default(""),
  description: localized(800).optional().default(""),
  colorsToAvoidLabel: localized(120).optional().default(""),
  colorsToAvoid: z.array(attireColorSchema).default([]),
  note: localized(800).optional().default(""),
});

export const storyEntrySchema = z.object({
  id: z.string(),
  year: z.string().trim().min(1).max(20),
  title: localized(120),
  body: localized(1000),
});

export const programEntrySchema = z.object({
  id: z.string(),
  time: z.string().trim().min(1).max(20),
  title: localized(120),
  description: localized(300),
});

export const hotelSchema = z.object({
  id: z.string(),
  name: localized(120),
  rating: localized(40),
  distance: localized(120),
  note: localized(300),
});

export const giftSchema = z.object({
  intro: localized(800),
  contributionLabel: localized(60),
  contributionDescription: localized(400),
  bankNote: localized(400),
  iban: z.string().trim().max(60),
});

export const ceremonySchema = z.object({
  title: localized(120),
  time: z.string().trim().max(40),
  name: localized(200),
  addressLine1: localized(200),
  addressLine2: localized(200),
  description: localized(800),
  mapUrl: z.string().trim().max(400),
  calendarUrl: z.string().trim().max(400),
});

export const dressCodeSchema = z.object({
  title: localized(120),
  description: localized(400),
});

export const travelSchema = z.object({
  hotels: z.array(hotelSchema),
  byAir: localized(800),
  byCar: localized(800),
  thingsToDo: z.array(localized(120)),
  contactEmail: z.string().trim().max(200),
  contactPhone: z.string().trim().max(60),
});

export const invitationContentSchema = z.object({
  couple: coupleSchema,
  reception: receptionSchema.optional().default({
    brideParents: "",
    groomParents: "",
    greeting: "",
  }),
  story: z.array(storyEntrySchema),
  program: z.array(programEntrySchema),
  gift: giftSchema,
  ceremony: ceremonySchema,
  dressCode: dressCodeSchema,
  attire: attireSchema.optional().default({
    title: "Attire Guide",
    description: "",
    colorsToAvoidLabel: "Colours to Avoid",
    colorsToAvoid: [],
    note: "",
  }),
  travel: travelSchema,
  adminPin: z.string().trim().min(1).max(60),
});
