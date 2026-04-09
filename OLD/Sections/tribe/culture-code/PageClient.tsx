'use client'

import { BeliefSystemSection } from './sections/BeliefSystemSection'
import { DailyRealitySection } from './sections/DailyRealitySection'
import { DecisionsThatRevealCharacterSection } from './sections/DecisionsThatRevealCharacterSection'
import { MilestonesThatDefineUsSection } from './sections/MilestonesThatDefineUsSection'
import { PartnershipsTheCultureChoosesSection } from './sections/PartnershipsTheCultureChoosesSection'
import { PeopleWhoEmbodyTheCultureSection } from './sections/PeopleWhoEmbodyTheCultureSection'
import { RitualsAndRhythmsSection } from './sections/RitualsAndRhythmsSection'
import { SkillsTheCultureValuesSection } from './sections/SkillsTheCultureValuesSection'
import { VisualCultureSection } from './sections/VisualCultureSection'

interface PageClientProps {
  pageData: any
}

export function PageClient({ pageData }: PageClientProps) {
  const sections = pageData?.sections || []

  return (
    <main>
      {sections.map((section: any, index: number) => {
        switch(section.blockType) {
          case 'BeliefSystemSection':
            return <BeliefSystemSection key={index} data={section} />
          case 'DailyRealitySection':
            return <DailyRealitySection key={index} data={section} />
          case 'DecisionsThatRevealCharacterSection':
            return <DecisionsThatRevealCharacterSection key={index} data={section} />
          case 'MilestonesThatDefineUsSection':
            return <MilestonesThatDefineUsSection key={index} data={section} />
          case 'PartnershipsTheCultureChoosesSection':
            return <PartnershipsTheCultureChoosesSection key={index} data={section} />
          case 'PeopleWhoEmbodyTheCultureSection':
            return <PeopleWhoEmbodyTheCultureSection key={index} data={section} />
          case 'RitualsAndRhythmsSection':
            return <RitualsAndRhythmsSection key={index} data={section} />
          case 'SkillsTheCultureValuesSection':
            return <SkillsTheCultureValuesSection key={index} data={section} />
          case 'VisualCultureSection':
            return <VisualCultureSection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
