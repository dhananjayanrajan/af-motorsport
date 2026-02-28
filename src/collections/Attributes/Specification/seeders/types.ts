// FILE: src/collections/Attributes/Specification/seeders/types.ts
export interface Specification {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    identifier?: {
      code?: string | null;
      version?: string | null;
      revision?: string | null;
    };
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    definition?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    conditions?: {
      list?:
      | {
        environment?: string | null;
        constraints?: string | null;
        compliance?: ('Mandatory' | 'Optional' | 'Recommended' | 'NotApplicable') | null;
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
  metrics?: {
    enable?: boolean | null;
    measurement?: {
      method?: string | null;
      frequency?: ('Once' | 'Periodic' | 'Continuous' | 'OnDemand') | null;
      accuracy?: ('Low' | 'Medium' | 'High' | 'Precision') | null;
    };
    parameters?: {
      list?:
      | {
        parameter?: string | null;
        value?: string | null;
        unit?: string | null;
        tolerance?: string | null;
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
