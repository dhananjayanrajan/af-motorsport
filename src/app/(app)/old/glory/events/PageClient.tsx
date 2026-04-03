'use client'

import { AftermathSection } from './sections/AftermathSection'
import { AtmosphereSection } from './sections/AtmosphereSection'
import { LegendItBuiltSection } from './sections/LegendItBuiltSection'
import { MachinesInBattleSection } from './sections/MachinesInBattleSection'
import { PodiumSection } from './sections/PodiumSection'
import { StageSetSection } from './sections/StageSetSection'
import { StrategyWarSection } from './sections/StrategyWarSection'
import { TurningPointSection } from './sections/TurningPointSection'
import { VisualEvidenceSection } from './sections/VisualEvidenceSection'

interface PageClientProps {
  pageData: any
}

export function PageClient({ pageData }: PageClientProps) {
  const sections = pageData?.sections || []

  return (
    <main>
      {sections.map((section: any, index: number) => {
        switch(section.blockType) {
          case 'AftermathSection':
            return <AftermathSection key={index} data={section} />
          case 'AtmosphereSection':
            return <AtmosphereSection key={index} data={section} />
          case 'LegendItBuiltSection':
            return <LegendItBuiltSection key={index} data={section} />
          case 'MachinesInBattleSection':
            return <MachinesInBattleSection key={index} data={section} />
          case 'PodiumSection':
            return <PodiumSection key={index} data={section} />
          case 'StageSetSection':
            return <StageSetSection key={index} data={section} />
          case 'StrategyWarSection':
            return <StrategyWarSection key={index} data={section} />
          case 'TurningPointSection':
            return <TurningPointSection key={index} data={section} />
          case 'VisualEvidenceSection':
            return <VisualEvidenceSection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
