// FILE: src/collections/Outcomes/Impact/seeders/types.ts
export interface Impact {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    scope?: {
      significance?: string | null;
      scale?: ('Local' | 'Regional' | 'National' | 'Global' | 'Organization' | 'Event') | null;
      depth?: ('Surface' | 'Moderate' | 'Deep' | 'Fundamental' | 'Profound') | null;
      rarity?: ('Common' | 'Uncommon' | 'Rare' | 'VeryRare' | 'Unique') | null;
    };
    content?: {
      notes?: (number | Note)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    tone?: (number | null) | Tone;
    velocity?: ('Immediate' | 'Rapid' | 'Gradual' | 'Delayed') | null;
    gravity?: ('Catastrophic' | 'Severe' | 'Moderate' | 'Minor' | 'Negligible' | 'Major') | null;
    permanence?: ('Permanent' | 'LongTerm' | 'Temporary' | 'Reversible') | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    connections?: {
      drivers?: (number | Driver)[] | null;
      members?: (number | Member)[] | null;
      leaders?: (number | Leader)[] | null;
    };
    associations?: {
      organizations?: (number | Organization)[] | null;
      individuals?: (number | Individual)[] | null;
    };
    references?: {
      cars?: (number | Car)[] | null;
      kits?: (number | Kit)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    image?: (number | null) | Media;
    description?: string | null;
  };
  generateSlug?: boolean | null;
  slug?: string | null;
  categories?: (number | Category)[] | null;
  tags?: (number | Tag)[] | null;
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
