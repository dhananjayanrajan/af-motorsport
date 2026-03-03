'use client'

import { FutureMachinesSection } from './sections/FutureMachinesSection'
import { HowToBePartOfItSection } from './sections/HowToBePartOfItSection'
import { MissionSection } from './sections/MissionSection'
import { OpportunityItCreatesSection } from './sections/OpportunityItCreatesSection'
import { PartnersMakingItPossibleSection } from './sections/PartnersMakingItPossibleSection'
import { ProgressSoFarSection } from './sections/ProgressSoFarSection'
import { RoadmapSection } from './sections/RoadmapSection'
import { TeamBuildingItSection } from './sections/TeamBuildingItSection'
import { VisualStorySection } from './sections/VisualStorySection'

interface PageClientProps {
  pageData: any
}

export function PageClient({ pageData }: PageClientProps) {
  const sections = pageData?.sections || []

  return (
    <main>
      {sections.map((section: any, index: number) => {
        switch(section.blockType) {
          case 'FutureMachinesSection':
            return <FutureMachinesSection key={index} data={section} />
          case 'HowToBePartOfItSection':
            return <HowToBePartOfItSection key={index} data={section} />
          case 'MissionSection':
            return <MissionSection key={index} data={section} />
          case 'OpportunityItCreatesSection':
            return <OpportunityItCreatesSection key={index} data={section} />
          case 'PartnersMakingItPossibleSection':
            return <PartnersMakingItPossibleSection key={index} data={section} />
          case 'ProgressSoFarSection':
            return <ProgressSoFarSection key={index} data={section} />
          case 'RoadmapSection':
            return <RoadmapSection key={index} data={section} />
          case 'TeamBuildingItSection':
            return <TeamBuildingItSection key={index} data={section} />
          case 'VisualStorySection':
            return <VisualStorySection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
