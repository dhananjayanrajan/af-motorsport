'use client'

import { ApplySection } from './sections/ApplySection'
import { GrowthThisRoleOffersSection } from './sections/GrowthThisRoleOffersSection'
import { InitiativesYouWillDriveSection } from './sections/InitiativesYouWillDriveSection'
import { LifeInsideSection } from './sections/LifeInsideSection'
import { MachinesYouWillWorkOnSection } from './sections/MachinesYouWillWorkOnSection'
import { PartnersAroundYouSection } from './sections/PartnersAroundYouSection'
import { PeopleYouWillWorkWithSection } from './sections/PeopleYouWillWorkWithSection'
import { WhatItDemandsSection } from './sections/WhatItDemandsSection'
import { WhyThisRoleExistsSection } from './sections/WhyThisRoleExistsSection'

interface PageClientProps {
  pageData: any
}

export function PageClient({ pageData }: PageClientProps) {
  const sections = pageData?.sections || []

  return (
    <main>
      {sections.map((section: any, index: number) => {
        switch(section.blockType) {
          case 'ApplySection':
            return <ApplySection key={index} data={section} />
          case 'GrowthThisRoleOffersSection':
            return <GrowthThisRoleOffersSection key={index} data={section} />
          case 'InitiativesYouWillDriveSection':
            return <InitiativesYouWillDriveSection key={index} data={section} />
          case 'LifeInsideSection':
            return <LifeInsideSection key={index} data={section} />
          case 'MachinesYouWillWorkOnSection':
            return <MachinesYouWillWorkOnSection key={index} data={section} />
          case 'PartnersAroundYouSection':
            return <PartnersAroundYouSection key={index} data={section} />
          case 'PeopleYouWillWorkWithSection':
            return <PeopleYouWillWorkWithSection key={index} data={section} />
          case 'WhatItDemandsSection':
            return <WhatItDemandsSection key={index} data={section} />
          case 'WhyThisRoleExistsSection':
            return <WhyThisRoleExistsSection key={index} data={section} />
          default:
            return null
        }
      })}
    </main>
  )
}
