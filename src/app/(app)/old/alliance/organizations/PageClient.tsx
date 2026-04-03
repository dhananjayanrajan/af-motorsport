'use client'

import { EvolutionTogetherSection } from './sections/EvolutionTogetherSection'
import { ImpactOfAllianceSection } from './sections/ImpactOfAllianceSection'
import { OrganizationIdentitySection } from './sections/OrganizationIdentitySection'
import { OriginOfPartnershipSection } from './sections/OriginOfPartnershipSection'
import { PartnershipVoiceSection } from './sections/PartnershipVoiceSection'
import { PeopleBridgingTwoWorldsSection } from './sections/PeopleBridgingTwoWorldsSection'
import { SharedVictoriesSection } from './sections/SharedVictoriesSection'
import { SharedWorkSection } from './sections/SharedWorkSection'
import { TechnicalContributionSection } from './sections/TechnicalContributionSection'
import { VisualPartnershipStorySection } from './sections/VisualPartnershipStorySection'

interface PageClientProps {
  pageData: any
}

export function PageClient({ pageData }: PageClientProps) {
  const sections = pageData?.sections || []

  return (
    <main>
      {sections.map((section: any, index: number) => {
        switch(section.blockType) {
          case 'EvolutionTogetherSection':
            return <EvolutionTogetherSection key={index} data={section} />
          case 'ImpactOfAllianceSection':
            return <ImpactOfAllianceSection key={index} data={section} />
          case 'OrganizationIdentitySection':
            return <OrganizationIdentitySection key={index} data={section} />
          case 'OriginOfPartnershipSection':
            return <OriginOfPartnershipSection key={index} data={section} />
          case 'PartnershipVoiceSection':
            return <PartnershipVoiceSection key={index} data={section} />
          case 'PeopleBridgingTwoWorldsSection':
            return <PeopleBridgingTwoWorldsSection key={index} data={section} />
          case 'SharedVictoriesSection':
            return <SharedVictoriesSection key={index} data={section} />
          case 'SharedWorkSection':
            return <SharedWorkSection key={index} data={section} />
          case 'TechnicalContributionSection':
            return <TechnicalContributionSection key={index} data={section} />
          case 'VisualPartnershipStorySection':
            return <VisualPartnershipStorySection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
