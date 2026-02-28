// FILE: src/collections/Resources/Kit/seeders/types.ts
export interface Kit {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    purpose?: {
      application?: ('Track' | 'Street' | 'Show' | 'Promotion') | null;
      context?: string | null;
      conditions?: string | null;
    };
    tagline?: string | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    design?: {
      concept?: string | null;
      inspiration?: string | null;
      designer?: string | null;
      year?: string | null;
    };
    appearance?: {
      colors?: string | null;
      branding?: ('Minimal' | 'Prominent' | 'Full' | 'Heritage') | null;
      style?: ('Classic' | 'Modern' | 'Futuristic' | 'Retro') | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    composition?: {
      construction?: ('CutAndSew' | 'Knitted' | '3DPrinted' | 'Molded') | null;
      assembly?: ('Glued' | 'Stitched' | 'Welded' | 'Bonded') | null;
      finish?: ('Matte' | 'Glossy' | 'Textured' | 'Coated') | null;
    };
    functionality?: {
      performance?: ('Standard' | 'Enhanced' | 'Maximum') | null;
      durability?: ('Low' | 'Medium' | 'High' | 'Extreme') | null;
      comfort?: ('Basic' | 'Comfortable' | 'Premium') | null;
    };
    materials?: {
      list?:
      | {
        type?: ('Cotton' | 'Polyester' | 'Nomex' | 'Carbon' | 'Leather' | 'Synthetic') | null;
        specification?: string | null;
        origin?: string | null;
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
  assets: {
    enable?: boolean | null;
    thumbnail: number | Media;
    cover?: (number | null) | Media;
    gallery?: (number | null) | Gallery;
    visualizations?: (number | null) | Visualization;
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
    };
    associations?: {
      organizations?: (number | Organization)[] | null;
      individuals?: (number | Individual)[] | null;
    };
    content?: {
      notes?: (number | Note)[] | null;
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
