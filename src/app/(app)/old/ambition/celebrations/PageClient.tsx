'use client'

import { AchievementBehindItSection } from './sections/AchievementBehindItSection'
import { CommunityThatCelebratedSection } from './sections/CommunityThatCelebratedSection'
import { JourneyThatLedHereSection } from './sections/JourneyThatLedHereSection'
import { OccasionSection } from './sections/OccasionSection'
import { PeopleBeingCelebratedSection } from './sections/PeopleBeingCelebratedSection'
import { VisualMemorySection } from './sections/VisualMemorySection'
import { WhatThisCelebrationSignalsSection } from './sections/WhatThisCelebrationSignalsSection'

interface PageClientProps {
  pageData: any
}

export function PageClient({ pageData }: PageClientProps) {
  const sections = pageData?.sections || []

  return (
    <main>
      {sections.map((section: any, index: number) => {
        switch(section.blockType) {
          case 'AchievementBehindItSection':
            return <AchievementBehindItSection key={index} data={section} />
          case 'CommunityThatCelebratedSection':
            return <CommunityThatCelebratedSection key={index} data={section} />
          case 'JourneyThatLedHereSection':
            return <JourneyThatLedHereSection key={index} data={section} />
          case 'OccasionSection':
            return <OccasionSection key={index} data={section} />
          case 'PeopleBeingCelebratedSection':
            return <PeopleBeingCelebratedSection key={index} data={section} />
          case 'VisualMemorySection':
            return <VisualMemorySection key={index} data={section} />
          case 'WhatThisCelebrationSignalsSection':
            return <WhatThisCelebrationSignalsSection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
