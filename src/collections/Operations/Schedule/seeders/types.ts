// FILE: src/collections/Operations/Schedule/seeders/types.ts
export interface Schedule {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    scope?: {
      significance?: ('Minor' | 'Moderate' | 'Major' | 'Critical') | null;
      scale?: ('Individual' | 'Team' | 'Department' | 'Organization') | null;
      depth?: ('Overview' | 'Detailed' | 'Comprehensive') | null;
    };
    agenda?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    chronology?: {
      date?: string | null;
      type?: ('Single' | 'Recurring' | 'MultiDay') | null;
    };
    slots?: {
      list?:
      | {
        activity?: string | null;
        start?: string | null;
        end?: string | null;
        duration?: number | null;
        location?: (number | null) | Location;
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
  traits?: {
    enable?: boolean | null;
    constraints?: {
      list?:
      | {
        constraint?: string | null;
        type?: ('Time' | 'Resource' | 'Weather' | 'Regulation') | null;
        impact?: ('Low' | 'Medium' | 'High' | 'Blocking') | null;
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
  contexts?: {
    enable?: boolean | null;
    connections?: {
      drivers?: (number | Driver)[] | null;
      members?: (number | Member)[] | null;
      leaders?: (number | Leader)[] | null;
      individuals?: (number | Individual)[] | null;
      organizations?: (number | Organization)[] | null;
    };
    occurrences?: {
      trainings?: (number | Training)[] | null;
      meetups?: (number | Meetup)[] | null;
      initiatives?: (number | Initiative)[] | null;
      celebrations?: (number | Celebration)[] | null;
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
