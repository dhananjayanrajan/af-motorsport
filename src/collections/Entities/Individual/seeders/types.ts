// FILE: src/collections/Entities/Individual/seeders/types.ts
export interface Individual {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  first: string;
  middle?: string | null;
  last: string;
  alias?: string | null;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    identifier?: {
      nickname?: string | null;
      code?: string | null;
      number?: string | null;
    };
    tagline?: string | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    interests?: {
      list?:
      | {
        interest?: string | null;
        level?: ('Casual' | 'Enthusiast' | 'Expert' | 'Professional') | null;
        duration?: string | null;
        settings?: {
          show?: boolean | null;
          featured?: boolean | null;
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    about?: {
      background?: string | null;
      narrative?: (number | null) | Narrative;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    identity?: {
      gender?: ('Male' | 'Female' | 'NonBinary' | 'Undisclosed') | null;
      pronouns?: string | null;
      age?: number | null;
      nationality?: string | null;
    };
    influence?: {
      reach?: ('Local' | 'Regional' | 'National' | 'Global') | null;
      authority?: ('None' | 'Low' | 'Medium' | 'High') | null;
      network?: ('Small' | 'Moderate' | 'Extensive' | 'Vast') | null;
    };
    communication?: {
      channels?: (number | Channel)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  metrics?: {
    enable?: boolean | null;
    benefits?: {
      benefit?: string | null;
      type?: ('Access' | 'Discount' | 'Information' | 'Collaboration') | null;
      impact?: ('Minor' | 'Moderate' | 'Significant' | 'Strategic') | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets: {
    enable?: boolean | null;
    avatar: number | Media;
    gallery?: (number | Gallery)[] | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    history?: (number | null) | History;
    notes?: (number | Note)[] | null;
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
