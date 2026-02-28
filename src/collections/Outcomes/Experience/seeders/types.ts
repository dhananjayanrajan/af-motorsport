// FILE: src/collections/Outcomes/Experience/seeders/types.ts
export interface Experience {
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
    content?: {
      narrative?: (number | null) | Narrative;
      journey?: (number | null) | Journey;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    skills?: {
      list?:
      | {
        skill?: (number | null) | Skill;
        proficiency?: ('Beginner' | 'Intermediate' | 'Advanced' | 'Expert') | null;
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
  metrics?: {
    enable?: boolean | null;
    outcomes?: {
      highlights?: (number | Highlight)[] | null;
      incidents?: (number | Incident)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets?: {
    enable?: boolean | null;
    evidence?: (number | Media)[] | null;
    gallery?: (number | null) | Gallery;
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
