// FILE: src/collections/Competition/Event/seeders/types.ts
export interface Event {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  season: number | Season;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    identifiers?: {
      code?: string | null;
      round?: string | null;
    };
    tagline?: string | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    status?: ('Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Postponed' | 'Abandoned' | 'Provisional') | null;
    access?: ('Public' | 'Private' | 'InviteOnly' | 'MemberOnly' | 'VIP') | null;
    attributes?: {
      classification?: (number | Classification)[] | null;
      features?: (number | Feature)[] | null;
      regulations?: (number | Protocol)[] | null;
    };
    content?: {
      narrative?: (number | null) | Narrative;
      history?: (number | null) | History;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    chronology?: {
      start?: string | null;
      end?: string | null;
      timezone?: string | null;
    };
    format?: {
      segment?: string | null;
      duration?: number | null;
      interval?: number | null;
      specification?: string | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  metrics?: {
    enable?: boolean | null;
    attributes?: {
      specifications?: (number | Specification)[] | null;
      location?: (number | null) | Location;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets?: {
    enable?: boolean | null;
    poster?: (number | null) | Media;
    cover?: (number | null) | Media;
    gallery?: (number | null) | Gallery;
    playlist?: (number | null) | Playlist;
    archive?: (number | null) | Archive;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    references?: {
      highlights?: (number | Highlight)[] | null;
      insights?: (number | Note)[] | null;
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
