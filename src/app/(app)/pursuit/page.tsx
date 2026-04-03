import { CalendarSection } from "./sections/CalendarSection"
import { ChampionshipSection } from "./sections/ChampionshipSection"
import { SessionHighlightsSection } from "./sections/SessionHighlightsSection"

export default function Page() {
  return (
    <main>
      <ChampionshipSection />
      <SessionHighlightsSection />
      <CalendarSection />
    </main>
  )
}