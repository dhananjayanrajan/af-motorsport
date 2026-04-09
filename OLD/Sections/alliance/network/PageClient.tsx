'use client'

import { EcosystemEvolutionSection } from './sections/EcosystemEvolutionSection'
import { EcosystemOverviewSection } from './sections/EcosystemOverviewSection'
import { HumanConnectiveTissueSection } from './sections/HumanConnectiveTissueSection'
import { InitiativesBornFromAllianceSection } from './sections/InitiativesBornFromAllianceSection'
import { OperationalPartnersSection } from './sections/OperationalPartnersSection'
import { SharedWinsSection } from './sections/SharedWinsSection'
import { StrategicPartnersSection } from './sections/StrategicPartnersSection'
import { TechnicalPartnersSection } from './sections/TechnicalPartnersSection'
import { VisualNetworkSection } from './sections/VisualNetworkSection'

interface PageClientProps {
  pageData: any
}

export function PageClient({ pageData }: PageClientProps) {
  const sections = pageData?.sections || []

  return (
    <main>
      {sections.map((section: any, index: number) => {
        switch(section.blockType) {
          case 'EcosystemEvolutionSection':
            return <EcosystemEvolutionSection key={index} data={section} />
          case 'EcosystemOverviewSection':
            return <EcosystemOverviewSection key={index} data={section} />
          case 'HumanConnectiveTissueSection':
            return <HumanConnectiveTissueSection key={index} data={section} />
          case 'InitiativesBornFromAllianceSection':
            return <InitiativesBornFromAllianceSection key={index} data={section} />
          case 'OperationalPartnersSection':
            return <OperationalPartnersSection key={index} data={section} />
          case 'SharedWinsSection':
            return <SharedWinsSection key={index} data={section} />
          case 'StrategicPartnersSection':
            return <StrategicPartnersSection key={index} data={section} />
          case 'TechnicalPartnersSection':
            return <TechnicalPartnersSection key={index} data={section} />
          case 'VisualNetworkSection':
            return <VisualNetworkSection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
