// FILE: src/collections/Entities/Leader/seeders/types.ts
export interface Leader {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  first: string;
  middle?: string | null;
  last: string;
  alias?: string | null;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    identifier?: {
      designation?: string | null;
      title?: string | null;
      code?: string | null;
    };
    tagline?: string | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    chronology?: {
      birth?: string | null;
      debut?: string | null;
      retirement?: string | null;
    };
    departments?: (number | Classification)[] | null;
    vision?: {
      principles?: (number | Principle)[] | null;
    };
    about?: {
      narrative?: (number | null) | Narrative;
      biography?: (number | null) | History;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    identity?: {
      gender?: ('Male' | 'Female' | 'NonBinary' | 'Undisclosed') | null;
      pronouns?: string | null;
      age?: number | null;
      nationality?: string | null;
    };
    personalities?: (number | Feature)[] | null;
    communication?: {
      channels?: (number | Channel)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  metrics?: {
    enable?: boolean | null;
    operations?: {
      strategies?: (number | Strategy)[] | null;
      achievements?: (number | Experience)[] | null;
    };
    outcomes?: {
      impacts?: (number | Impact)[] | null;
      awards?: (number | Award)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets: {
    enable?: boolean | null;
    avatar: number | Media;
    cover?: (number | null) | Media;
    gallery?: (number | Gallery)[] | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    connections?: {
      peers?:
      | (
        | {
          relationTo: 'leaders';
          value: number | Leader;
        }
        | {
          relationTo: 'individuals';
          value: number | Individual;
        }
      )[]
      | null;
      crew?:
      | (
        | {
          relationTo: 'drivers';
          value: number | Driver;
        }
        | {
          relationTo: 'members';
          value: number | Member;
        }
      )[]
      | null;
    };
    anecdotes?: (number | Note)[] | null;
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
