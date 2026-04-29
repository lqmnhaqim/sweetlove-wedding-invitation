import type { InvitationContent } from "./types";

export const defaultContent: InvitationContent = {
  couple: {
    bride: "Sweet",
    groom: "Love",
    monogram: "S&L",
    weddingDate: "2026-11-22",
    rsvpDeadline: "2026-10-22",
    tagline: "We're Getting Married",
  },
  story: [
    {
      id: "story-1",
      year: "2020",
      title: "How We Met",
      body: "A quiet evening, a shared smile, and a conversation that lasted hours. Neither of us knew it then, but our story had just begun.",
    },
    {
      id: "story-2",
      year: "2021",
      title: "First Adventure",
      body: "Long drives, midnight coffees, and a hundred small adventures. The world felt brighter with someone to share it.",
    },
    {
      id: "story-3",
      year: "2023",
      title: "Building a Home",
      body: "Two suitcases, one apartment, and a thousand new routines. We learned that home isn't a place — it's a person.",
    },
    {
      id: "story-4",
      year: "2025",
      title: "The Proposal",
      body: "Under a sky full of stars, with hands trembling and hearts full, the question was asked. The answer came easily.",
    },
  ],
  program: [
    { id: "p-1", time: "16:30", title: "Guest Arrival", description: "Welcome and reception" },
    { id: "p-2", time: "17:00", title: "Ceremony", description: "Exchange of vows" },
    { id: "p-3", time: "18:00", title: "Cocktail", description: "Aperitifs and conversation" },
    { id: "p-4", time: "20:00", title: "Dinner", description: "Wedding banquet" },
    { id: "p-5", time: "22:30", title: "First Dance", description: "An unforgettable moment" },
    { id: "p-6", time: "23:00", title: "Party", description: "Let's celebrate together" },
    { id: "p-7", time: "02:30", title: "Farewell", description: "Until we meet again" },
  ],
  gift: {
    intro:
      "Your presence is the greatest gift of all. If you wish to celebrate with something more, please feel free to choose what suits you best.",
    contributionLabel: "Contribution",
    contributionDescription: "If you prefer, the gift can be in the form of a cash contribution.",
    bankNote: "If it suits you better, you can also send a bank transfer:",
    iban: "FR76 0000 0000 0000 0000 0000 000",
  },
  ceremony: {
    title: "Wedding Ceremony",
    time: "16:00",
    name: "Mairie du 19ème Arrondissement",
    addressLine1: "5–7 Place Armand Carrel",
    addressLine2: "75019 Paris, France",
    description:
      "Join us as we exchange our vows in an intimate ceremony surrounded by family and friends.",
    mapUrl: "https://maps.google.com/?q=Mairie+du+19eme+Paris",
    calendarUrl: "#",
  },
  dressCode: {
    title: "Formal — Black Tie Optional",
    description: "We kindly invite our guests to dress elegantly for the occasion.",
  },
  travel: {
    hotels: [
      { id: "h-1", name: "Grand Hotel", rating: "5 Star", distance: "5 minutes from venue", note: "Special rate for wedding guests" },
      { id: "h-2", name: "Boutique Inn", rating: "4 Star", distance: "10 minutes from venue", note: "Charming and intimate" },
      { id: "h-3", name: "City Center Hotel", rating: "4 Star", distance: "15 minutes from venue", note: "Great for exploring the city" },
    ],
    byAir:
      "The nearest airport is approximately 30 minutes from the venue. We recommend booking your flight early.",
    byCar:
      "Complimentary parking will be available at the venue. GPS coordinates will be shared closer to the date.",
    thingsToDo: ["Historic Old Town", "Beautiful Beaches", "Local Markets", "Fine Dining"],
    contactEmail: "wedding@example.com",
    contactPhone: "+1 (234) 567-890",
  },
  adminPin: "1234",
};
