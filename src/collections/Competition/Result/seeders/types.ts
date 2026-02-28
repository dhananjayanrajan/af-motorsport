// FILE: src/collections/Competition/Result/seeders/types.ts
export interface Result {
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
    status?: ('Official' | 'Provisional' | 'Corrected' | 'Historic' | 'Estimated' | 'Certified' | 'Void') | null;
    attributes?: {
      classification?: (number | Classification)[] | null;
    };
    content?: {
      narrative?: (number | null) | Narrative;
      notes?: (number | Note)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    outcomes?: {
      highlights?: (number | Highlight)[] | null;
      incidents?: (number | Incident)[] | null;
    };
    achievements?: {
      gap?: string | null;
      interval?: string | null;
      status?: string | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  metrics?: {
    enable?: boolean | null;
    position?: {
      overall?: number | null;
      class?: number | null;
      order?: number | null;
    };
    performance?: {
      laps?: number | null;
      time?: string | null;
      speed?: string | null;
      distance?: string | null;
    };
    stoppages?:
    | {
      reason?: string | null;
      duration?: number | null;
      lap?: number | null;
      id?: string | null;
    }[]
    | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  assets?: {
    enable?: boolean | null;
    visualization?: (number | null) | Visualization;
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
