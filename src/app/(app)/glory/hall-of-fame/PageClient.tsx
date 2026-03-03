'use client'

import { GreatestDecisionsSection } from './sections/GreatestDecisionsSection'
import { GreatestMachinesSection } from './sections/GreatestMachinesSection'
import { GreatestMomentsSection } from './sections/GreatestMomentsSection'
import { GreatestPartnershipsSection } from './sections/GreatestPartnershipsSection'
import { GreatestRacesSection } from './sections/GreatestRacesSection'
import { GreatestRivalriesSection } from './sections/GreatestRivalriesSection'
import { GreatestSeasonsSection } from './sections/GreatestSeasonsSection'
import { GreatestTeamsSection } from './sections/GreatestTeamsSection'
import { InductedSection } from './sections/InductedSection'
import { NumbersThatDefinedUsSection } from './sections/NumbersThatDefinedUsSection'
import { RecordBreakersSection } from './sections/RecordBreakersSection'
import { VisualArchiveSection } from './sections/VisualArchiveSection'

interface PageClientProps {
  pageData: any
}

export function PageClient({ pageData }: PageClientProps) {
  const sections = pageData?.sections || []

  return (
    <main>
      {sections.map((section: any, index: number) => {
        switch(section.blockType) {
          case 'GreatestDecisionsSection':
            return <GreatestDecisionsSection key={index} data={section} />
          case 'GreatestMachinesSection':
            return <GreatestMachinesSection key={index} data={section} />
          case 'GreatestMomentsSection':
            return <GreatestMomentsSection key={index} data={section} />
          case 'GreatestPartnershipsSection':
            return <GreatestPartnershipsSection key={index} data={section} />
          case 'GreatestRacesSection':
            return <GreatestRacesSection key={index} data={section} />
          case 'GreatestRivalriesSection':
            return <GreatestRivalriesSection key={index} data={section} />
          case 'GreatestSeasonsSection':
            return <GreatestSeasonsSection key={index} data={section} />
          case 'GreatestTeamsSection':
            return <GreatestTeamsSection key={index} data={section} />
          case 'InductedSection':
            return <InductedSection key={index} data={section} />
          case 'NumbersThatDefinedUsSection':
            return <NumbersThatDefinedUsSection key={index} data={section} />
          case 'RecordBreakersSection':
            return <RecordBreakersSection key={index} data={section} />
          case 'VisualArchiveSection':
            return <VisualArchiveSection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
