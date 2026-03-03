'use client'

import { EngineeringRoadmapSection } from './sections/EngineeringRoadmapSection'
import { EngineeringTeamSection } from './sections/EngineeringTeamSection'
import { InnovationBeingPursuedSection } from './sections/InnovationBeingPursuedSection'
import { MachinesItWillShapeSection } from './sections/MachinesItWillShapeSection'
import { ProgressAndResultsSection } from './sections/ProgressAndResultsSection'
import { TechnicalMissionSection } from './sections/TechnicalMissionSection'
import { TechnicalPartnersSection } from './sections/TechnicalPartnersSection'
import { TechnicalVisualRecordSection } from './sections/TechnicalVisualRecordSection'

interface PageClientProps {
  pageData: any
}

export function PageClient({ pageData }: PageClientProps) {
  const sections = pageData?.sections || []

  return (
    <main>
      {sections.map((section: any, index: number) => {
        switch(section.blockType) {
          case 'EngineeringRoadmapSection':
            return <EngineeringRoadmapSection key={index} data={section} />
          case 'EngineeringTeamSection':
            return <EngineeringTeamSection key={index} data={section} />
          case 'InnovationBeingPursuedSection':
            return <InnovationBeingPursuedSection key={index} data={section} />
          case 'MachinesItWillShapeSection':
            return <MachinesItWillShapeSection key={index} data={section} />
          case 'ProgressAndResultsSection':
            return <ProgressAndResultsSection key={index} data={section} />
          case 'TechnicalMissionSection':
            return <TechnicalMissionSection key={index} data={section} />
          case 'TechnicalPartnersSection':
            return <TechnicalPartnersSection key={index} data={section} />
          case 'TechnicalVisualRecordSection':
            return <TechnicalVisualRecordSection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
