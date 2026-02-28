// FILE: src/collections/Content/Story/seeders/types.ts
export interface Story {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  alias?: string | null;
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
    alias?: string | null;
    narrative?: (number | null) | Narrative;
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    concerns?: {
      list?:
      | {
        conflict?: string | null;
        stakes?: string | null;
        resolution?: string | null;
        settings?: {
          show?: boolean | null;
          featured?: boolean | null;
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    interactions?: {
      list?:
      | {
        dynamics?: ('Cooperative' | 'Competitive' | 'Adversarial' | 'Mentorship') | null;
        outcome?: string | null;
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
  assets?: {
    enable?: boolean | null;
    thumbnail?: (number | null) | Media;
    cover?: (number | null) | Media;
    gallery?: (number | null) | Gallery;
    playlist?: (number | null) | Playlist;
    visualization?: (number | null) | Visualization;
    documents?: (number | null) | Archive;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    highlights?: (number | Highlight)[] | null;
    incidents?: (number | Incident)[] | null;
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
