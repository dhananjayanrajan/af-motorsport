import VaultSection from "../sections/CelebrationsSection";
import { ConquestsSection } from "../sections/ConquestsSection";
import { DefiningStrategySection } from "../sections/DefiningStrategySection";
import { GloryNumbersSection } from "../sections/GloryNumbersSection";
import { LegendSection } from "../sections/LegendSection";
import { MachinesThatCarriedThemSection } from "../sections/MachinesThatCarriedThemSection";
import { RivalsOvercomeSection } from "../sections/RivalsOvercomeSection";
import { TeamBehindTheGlorySection } from "../sections/TeamBehindTheGlorySection";
import { VisualMonumentSection } from "../sections/VisualMonumentSection";

export default function Page() {
  return (
    <main>
      <LegendSection />
      <ConquestsSection />
      <GloryNumbersSection />
      <RivalsOvercomeSection />
      <MachinesThatCarriedThemSection />
      <TeamBehindTheGlorySection />
      <DefiningStrategySection />
      <VaultSection />
      <VisualMonumentSection />
    </main>
  )
}