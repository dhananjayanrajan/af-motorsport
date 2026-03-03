'use client'

import { CalendarSection } from './sections/CalendarSection'
import { ChampionshipFightSection } from './sections/ChampionshipFightSection'
import { ChampionshipStorySection } from './sections/ChampionshipStorySection'
import { InsideStorySection } from './sections/InsideStorySection'
import { KeyTurningPointsSection } from './sections/KeyTurningPointsSection'
import { MachinesOfThisYearSection } from './sections/MachinesOfThisYearSection'
import { TechnicalLandscapeSection } from './sections/TechnicalLandscapeSection'
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
          case 'CalendarSection':
            return <CalendarSection key={index} data={section} />
          case 'ChampionshipFightSection':
            return <ChampionshipFightSection key={index} data={section} />
          case 'ChampionshipStorySection':
            return <ChampionshipStorySection key={index} data={section} />
          case 'InsideStorySection':
            return <InsideStorySection key={index} data={section} />
          case 'KeyTurningPointsSection':
            return <KeyTurningPointsSection key={index} data={section} />
          case 'MachinesOfThisYearSection':
            return <MachinesOfThisYearSection key={index} data={section} />
          case 'TechnicalLandscapeSection':
            return <TechnicalLandscapeSection key={index} data={section} />
          case 'VisualChronicleSection':
            return <VisualChronicleSection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
