'use client'

import { CharactersSection } from './sections/CharactersSection'
import { ConflictSection } from './sections/ConflictSection'
import { MachinesInTheStorySection } from './sections/MachinesInTheStorySection'
import { OpeningSection } from './sections/OpeningSection'
import { RelatedStoriesSection } from './sections/RelatedStoriesSection'
import { ResolutionSection } from './sections/ResolutionSection'
import { StakesSection } from './sections/StakesSection'
import { StorysPlaceInHistorySection } from './sections/StorysPlaceInHistorySection'
import { VisualNarrativeSection } from './sections/VisualNarrativeSection'
import { WorldItInhabitsSection } from './sections/WorldItInhabitsSection'

interface PageClientProps {
  pageData: any
}

export function PageClient({ pageData }: PageClientProps) {
  const sections = pageData?.sections || []

  return (
    <main>
      {sections.map((section: any, index: number) => {
        switch(section.blockType) {
          case 'CharactersSection':
            return <CharactersSection key={index} data={section} />
          case 'ConflictSection':
            return <ConflictSection key={index} data={section} />
          case 'MachinesInTheStorySection':
            return <MachinesInTheStorySection key={index} data={section} />
          case 'OpeningSection':
            return <OpeningSection key={index} data={section} />
          case 'RelatedStoriesSection':
            return <RelatedStoriesSection key={index} data={section} />
          case 'ResolutionSection':
            return <ResolutionSection key={index} data={section} />
          case 'StakesSection':
            return <StakesSection key={index} data={section} />
          case 'StorysPlaceInHistorySection':
            return <StorysPlaceInHistorySection key={index} data={section} />
          case 'VisualNarrativeSection':
            return <VisualNarrativeSection key={index} data={section} />
          case 'WorldItInhabitsSection':
            return <WorldItInhabitsSection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
