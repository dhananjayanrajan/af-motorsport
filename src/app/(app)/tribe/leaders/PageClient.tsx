'use client'

import { CommandAsRelationshipSection } from './sections/CommandAsRelationshipSection'
import { DecisionsAsCharacterSection } from './sections/DecisionsAsCharacterSection'
import { InitiativesTheyChampionSection } from './sections/InitiativesTheyChampionSection'
import { InnerWorldSection } from './sections/InnerWorldSection'
import { JourneyThatMadeThemSection } from './sections/JourneyThatMadeThemSection'
import { PersonSection } from './sections/PersonSection'
import { RelationshipsTheyCultivateSection } from './sections/RelationshipsTheyCultivateSection'
import { VisualHumanStorySection } from './sections/VisualHumanStorySection'
import { VoiceSection } from './sections/VoiceSection'

interface PageClientProps {
  pageData: any
}

export function PageClient({ pageData }: PageClientProps) {
  const sections = pageData?.sections || []

  return (
    <main>
      {sections.map((section: any, index: number) => {
        switch(section.blockType) {
          case 'CommandAsRelationshipSection':
            return <CommandAsRelationshipSection key={index} data={section} />
          case 'DecisionsAsCharacterSection':
            return <DecisionsAsCharacterSection key={index} data={section} />
          case 'InitiativesTheyChampionSection':
            return <InitiativesTheyChampionSection key={index} data={section} />
          case 'InnerWorldSection':
            return <InnerWorldSection key={index} data={section} />
          case 'JourneyThatMadeThemSection':
            return <JourneyThatMadeThemSection key={index} data={section} />
          case 'PersonSection':
            return <PersonSection key={index} data={section} />
          case 'RelationshipsTheyCultivateSection':
            return <RelationshipsTheyCultivateSection key={index} data={section} />
          case 'VisualHumanStorySection':
            return <VisualHumanStorySection key={index} data={section} />
          case 'VoiceSection':
            return <VoiceSection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
