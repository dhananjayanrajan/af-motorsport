// FILE: src/collections/Operations/Protocol/seeders/types.ts
export interface Protocol {
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
    objective?: string | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    procedure?: string | null;
    steps?: {
      list?:
      | {
        step?: string | null;
        instruction?: string | null;
        requirement?: string | null;
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
    documentation?: (number | Archive)[] | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    classifications?: (number | Classification)[] | null;
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
