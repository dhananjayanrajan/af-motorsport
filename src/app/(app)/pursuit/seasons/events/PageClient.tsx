'use client'

import { CrewOnTheGroundSection } from './sections/CrewOnTheGroundSection'
import { EntryListSection } from './sections/EntryListSection'
import { OperationalDecisionsSection } from './sections/OperationalDecisionsSection'
import { ResultsSection } from './sections/ResultsSection'
import { SessionBreakdownSection } from './sections/SessionBreakdownSection'
import { VisualRecordSection } from './sections/VisualRecordSection'
import { WeatherAndConditionsSection } from './sections/WeatherAndConditionsSection'
import { WeekendBriefSection } from './sections/WeekendBriefSection'

interface PageClientProps {
  pageData: any
}

export function PageClient({ pageData }: PageClientProps) {
  const sections = pageData?.sections || []

  return (
    <main>
      {sections.map((section: any, index: number) => {
        switch(section.blockType) {
          case 'CrewOnTheGroundSection':
            return <CrewOnTheGroundSection key={index} data={section} />
          case 'EntryListSection':
            return <EntryListSection key={index} data={section} />
          case 'OperationalDecisionsSection':
            return <OperationalDecisionsSection key={index} data={section} />
          case 'ResultsSection':
            return <ResultsSection key={index} data={section} />
          case 'SessionBreakdownSection':
            return <SessionBreakdownSection key={index} data={section} />
          case 'VisualRecordSection':
            return <VisualRecordSection key={index} data={section} />
          case 'WeatherAndConditionsSection':
            return <WeatherAndConditionsSection key={index} data={section} />
          case 'WeekendBriefSection':
            return <WeekendBriefSection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
