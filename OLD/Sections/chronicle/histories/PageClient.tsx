'use client'

import { ArtifactRecordSection } from './sections/ArtifactRecordSection'
import { DecisionsThatShapedItSection } from './sections/DecisionsThatShapedItSection'
import { EchoInThePresentSection } from './sections/EchoInThePresentSection'
import { EventsThatDefinedItSection } from './sections/EventsThatDefinedItSection'
import { LineageSection } from './sections/LineageSection'
import { MachinesInvolvedSection } from './sections/MachinesInvolvedSection'
import { MemoryAndLegacySection } from './sections/MemoryAndLegacySection'
import { OriginSection } from './sections/OriginSection'
import { PeopleWhoMadeItSection } from './sections/PeopleWhoMadeItSection'

interface PageClientProps {
  pageData: any
}

export function PageClient({ pageData }: PageClientProps) {
  const sections = pageData?.sections || []

  return (
    <main>
      {sections.map((section: any, index: number) => {
        switch(section.blockType) {
          case 'ArtifactRecordSection':
            return <ArtifactRecordSection key={index} data={section} />
          case 'DecisionsThatShapedItSection':
            return <DecisionsThatShapedItSection key={index} data={section} />
          case 'EchoInThePresentSection':
            return <EchoInThePresentSection key={index} data={section} />
          case 'EventsThatDefinedItSection':
            return <EventsThatDefinedItSection key={index} data={section} />
          case 'LineageSection':
            return <LineageSection key={index} data={section} />
          case 'MachinesInvolvedSection':
            return <MachinesInvolvedSection key={index} data={section} />
          case 'MemoryAndLegacySection':
            return <MemoryAndLegacySection key={index} data={section} />
          case 'OriginSection':
            return <OriginSection key={index} data={section} />
          case 'PeopleWhoMadeItSection':
            return <PeopleWhoMadeItSection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
