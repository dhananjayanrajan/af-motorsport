'use client'

import { DesignIntentSection } from './sections/DesignIntentSection'
import { DevelopmentHistorySection } from './sections/DevelopmentHistorySection'
import { InActionSection } from './sections/InActionSection'
import { MakersSection } from './sections/MakersSection'
import { MaterialScienceSection } from './sections/MaterialScienceSection'
import { PerformanceDataSection } from './sections/PerformanceDataSection'
import { TechnicalPartnersSection } from './sections/TechnicalPartnersSection'
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
          case 'DesignIntentSection':
            return <DesignIntentSection key={index} data={section} />
          case 'DevelopmentHistorySection':
            return <DevelopmentHistorySection key={index} data={section} />
          case 'InActionSection':
            return <InActionSection key={index} data={section} />
          case 'MakersSection':
            return <MakersSection key={index} data={section} />
          case 'MaterialScienceSection':
            return <MaterialScienceSection key={index} data={section} />
          case 'PerformanceDataSection':
            return <PerformanceDataSection key={index} data={section} />
          case 'TechnicalPartnersSection':
            return <TechnicalPartnersSection key={index} data={section} />
          case 'TechnicalVisualArchiveSection':
            return <TechnicalVisualArchiveSection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
