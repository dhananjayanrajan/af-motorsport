'use client'

import { BattleScarsSection } from './sections/BattleScarsSection'
import { BlueprintSection } from './sections/BlueprintSection'
import { CrewWhoBuildItSection } from './sections/CrewWhoBuildItSection'
import { DevelopmentLogSection } from './sections/DevelopmentLogSection'
import { DriversWhoTrustedItSection } from './sections/DriversWhoTrustedItSection'
import { EngineeringPhilosophySection } from './sections/EngineeringPhilosophySection'
import { PerformanceRecordSection } from './sections/PerformanceRecordSection'
import { TechnicalPartnershipsSection } from './sections/TechnicalPartnershipsSection'
import { TechnicalVisualArchiveSection } from './sections/TechnicalVisualArchiveSection'

interface PageClientProps {
  pageData: any
}

export function PageClient({ pageData }: PageClientProps) {
  const sections = pageData?.sections || []

  return (
    <main>
      {sections.map((section: any, index: number) => {
        switch(section.blockType) {
          case 'BattleScarsSection':
            return <BattleScarsSection key={index} data={section} />
          case 'BlueprintSection':
            return <BlueprintSection key={index} data={section} />
          case 'CrewWhoBuildItSection':
            return <CrewWhoBuildItSection key={index} data={section} />
          case 'DevelopmentLogSection':
            return <DevelopmentLogSection key={index} data={section} />
          case 'DriversWhoTrustedItSection':
            return <DriversWhoTrustedItSection key={index} data={section} />
          case 'EngineeringPhilosophySection':
            return <EngineeringPhilosophySection key={index} data={section} />
          case 'PerformanceRecordSection':
            return <PerformanceRecordSection key={index} data={section} />
          case 'TechnicalPartnershipsSection':
            return <TechnicalPartnershipsSection key={index} data={section} />
          case 'TechnicalVisualArchiveSection':
            return <TechnicalVisualArchiveSection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
