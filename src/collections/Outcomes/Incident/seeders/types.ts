// FILE: src/collections/Outcomes/Incident/seeders/types.ts
export interface Incident {
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
    attributes?: {
      specifications?: (number | Specification)[] | null;
    };
    content?: {
      narrative?: (number | null) | Narrative;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    outcomes?: {
      decisions?: (number | Decision)[] | null;
      impacts?: (number | Impact)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets?: {
    enable?: boolean | null;
    thumbnail?: (number | null) | Media;
    gallery?: (number | null) | Gallery;
    archive?: (number | null) | Archive;
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
