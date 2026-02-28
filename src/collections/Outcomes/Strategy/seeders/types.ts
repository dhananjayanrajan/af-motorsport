// FILE: src/collections/Outcomes/Strategy/seeders/types.ts
export interface Strategy {
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
    methodology?: string | null;
    outcomes?: {
      list?:
      | {
        decisions?: (number | Decision)[] | null;
        impacts?: (number | Impact)[] | null;
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
    directives?: {
      list?:
      | {
        phase?: string | null;
        action?: string | null;
        owner?: string | null;
        deadline?: string | null;
        settings?: {
          show?: boolean | null;
          featured?: boolean | null;
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    contingencies?: {
      list?:
      | {
        trigger?: string | null;
        response?: string | null;
        probability?: ('Low' | 'Medium' | 'High' | 'Certain') | null;
        impact?: ('Minor' | 'Moderate' | 'Major' | 'Critical') | null;
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
    associations?: {
      leaders?: (number | Leader)[] | null;
      organizations?: (number | Organization)[] | null;
      individuals?: (number | Individual)[] | null;
    };
    content?: {
      narrative?: (number | null) | Narrative;
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
