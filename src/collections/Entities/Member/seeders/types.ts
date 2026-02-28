// FILE: src/collections/Entities/Member/seeders/types.ts
export interface Member {
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
      callsign?: string | null;
      badge?: string | null;
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
    about?: {
      background?: string | null;
      narrative?: (number | null) | Narrative;
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
    qualifications?: {
      duties?: (number | Duty)[] | null;
      skills?: (number | Skill)[] | null;
      trainings?: (number | Training)[] | null;
      certifications?: (number | Archive)[] | null;
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
    gallery?: (number | null) | Gallery;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    connections?: {
      mentors?:
      | (
        | {
          relationTo: 'leaders';
          value: number | Leader;
        }
        | {
          relationTo: 'members';
          value: number | Member;
        }
      )[]
      | null;
      crew?: (number | Driver)[] | null;
    };
    associations?: {
      cars?: (number | Car)[] | null;
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
