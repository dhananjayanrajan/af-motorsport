'use client'

import { AchievementsSection } from './sections/AchievementsSection'
import { BattlesAlongTheWaySection } from './sections/BattlesAlongTheWaySection'
import { BeginningSection } from './sections/BeginningSection'
import { GrowthSection } from './sections/GrowthSection'
import { LegacySection } from './sections/LegacySection'
import { MachinesThatWerePartOfItSection } from './sections/MachinesThatWerePartOfItSection'
import { PeopleWhoShapedItSection } from './sections/PeopleWhoShapedItSection'
import { RelationshipsItBuiltSection } from './sections/RelationshipsItBuiltSection'
import { TurningPointsSection } from './sections/TurningPointsSection'
import { VisualArcSection } from './sections/VisualArcSection'

interface PageClientProps {
  pageData: any
}

export function PageClient({ pageData }: PageClientProps) {
  const sections = pageData?.sections || []

  return (
    <main>
      {sections.map((section: any, index: number) => {
        switch(section.blockType) {
          case 'AchievementsSection':
            return <AchievementsSection key={index} data={section} />
          case 'BattlesAlongTheWaySection':
            return <BattlesAlongTheWaySection key={index} data={section} />
          case 'BeginningSection':
            return <BeginningSection key={index} data={section} />
          case 'GrowthSection':
            return <GrowthSection key={index} data={section} />
          case 'LegacySection':
            return <LegacySection key={index} data={section} />
          case 'MachinesThatWerePartOfItSection':
            return <MachinesThatWerePartOfItSection key={index} data={section} />
          case 'PeopleWhoShapedItSection':
            return <PeopleWhoShapedItSection key={index} data={section} />
          case 'RelationshipsItBuiltSection':
            return <RelationshipsItBuiltSection key={index} data={section} />
          case 'TurningPointsSection':
            return <TurningPointsSection key={index} data={section} />
          case 'VisualArcSection':
            return <VisualArcSection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
