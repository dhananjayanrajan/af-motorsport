// FILE: src/collections/Operations/Initiative/seeders/types.ts
export interface Initiative {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    mission?: string | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    status?: ('Proposed' | 'Active' | 'Paused' | 'Completed' | 'Archived') | null;
    classifications?: (number | null) | Classification;
    narrative?: (number | null) | Narrative;
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    schedules?: (number | Schedule)[] | null;
    outcomes?: {
      strategies?: (number | Strategy)[] | null;
      expectations?: (number | Expectation)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets: {
    enable?: boolean | null;
    primary: number | Media;
    gallery?: (number | null) | Gallery;
    documents?: (number | null) | Archive;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    connections?: {
      organizations?: (number | Organization)[] | null;
      leaders?: (number | Leader)[] | null;
      individuals?: (number | Individual)[] | null;
    };
    references?: {
      incidents?: (number | Incident)[] | null;
      celebrations?: (number | Celebration)[] | null;
    };
    content?: {
      histories?: (number | History)[] | null;
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
