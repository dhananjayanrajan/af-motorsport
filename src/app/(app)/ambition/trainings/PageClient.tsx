'use client'

import { CohortSection } from './sections/CohortSection'
import { HowToJoinSection } from './sections/HowToJoinSection'
import { MachinesUsedSection } from './sections/MachinesUsedSection'
import { MethodsSection } from './sections/MethodsSection'
import { PeopleWhoDeliverItSection } from './sections/PeopleWhoDeliverItSection'
import { ProgramSection } from './sections/ProgramSection'
import { ScheduleSection } from './sections/ScheduleSection'
import { SkillsItBuildsSection } from './sections/SkillsItBuildsSection'
import { SuccessStoriesSection } from './sections/SuccessStoriesSection'
import { VisualWorldSection } from './sections/VisualWorldSection'

interface PageClientProps {
  pageData: any
}

export function PageClient({ pageData }: PageClientProps) {
  const sections = pageData?.sections || []

  return (
    <main>
      {sections.map((section: any, index: number) => {
        switch(section.blockType) {
          case 'CohortSection':
            return <CohortSection key={index} data={section} />
          case 'HowToJoinSection':
            return <HowToJoinSection key={index} data={section} />
          case 'MachinesUsedSection':
            return <MachinesUsedSection key={index} data={section} />
          case 'MethodsSection':
            return <MethodsSection key={index} data={section} />
          case 'PeopleWhoDeliverItSection':
            return <PeopleWhoDeliverItSection key={index} data={section} />
          case 'ProgramSection':
            return <ProgramSection key={index} data={section} />
          case 'ScheduleSection':
            return <ScheduleSection key={index} data={section} />
          case 'SkillsItBuildsSection':
            return <SkillsItBuildsSection key={index} data={section} />
          case 'SuccessStoriesSection':
            return <SuccessStoriesSection key={index} data={section} />
          case 'VisualWorldSection':
            return <VisualWorldSection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
