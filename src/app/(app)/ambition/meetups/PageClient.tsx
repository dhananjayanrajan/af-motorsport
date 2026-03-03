'use client'

import { AgendaSection } from './sections/AgendaSection'
import { EventSection } from './sections/EventSection'
import { HowToBePartOfItSection } from './sections/HowToBePartOfItSection'
import { InitiativesConnectedSection } from './sections/InitiativesConnectedSection'
import { LocationSection } from './sections/LocationSection'
import { MachinesOnShowSection } from './sections/MachinesOnShowSection'
import { PartnersInvolvedSection } from './sections/PartnersInvolvedSection'
import { VisualAtmosphereSection } from './sections/VisualAtmosphereSection'
import { WhoWillBeThere } from './sections/WhoWillBeThere'

interface PageClientProps {
  pageData: any
}

export function PageClient({ pageData }: PageClientProps) {
  const sections = pageData?.sections || []

  return (
    <main>
      {sections.map((section: any, index: number) => {
        switch(section.blockType) {
          case 'AgendaSection':
            return <AgendaSection key={index} data={section} />
          case 'EventSection':
            return <EventSection key={index} data={section} />
          case 'HowToBePartOfItSection':
            return <HowToBePartOfItSection key={index} data={section} />
          case 'InitiativesConnectedSection':
            return <InitiativesConnectedSection key={index} data={section} />
          case 'LocationSection':
            return <LocationSection key={index} data={section} />
          case 'MachinesOnShowSection':
            return <MachinesOnShowSection key={index} data={section} />
          case 'PartnersInvolvedSection':
            return <PartnersInvolvedSection key={index} data={section} />
          case 'VisualAtmosphereSection':
            return <VisualAtmosphereSection key={index} data={section} />
          case 'WhoWillBeThere':
            return <WhoWillBeThere key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
