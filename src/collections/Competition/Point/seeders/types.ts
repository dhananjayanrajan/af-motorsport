// FILE: src/collections/Competition/Point/seeders/types.ts
export interface Point {
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
    attributes?: {
      classification?: (number | Classification)[] | null;
      specification?: (number | Specification)[] | null;
    };
    content?: {
      insights?: (number | Note)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    value?: number | null;
    scale?: ('Standard' | 'Inverse' | 'Logarithmic' | 'Custom' | 'Multiplier' | 'Fixed') | null;
    ranking?: {
      before?: number | null;
      after?: number | null;
      delta?: number | null;
    };
    modifiers?: {
      list?:
      | {
        condition?: string | null;
        adjustment?: number | null;
        impact?: string | null;
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
      authorities?:
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
      participants?: (number | null) | Driver;
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
