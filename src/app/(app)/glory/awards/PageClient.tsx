'use client'

import { CelebrationsItSparkedSection } from './sections/CelebrationsItSparkedSection'
import { DecisionsThatEarnedItSection } from './sections/DecisionsThatEarnedItSection'
import { MachinesThatWonItSection } from './sections/MachinesThatWonItSection'
import { PartnersWhoBelievedSection } from './sections/PartnersWhoBelievedSection'
import { PrizeSection } from './sections/PrizeSection'
import { RollOfHonourSection } from './sections/RollOfHonourSection'
import { VisualLegacySection } from './sections/VisualLegacySection'
import { WeightOfItSection } from './sections/WeightOfItSection'
import { WhatItTookSection } from './sections/WhatItTookSection'

interface PageClientProps {
  pageData: any
}

export function PageClient({ pageData }: PageClientProps) {
  const sections = pageData?.sections || []

  return (
    <main>
      {sections.map((section: any, index: number) => {
        switch(section.blockType) {
          case 'CelebrationsItSparkedSection':
            return <CelebrationsItSparkedSection key={index} data={section} />
          case 'DecisionsThatEarnedItSection':
            return <DecisionsThatEarnedItSection key={index} data={section} />
          case 'MachinesThatWonItSection':
            return <MachinesThatWonItSection key={index} data={section} />
          case 'PartnersWhoBelievedSection':
            return <PartnersWhoBelievedSection key={index} data={section} />
          case 'PrizeSection':
            return <PrizeSection key={index} data={section} />
          case 'RollOfHonourSection':
            return <RollOfHonourSection key={index} data={section} />
          case 'VisualLegacySection':
            return <VisualLegacySection key={index} data={section} />
          case 'WeightOfItSection':
            return <WeightOfItSection key={index} data={section} />
          case 'WhatItTookSection':
            return <WhatItTookSection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
