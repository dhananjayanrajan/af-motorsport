'use client'

import { BattlegroundsSection } from './sections/BattlegroundsSection'
import { ChampionshipHistorySection } from './sections/ChampionshipHistorySection'
import { EvolutionOfRulesSection } from './sections/EvolutionOfRulesSection'
import { GovernanceStructureSection } from './sections/GovernanceStructureSection'
import { InsideStorySection } from './sections/InsideStorySection'
import { MachinesItDemandsSection } from './sections/MachinesItDemandsSection'
import { OriginAndPowerSection } from './sections/OriginAndPowerSection'
import { PowerHierarchySection } from './sections/PowerHierarchySection'
import { RivalriesItProducedSection } from './sections/RivalriesItProducedSection'
import { VisualChronicleSection } from './sections/VisualChronicleSection'

interface PageClientProps {
  pageData: any
}

export function PageClient({ pageData }: PageClientProps) {
  const sections = pageData?.sections || []

  return (
    <main>
      {sections.map((section: any, index: number) => {
        switch(section.blockType) {
          case 'BattlegroundsSection':
            return <BattlegroundsSection key={index} data={section} />
          case 'ChampionshipHistorySection':
            return <ChampionshipHistorySection key={index} data={section} />
          case 'EvolutionOfRulesSection':
            return <EvolutionOfRulesSection key={index} data={section} />
          case 'GovernanceStructureSection':
            return <GovernanceStructureSection key={index} data={section} />
          case 'InsideStorySection':
            return <InsideStorySection key={index} data={section} />
          case 'MachinesItDemandsSection':
            return <MachinesItDemandsSection key={index} data={section} />
          case 'OriginAndPowerSection':
            return <OriginAndPowerSection key={index} data={section} />
          case 'PowerHierarchySection':
            return <PowerHierarchySection key={index} data={section} />
          case 'RivalriesItProducedSection':
            return <RivalriesItProducedSection key={index} data={section} />
          case 'VisualChronicleSection':
            return <VisualChronicleSection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
