// FILE: src/collections/Attributes/Skill/seeders/types.ts
export interface Skill {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    scope?: {
      significance?: string | null;
      scale?: ('Narrow' | 'Moderate' | 'Broad' | 'Comprehensive') | null;
      depth?: ('Basic' | 'Intermediate' | 'Advanced' | 'Expert') | null;
      rarity?: ('Common' | 'Uncommon' | 'Rare' | 'Unique') | null;
    };
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    classifications?: (number | Classification)[] | null;
    definition?: string | null;
    features?: (number | Feature)[] | null;
    specifications?: (number | Specification)[] | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    nature?: {
      complexity?: ('Low' | 'Medium' | 'High' | 'Extreme') | null;
      visibility?: ('Obvious' | 'Subtle' | 'Concealed' | 'Latent') | null;
      impact?: ('Minor' | 'Moderate' | 'Major' | 'Transformative') | null;
    };
    methods?: {
      list?:
      | {
        method?: string | null;
        type?: ('Theoretical' | 'Practical' | 'Simulation' | 'Field') | null;
        description?: string | null;
        settings?: {
          show?: boolean | null;
          featured?: boolean | null;
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    dependencies?: {
      list?:
      | {
        skill?: (number | null) | Skill;
        type?: ('Prerequisite' | 'Corequisite' | 'Recommended') | null;
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
    trainings?: (number | Training)[] | null;
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
