"use client";

import InfiniteMenu from "@/components/InfiniteMenu";
import { BattlesSection } from "./sections/BattlesSection";
import { GloryNumbersSection } from "./sections/GloryNumbersSection";
import { LegendSection } from "./sections/LegendSection";
import { RivalsOvercomeSection } from "./sections/RivalsOvercomeSection";
import { TrophiesSection } from "./sections/TrophiesSection";

const items = [
  {
    image: 'https://picsum.photos/300/300?grayscale',
    link: 'https://google.com/',
    title: 'Item 1',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/400/400?grayscale',
    link: 'https://google.com/',
    title: 'Item 2',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/500/500?grayscale',
    link: 'https://google.com/',
    title: 'Item 3',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/600/600?grayscale',
    link: 'https://google.com/',
    title: 'Item 4',
    description: 'This is pretty cool, right?'
  }
];

export default function Page() {
  return (
    <main>
      <LegendSection />
      <BattlesSection />
      <TrophiesSection />
      <GloryNumbersSection />
      <RivalsOvercomeSection />
      <div style={{ height: '600px', position: 'relative' }}>
        <InfiniteMenu items={items}
          scale={1}
        />
      </div>
    </main>
  )
}