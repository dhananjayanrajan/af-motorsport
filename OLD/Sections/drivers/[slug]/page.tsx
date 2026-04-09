import VaultSection from "../sections/CelebrationsSection";
import { DefiningStrategySection } from "../sections/DefiningStrategySection";
import DriverHeroSection from "../sections/DriverHeroSection";
import { GloryNumbersSection } from "../sections/GloryNumbersSection";
import { MachinesThatCarriedThemSection } from "../sections/MachinesThatCarriedThemSection";
import { RivalsOvercomeSection } from "../sections/RivalsOvercomeSection";
import { TeamBehindTheGlorySection } from "../sections/TeamBehindTheGlorySection";
import { VisualMonumentSection } from "../sections/VisualMonumentSection";

export default function Page() {
  return (
    <main>
      <DriverHeroSection />
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