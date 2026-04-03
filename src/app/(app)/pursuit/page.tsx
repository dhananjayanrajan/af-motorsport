import { CalendarSection } from "./sections/CalendarSection"
import { ChampionshipSection } from "./sections/ChampionshipSection"
import { ConquestsSection } from "./sections/ConquestsSection"
import { SeasonRecapSection } from "./sections/SeasonRecapSection"

export default function Page() {
  return (
    <main>
      <ChampionshipSection />
      <ConquestsSection />
      <CalendarSection />
      <SeasonRecapSection />
    </main>
  )
}