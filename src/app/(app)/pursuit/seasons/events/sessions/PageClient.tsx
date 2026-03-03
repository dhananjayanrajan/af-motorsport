'use client'

import { CrewOperationSection } from './sections/CrewOperationSection'
import { EntriesSection } from './sections/EntriesSection'
import { HighlightsSection } from './sections/HighlightsSection'
import { IncidentsSection } from './sections/IncidentsSection'
import { LapDataSection } from './sections/LapDataSection'
import { ParametersSection } from './sections/ParametersSection'
import { SessionSection } from './sections/SessionSection'
import { StrategyEmployedSection } from './sections/StrategyEmployedSection'
import { VisualRecordSection } from './sections/VisualRecordSection'

interface PageClientProps {
  pageData: any
}

export function PageClient({ pageData }: PageClientProps) {
  const sections = pageData?.sections || []

  return (
    <main>
      {sections.map((section: any, index: number) => {
        switch(section.blockType) {
          case 'CrewOperationSection':
            return <CrewOperationSection key={index} data={section} />
          case 'EntriesSection':
            return <EntriesSection key={index} data={section} />
          case 'HighlightsSection':
            return <HighlightsSection key={index} data={section} />
          case 'IncidentsSection':
            return <IncidentsSection key={index} data={section} />
          case 'LapDataSection':
            return <LapDataSection key={index} data={section} />
          case 'ParametersSection':
            return <ParametersSection key={index} data={section} />
          case 'SessionSection':
            return <SessionSection key={index} data={section} />
          case 'StrategyEmployedSection':
            return <StrategyEmployedSection key={index} data={section} />
          case 'VisualRecordSection':
            return <VisualRecordSection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
