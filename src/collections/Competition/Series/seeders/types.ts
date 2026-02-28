// FILE: src/collections/Competition/Series/seeders/types.ts
export interface Series {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  alias?: string | null;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    identifiers?: {
      code?: string | null;
      abbreviation?: string | null;
    };
    tagline?: string | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    status?: ('Active' | 'Inactive' | 'Defunct' | 'Upcoming' | 'Rebranded' | 'Merged' | 'Sanctioned') | null;
    attributes?: {
      classification?: (number | Classification)[] | null;
      features?: (number | Feature)[] | null;
    };
    content?: {
      history?: (number | null) | History;
      narrative?: (number | null) | Narrative;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    specifications?: (number | Specification)[] | null;
    heritage?: {
      predecessor?: (number | null) | Series;
      successor?: (number | null) | Series;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  metrics?: {
    enable?: boolean | null;
    schedule?: (number | null) | Schedule;
    locations?: (number | Location)[] | null;
    counts?: {
      seasons?: number | null;
      events?: number | null;
      participants?: number | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets: {
    enable?: boolean | null;
    logo: number | Media;
    cover?: (number | null) | Media;
    archive?: (number | Archive)[] | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    connections?: {
      organizations?: (number | Organization)[] | null;
      individuals?: (number | Individual)[] | null;
    };
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
