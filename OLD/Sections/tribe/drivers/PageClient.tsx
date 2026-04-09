'use client'

import { HumanBeingSection } from './sections/HumanBeingSection'
import { HumanSideOfNumbersSection } from './sections/HumanSideOfNumbersSection'
import { InnerWorldSection } from './sections/InnerWorldSection'
import { JourneyThatShapedThemSection } from './sections/JourneyThatShapedThemSection'
import { RelationshipsThatDefineThemSection } from './sections/RelationshipsThatDefineThemSection'
import { SkillsTheyCarrySection } from './sections/SkillsTheyCarrySection'
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
          case 'HumanBeingSection':
            return <HumanBeingSection key={index} data={section} />
          case 'HumanSideOfNumbersSection':
            return <HumanSideOfNumbersSection key={index} data={section} />
          case 'InnerWorldSection':
            return <InnerWorldSection key={index} data={section} />
          case 'JourneyThatShapedThemSection':
            return <JourneyThatShapedThemSection key={index} data={section} />
          case 'RelationshipsThatDefineThemSection':
            return <RelationshipsThatDefineThemSection key={index} data={section} />
          case 'SkillsTheyCarrySection':
            return <SkillsTheyCarrySection key={index} data={section} />
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
