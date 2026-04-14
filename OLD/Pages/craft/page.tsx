import { GearSection } from "./sections/GearsSection";
import { InnovationsSection } from "./sections/InnovationsSection";
import { MachinesSection } from "./sections/MachinesSection";
import { TechnicalSection } from "./sections/TechnicalSection";

export default function Page() {
  return (
    <main>
      <MachinesSection />
      <InnovationsSection />
      <TechnicalSection />
      <GearSection />
    </main>
  )
}