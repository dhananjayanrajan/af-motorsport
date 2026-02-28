// FILE: src/collections/Content/Journey/seeders/types.ts
export interface Journey {
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
      stories?: (number | Story)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    lessons?: {
      list?:
      | {
        lesson?: string | null;
        application?: string | null;
        significance?: ('Minor' | 'Notable' | 'Significant' | 'LifeChanging') | null;
        impact?: ('Personal' | 'Team' | 'Organizational' | 'Industry') | null;
        settings?: {
          show?: boolean | null;
          featured?: boolean | null;
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
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
    playlist?: (number | null) | Playlist;
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
