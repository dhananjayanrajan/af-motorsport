// FILE: src/collections/Competition/Season/seeders/types.ts
export interface Season {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  series: number | Series;
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
    attributes?: {
      classification?: (number | Classification)[] | null;
      regulations?: (number | Protocol)[] | null;
      schedules?: (number | Schedule)[] | null;
    };
    content?: {
      narrative?: (number | null) | Narrative;
      history?: (number | null) | History;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  metrics?: {
    enable?: boolean | null;
    counts?: {
      entries?: number | null;
      events?: number | null;
      races?: number | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets?: {
    enable?: boolean | null;
    cover?: (number | null) | Media;
    gallery?: (number | null) | Gallery;
    playlist?: (number | null) | Playlist;
    archive?: (number | Archive)[] | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    authorities?: {
      organizations?: (number | Organization)[] | null;
      individuals?: (number | Individual)[] | null;
    };
    associations?: {
      teams?: (number | Organization)[] | null;
      participants?: (number | Driver)[] | null;
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
