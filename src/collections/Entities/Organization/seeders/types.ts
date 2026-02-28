// FILE: src/collections/Entities/Organization/seeders/types.ts
export interface Organization {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  alias?: string | null;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    identifier?: {
      code?: string | null;
      abbreviation?: string | null;
      registration?: string | null;
    };
    tagline?: string | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    headquarters?: (number | Location)[] | null;
    evolution?: {
      founded?: string | null;
      merged?: string | null;
      rebranded?: string | null;
      defunct?: string | null;
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
    reputation?: {
      prestige?: ('Unknown' | 'Emerging' | 'Established' | 'Prestigious' | 'Iconic') | null;
      reliability?: ('Unproven' | 'Developing' | 'Reliable' | 'Exceptional') | null;
      innovation?: ('Conservative' | 'Adaptive' | 'Innovative' | 'Revolutionary') | null;
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
      list?:
      | {
        benefit?: string | null;
        type?: ('Financial' | 'Technical' | 'Marketing' | 'Operational') | null;
        impact?: ('Minor' | 'Moderate' | 'Significant' | 'Strategic') | null;
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
  assets: {
    enable?: boolean | null;
    logo: number | Media;
    gallery?: (number | null) | Gallery;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    associations?: {
      list?:
      | {
        branch?: (number | null) | Location;
        parent?: (number | null) | Organization;
        settings?: {
          show?: boolean | null;
          featured?: boolean | null;
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    content?: {
      history?: (number | null) | History;
      notes?: (number | Note)[] | null;
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
