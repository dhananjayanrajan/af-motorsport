// FILE: src/collections/Attributes/Location/seeders/types.ts
export interface Location {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    label?: string | null;
    title?: string | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    address?: string | null;
    geometry?: {
      coordinates?: [number, number] | null;
      bounds?: string | null;
      area?: string | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    geography?: {
      terrain?: string | null;
      climate?:
      | (
        | 'Temperate'
        | 'Tropical'
        | 'Arid'
        | 'Continental'
        | 'Polar'
        | 'Mediterranean'
        | 'Subtropical'
        | 'Oceanic'
        | 'Desert'
      )
      | null;
      features?: string | null;
    };
    infrastructure?: {
      transport?: string | null;
      facilities?: string | null;
      amenities?: string | null;
    };
    accessibility?: {
      approach?: ('PublicRoad' | 'PrivateRoad' | 'Air' | 'Sea' | 'Rail') | null;
      facilities?: ('DisabledAccess' | 'VIPEntry' | 'ServiceEntry') | null;
      capacity?: ('Small' | 'Medium' | 'Large' | 'Massive') | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    connections?: {
      teammates?: (number | Driver)[] | null;
      members?: (number | Member)[] | null;
      leaders?: (number | Leader)[] | null;
      organizations?: (number | Organization)[] | null;
      individuals?: (number | Individual)[] | null;
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
