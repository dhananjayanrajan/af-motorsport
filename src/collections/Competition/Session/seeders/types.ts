// FILE: src/collections/Competition/Session/seeders/types.ts
export interface Session {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  alias?: string | null;
  code?: string | null;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    identifiers?: {
      code?: string | null;
    };
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    status?: ('Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Postponed' | 'Abandoned' | 'Provisional') | null;
    access?: ('Public' | 'Private' | 'InviteOnly' | 'MemberOnly' | 'VIP') | null;
    attributes?: {
      classifications?: (number | Classification)[] | null;
      features?: (number | Feature)[] | null;
    };
    operations?: {
      protocols?: (number | Protocol)[] | null;
      strategies?: (number | Strategy)[] | null;
    };
    content?: {
      narrative?: (number | null) | Narrative;
      history?: (number | null) | History;
      insights?: (number | Note)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    format?: {
      segment?: string | null;
      duration?: number | null;
      interval?: number | null;
      specification?: string | null;
    };
    constraints?: {
      type?: (number | null) | Classification;
      limit?: string | null;
      unit?: string | null;
    };
    parameters?: {
      list?:
      | {
        parameter?: (number | null) | Classification;
        value?: string | null;
        unit?: string | null;
        settings?: {
          show?: boolean | null;
          featured?: boolean | null;
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    specifications?: (number | Specification)[] | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  metrics?: {
    enable?: boolean | null;
    quantifiers?: {
      laps?: number | null;
      distance?: string | null;
      duration?: string | null;
    };
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
    gallery?: (number | null) | Gallery;
    playlist?: (number | null) | Playlist;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    connections?: {
      authorities?:
      | (
        | {
          relationTo: 'organizations';
          value: number | Organization;
        }
        | {
          relationTo: 'leaders';
          value: number | Leader;
        }
      )[]
      | null;
      participants?: (number | Driver)[] | null;
      crews?: (number | Member)[] | null;
    };
    associations?: {
      entities?:
      | (
        | {
          relationTo: 'organizations';
          value: number | Organization;
        }
        | {
          relationTo: 'individuals';
          value: number | Individual;
        }
      )[]
      | null;
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
