import { NetworkSection } from "./sections/NetworkSection";
import { SharedVictoriesSection } from "./sections/SharedVictoriesSection";
import { StrategicPartnersSection } from "./sections/StrategicPartnersSection";

export default function Page() {
  return (
    <main>
      <StrategicPartnersSection />
      <SharedVictoriesSection />
      <NetworkSection />
    </main>
  )
}