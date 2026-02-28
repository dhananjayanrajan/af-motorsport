// FILE: src/collections/Competition/Entry/seeders/types.ts
export interface Entry {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  session: number | Session;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    identifiers?: {
      number?: string | null;
      plate?: string | null;
    };
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    status?:
    | (
      | 'Entered'
      | 'Confirmed'
      | 'Withdrawn'
      | 'Disqualified'
      | 'DidNotStart'
      | 'DidNotFinish'
      | 'Classified'
      | 'NotClassified'
      | 'Provisional'
      | 'Excluded'
    )
    | null;
    attributes?: {
      classification?: (number | Classification)[] | null;
      preferences?: (number | Preference)[] | null;
      specifications?: (number | Specification)[] | null;
    };
    content?: {
      narrative?: (number | null) | Narrative;
      notes?: (number | Note)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    role?: ('Primary' | 'Reserve' | 'Test' | 'Development' | 'Rookie' | 'Veteran' | 'Guest') | null;
    eligibility?: {
      license?: string | null;
      waiver?: string | null;
      restriction?: string | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  metrics?: {
    enable?: boolean | null;
    positions?: {
      grid?: number | null;
      laps?: number | null;
      start?: number | null;
      finish?: number | null;
    };
    parameters?: {
      parameter?: (number | null) | Classification;
      value?: string | null;
      unit?: string | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets?: {
    enable?: boolean | null;
    thumbnail?: (number | null) | Media;
    livery?: (number | Media)[] | null;
    gallery?: (number | null) | Gallery;
    playlist?: (number | null) | Playlist;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    associations?: {
      drivers?: (number | Driver)[] | null;
      crew?: (number | null) | Member;
      car?: (number | null) | Car;
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
