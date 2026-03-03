'use client'

import { AssignmentsThatShapedThemSection } from './sections/AssignmentsThatShapedThemSection'
import { CraftAsIdentitySection } from './sections/CraftAsIdentitySection'
import { JourneyIntoCraftSection } from './sections/JourneyIntoCraftSection'
import { PersonSection } from './sections/PersonSection'
import { RelationshipsInThePitLaneSection } from './sections/RelationshipsInThePitLaneSection'
import { TrainingThatBuiltThemSection } from './sections/TrainingThatBuiltThemSection'
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
          case 'AssignmentsThatShapedThemSection':
            return <AssignmentsThatShapedThemSection key={index} data={section} />
          case 'CraftAsIdentitySection':
            return <CraftAsIdentitySection key={index} data={section} />
          case 'JourneyIntoCraftSection':
            return <JourneyIntoCraftSection key={index} data={section} />
          case 'PersonSection':
            return <PersonSection key={index} data={section} />
          case 'RelationshipsInThePitLaneSection':
            return <RelationshipsInThePitLaneSection key={index} data={section} />
          case 'TrainingThatBuiltThemSection':
            return <TrainingThatBuiltThemSection key={index} data={section} />
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
