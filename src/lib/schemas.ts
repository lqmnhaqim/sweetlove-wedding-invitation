import { z } from "zod";

export const rsvpSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email"),
  attending: z.enum(["yes", "no"]),
  message: z.string().trim().max(1000).optional().default(""),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;

export const coupleSchema = z.object({
  bride: z.string().trim().min(1).max(60),
  groom: z.string().trim().min(1).max(60),
  brideFullName: z.string().trim().max(160).optional().default(""),
  groomFullName: z.string().trim().max(160).optional().default(""),
  monogram: z.string().trim().min(1).max(10),
  weddingDate: z.string().trim().min(1),
  rsvpDeadline: z.string().trim().min(1),
  tagline: z.string().trim().min(1).max(120),
  heroImageUrl: z.string().trim().max(800).optional().default(""),
});

export const receptionSchema = z.object({
  brideParents: z.string().trim().max(240).optional().default(""),
  groomParents: z.string().trim().max(240).optional().default(""),
  greeting: z.string().trim().max(800).optional().default(""),
});

export const attireColorSchema = z.object({
  id: z.string(),
  name: z.string().trim().max(80),
  hex: z.string().trim().max(20),
});

export const attireSchema = z.object({
  title: z.string().trim().max(120).optional().default(""),
  description: z.string().trim().max(800).optional().default(""),
  colorsToAvoidLabel: z.string().trim().max(120).optional().default(""),
  colorsToAvoid: z.array(attireColorSchema).default([]),
  note: z.string().trim().max(800).optional().default(""),
});

export const storyEntrySchema = z.object({
  id: z.string(),
  year: z.string().trim().min(1).max(20),
  title: z.string().trim().min(1).max(120),
  body: z.string().trim().min(1).max(1000),
});

export const programEntrySchema = z.object({
  id: z.string(),
  time: z.string().trim().min(1).max(20),
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().min(0).max(300),
});

export const hotelSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1).max(120),
  rating: z.string().trim().max(40),
  distance: z.string().trim().max(120),
  note: z.string().trim().max(300),
});

export const giftSchema = z.object({
  intro: z.string().trim().max(800),
  contributionLabel: z.string().trim().max(60),
  contributionDescription: z.string().trim().max(400),
  bankNote: z.string().trim().max(400),
  iban: z.string().trim().max(60),
});

export const ceremonySchema = z.object({
  title: z.string().trim().min(1).max(120),
  time: z.string().trim().max(40),
  name: z.string().trim().max(200),
  addressLine1: z.string().trim().max(200),
  addressLine2: z.string().trim().max(200),
  description: z.string().trim().max(800),
  mapUrl: z.string().trim().max(400),
  calendarUrl: z.string().trim().max(400),
});

export const dressCodeSchema = z.object({
  title: z.string().trim().max(120),
  description: z.string().trim().max(400),
});

export const travelSchema = z.object({
  hotels: z.array(hotelSchema),
  byAir: z.string().trim().max(800),
  byCar: z.string().trim().max(800),
  thingsToDo: z.array(z.string().trim().max(120)),
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
