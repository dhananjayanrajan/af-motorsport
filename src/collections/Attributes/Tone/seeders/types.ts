// FILE: src/collections/Attributes/Tone/seeders/types.ts
export interface Tone {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  alias?: string | null;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    scope?: {
      significance?: string | null;
      scale?: ('Local' | 'Regional' | 'National' | 'Global') | null;
      depth?: ('Surface' | 'Moderate' | 'Deep' | 'Profound') | null;
    };
    qualities?: {
      list?:
      | {
        quality?: ('Positive' | 'Neutral' | 'Negative' | 'Mixed') | null;
        intensity?: ('Low' | 'Medium' | 'High' | 'Extreme') | null;
        mood?: ('Optimistic' | 'Somber' | 'Energetic' | 'Calm' | 'Tense' | 'Celebratory') | null;
        scale?: ('Minute' | 'Moderate' | 'Grand' | 'Epic') | null;
        settings?: {
          show?: boolean | null;
          featured?: boolean | null;
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
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
