'use client'

import { CelebrationsSection } from './sections/CelebrationsSection'
import { ConquestsSection } from './sections/ConquestsSection'
import { DefiningStrategySection } from './sections/DefiningStrategySection'
import { GloryNumbersSection } from './sections/GloryNumbersSection'
import { LegendSection } from './sections/LegendSection'
import { MachinesThatCarriedThemSection } from './sections/MachinesThatCarriedThemSection'
import { RivalsOvercomeSection } from './sections/RivalsOvercomeSection'
import { TeamBehindTheGlorySection } from './sections/TeamBehindTheGlorySection'
import { VisualMonumentSection } from './sections/VisualMonumentSection'
import { VoiceOfAChampionSection } from './sections/VoiceOfAChampionSection'

interface PageClientProps {
  pageData: any
}

export function PageClient({ pageData }: PageClientProps) {
  const sections = pageData?.sections || []

  return (
    <main>
      {sections.map((section: any, index: number) => {
        switch(section.blockType) {
          case 'CelebrationsSection':
            return <CelebrationsSection key={index} data={section} />
          case 'ConquestsSection':
            return <ConquestsSection key={index} data={section} />
          case 'DefiningStrategySection':
            return <DefiningStrategySection key={index} data={section} />
          case 'GloryNumbersSection':
            return <GloryNumbersSection key={index} data={section} />
          case 'LegendSection':
            return <LegendSection key={index} data={section} />
          case 'MachinesThatCarriedThemSection':
            return <MachinesThatCarriedThemSection key={index} data={section} />
          case 'RivalsOvercomeSection':
            return <RivalsOvercomeSection key={index} data={section} />
          case 'TeamBehindTheGlorySection':
            return <TeamBehindTheGlorySection key={index} data={section} />
          case 'VisualMonumentSection':
            return <VisualMonumentSection key={index} data={section} />
          case 'VoiceOfAChampionSection':
            return <VoiceOfAChampionSection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
