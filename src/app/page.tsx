"use client";

import { Cover } from "@/components/Cover";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Program } from "@/components/Program";
import { Gifts } from "@/components/Gifts";
import { EventDetails } from "@/components/EventDetails";
import { Rsvp } from "@/components/Rsvp";
import { Travel } from "@/components/Travel";
import { Footer } from "@/components/Footer";
import { useContent } from "@/lib/store";

export default function Page() {
  const { content, hydrated } = useContent();

  if (!hydrated) {
    return (
      <main style={{ minHeight: "100vh", background: "var(--color-bg)" }} aria-hidden="true" />
    );
  }

  return (
    <main>
      <Cover monogram={content.couple.monogram} />
      <NavBar monogram={content.couple.monogram} />
      <Hero couple={content.couple} />
      <Story entries={content.story} />
      <Program entries={content.program} />
      <Gifts gift={content.gift} />
      <EventDetails ceremony={content.ceremony} dressCode={content.dressCode} />
      <Rsvp rsvpDeadline={content.couple.rsvpDeadline} />
      <Travel travel={content.travel} />
      <Footer couple={content.couple} />
    </main>
  );
}
