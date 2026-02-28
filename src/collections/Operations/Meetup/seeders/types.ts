// FILE: src/collections/Operations/Meetup/seeders/types.ts
export interface Meetup {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    date?: string | null;
    location?: (number | null) | Location;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    features?: (number | Feature)[] | null;
    schedules?: (number | Schedule)[] | null;
    narrative?: (number | null) | Narrative;
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    format?: ('InPerson' | 'Virtual' | 'Hybrid') | null;
    access?: ('Public' | 'InviteOnly' | 'Private' | 'Exclusive') | null;
    specifications?: (number | Specification)[] | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  assets: {
    enable?: boolean | null;
    primary: number | Media;
    gallery?: (number | null) | Gallery;
    playlist?: (number | null) | Playlist;
    materials?: (number | null) | Archive;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    hosts?: {
      organizations?: (number | Organization)[] | null;
      leaders?: (number | Leader)[] | null;
      individuals?: (number | Individual)[] | null;
    };
    attendees?: {
      drivers?: (number | Driver)[] | null;
      members?: (number | Member)[] | null;
      leaders?: (number | Leader)[] | null;
      individuals?: (number | Individual)[] | null;
      organizations?: (number | Organization)[] | null;
    };
    references?: {
      initiatives?: (number | Initiative)[] | null;
      celebrations?: (number | Celebration)[] | null;
    };
    content?: {
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
