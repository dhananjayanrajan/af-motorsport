// FILE: src/collections/Entities/Driver/seeders/types.ts
export interface Driver {
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
      number?: string | null;
      nickname?: string | null;
      competition?: string | null;
      callsign?: string | null;
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
    about?: {
      narrative?: (number | null) | Narrative;
      biography?: (number | null) | History;
      journeys?: (number | Journey)[] | null;
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
    communication?: {
      channels?: (number | Channel)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  metrics?: {
    enable?: boolean | null;
    qualifications?: {
      skills?: (number | Skill)[] | null;
      experiences?: (number | Experience)[] | null;
      trainings?: (number | Training)[] | null;
    };
    outcomes?: {
      points?: (number | Point)[] | null;
      results?: (number | Result)[] | null;
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
    autograph?: (number | null) | Media;
    helmet?: (number | null) | Media;
    suit?: (number | null) | Media;
    gallery?: (number | Gallery)[] | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    connections?: {
      teammates?: (number | Driver)[] | null;
      crew?:
      | (
        | {
          relationTo: 'members';
          value: number | Member;
        }
        | {
          relationTo: 'leaders';
          value: number | Leader;
        }
      )[]
      | null;
    };
    associations?: {
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
