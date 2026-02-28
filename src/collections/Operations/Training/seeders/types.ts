// FILE: src/collections/Operations/Training/seeders/types.ts
export interface Training {
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
    narrative?: (number | null) | Narrative;
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    intensity?: ('Low' | 'Medium' | 'High' | 'Extreme') | null;
    format?: ('Individual' | 'Group' | 'Lecture' | 'HandsOn' | 'Simulated' | 'Remote' | 'Classroom') | null;
    specifications?: (number | Specification)[] | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  assets?: {
    enable?: boolean | null;
    gallery?: (number | null) | Gallery;
    playlist?: (number | null) | Playlist;
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
      individuals?: (number | Individual)[] | null;
      organizations?: (number | Organization)[] | null;
    };
    associations?: {
      strategies?: (number | Strategy)[] | null;
      skills?: (number | Skill)[] | null;
    };
    content?: {
      stories?: (number | Story)[] | null;
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
