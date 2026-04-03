"use client";

import { BattlesSection } from "./sections/BattlesSection";
import { LegendSection } from "./sections/LegendSection";
import { TrophiesSection } from "./sections/TrophiesSection";

export default function Page() {
  return (
    <main>
      <LegendSection />
      <BattlesSection />
      <TrophiesSection />
    </main>
  )
}