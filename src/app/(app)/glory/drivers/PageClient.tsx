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
    <div>
      {/* TEMPORARY: Show all sections for testing */}
      <LegendSection />
      <ConquestsSection />
      <CelebrationsSection />
      <DefiningStrategySection />
      <GloryNumbersSection />
      <MachinesThatCarriedThemSection />
      <RivalsOvercomeSection />
      <TeamBehindTheGlorySection />
      <VisualMonumentSection />
      <VoiceOfAChampionSection />

      {/* Your original mapped sections */}
      {sections.map((section: any, index: number) => {
        // ... existing code
      })}
    </div>
  )
}