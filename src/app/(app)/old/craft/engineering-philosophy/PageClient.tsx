'use client'

import { EngineeringCreedSection } from './sections/EngineeringCreedSection'
import { EvolutionOfThinkingSection } from './sections/EvolutionOfThinkingSection'
import { FailuresThatRefinedItSection } from './sections/FailuresThatRefinedItSection'
import { InnovationsItGeneratedSection } from './sections/InnovationsItGeneratedSection'
import { MachinesItProducedSection } from './sections/MachinesItProducedSection'
import { PartnersWhoExtendItSection } from './sections/PartnersWhoExtendItSection'
import { PeopleWhoEmbodyItSection } from './sections/PeopleWhoEmbodyItSection'
import { TechnicalVisualWorldSection } from './sections/TechnicalVisualWorldSection'
import { TestingGroundSection } from './sections/TestingGroundSection'

interface PageClientProps {
  pageData: any
}

export function PageClient({ pageData }: PageClientProps) {
  const sections = pageData?.sections || []

  return (
    <main>
      {sections.map((section: any, index: number) => {
        switch(section.blockType) {
          case 'EngineeringCreedSection':
            return <EngineeringCreedSection key={index} data={section} />
          case 'EvolutionOfThinkingSection':
            return <EvolutionOfThinkingSection key={index} data={section} />
          case 'FailuresThatRefinedItSection':
            return <FailuresThatRefinedItSection key={index} data={section} />
          case 'InnovationsItGeneratedSection':
            return <InnovationsItGeneratedSection key={index} data={section} />
          case 'MachinesItProducedSection':
            return <MachinesItProducedSection key={index} data={section} />
          case 'PartnersWhoExtendItSection':
            return <PartnersWhoExtendItSection key={index} data={section} />
          case 'PeopleWhoEmbodyItSection':
            return <PeopleWhoEmbodyItSection key={index} data={section} />
          case 'TechnicalVisualWorldSection':
            return <TechnicalVisualWorldSection key={index} data={section} />
          case 'TestingGroundSection':
            return <TestingGroundSection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
