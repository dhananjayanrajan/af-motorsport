import { ExtendedFamilySection } from "./sections/ExtendedFamily";
import { PeopleSection } from "./sections/PeopleSection";
import { SkillsSection } from "./sections/SkillsSection";
import { TeamSpiritSection } from "./sections/TeamSpiritSection";

export default function Page() {
  return (
    <main>
      <PeopleSection />
      <SkillsSection />
      <TeamSpiritSection />
      <ExtendedFamilySection />
    </main>
  )
}