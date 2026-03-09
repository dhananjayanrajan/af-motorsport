import { AtmosphereSection } from "./sections/AtmosphereSection";
import { MachinesInBattleSection } from "./sections/MachinesInBattleSection";
import { StrategyWarSection } from "./sections/StrategyWarSection";


export default function Page() {
  return (
    <main>
      {/* <StageSetSection /> */}
      <AtmosphereSection />
      <StrategyWarSection />
      <MachinesInBattleSection />
    </main>
  )
}