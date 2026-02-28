// FILE: src/collections/Competition/Series/seeders/types.ts
export interface Series {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  alias?: string | null;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    identifiers?: {
      code?: string | null;
      abbreviation?: string | null;
    };
    tagline?: string | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    status?: ('Active' | 'Inactive' | 'Defunct' | 'Upcoming' | 'Rebranded' | 'Merged' | 'Sanctioned') | null;
    attributes?: {
      classification?: (number | Classification)[] | null;
      features?: (number | Feature)[] | null;
    };
    content?: {
      history?: (number | null) | History;
      narrative?: (number | null) | Narrative;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    specifications?: (number | Specification)[] | null;
    heritage?: {
      predecessor?: (number | null) | Series;
      successor?: (number | null) | Series;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  metrics?: {
    enable?: boolean | null;
    schedule?: (number | null) | Schedule;
    locations?: (number | Location)[] | null;
    counts?: {
      seasons?: number | null;
      events?: number | null;
      participants?: number | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets: {
    enable?: boolean | null;
    logo: number | Media;
    cover?: (number | null) | Media;
    archive?: (number | Archive)[] | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    connections?: {
      organizations?: (number | Organization)[] | null;
      individuals?: (number | Individual)[] | null;
    };
    notes?: (number | Note)[] | null;
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

// FILE: src/collections/Attributes/Category/seeders/types.ts
export interface Category {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  basics?: {
    enable?: boolean | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    type?:
    | {
      label?: string | null;
      value?: string | null;
      id?: string | null;
    }[]
    | null;
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

// FILE: src/collections/Resources/Media/seeders/types.ts
export interface Media {
  id: number;
  alt?: string | null;
  caption?: {
    root: {
      type: string;
      children: {
        type: any;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}

// FILE: src/collections/Attributes/Tag/seeders/types.ts
export interface Tag {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    description?: string | null;
    context?: string | null;
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

// FILE: src/collections/Attributes/Classification/seeders/types.ts
export interface Classification {
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
    definition?: string | null;
    criteria?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
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

// FILE: src/collections/Content/Note/seeders/types.ts
export interface Note {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  alias?: string | null;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    intentions?: {
      list?:
      | {
        type?: ('Inform' | 'Persuade' | 'Clarify' | 'Critique' | 'Praise' | 'Evaluate') | null;
        impact?: ('Positive' | 'Neutral' | 'Negative') | null;
        remark?: string | null;
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
    thumbnail?: (number | null) | Media;
    archive?: (number | null) | Archive;
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

// FILE: src/collections/Resources/Archive/seeders/types.ts
export interface Archive {
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
  details: {
    enable?: boolean | null;
    samples?: (number | Media)[] | null;
    documents: (number | Media)[];
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    content?: {
      narratives?: (number | Narrative)[] | null;
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

// FILE: src/collections/Content/Narrative/seeders/types.ts
export interface Narrative {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  alias?: string | null;
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
    content?: {
      root: {
        type: string;
        children: {
          type: any;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    } | null;
    scope?: {
      significance?: ('Minor' | 'Moderate' | 'Major' | 'Historic') | null;
      scale?: ('Individual' | 'Team' | 'Organization' | 'Sport') | null;
      depth?: ('Surface' | 'Detailed' | 'Comprehensive' | 'Exhaustive') | null;
      level?: string | null;
    };
    context?: {
      background?: string | null;
      perspective?: string | null;
      purpose?: string | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    tone?: (number | null) | Tone;
    visibility?: {
      show?: boolean | null;
    };
  };
  metrics?: {
    enable?: boolean | null;
    timeline?: {
      list?:
      | {
        date?: string | null;
        type?: ('Event' | 'Milestone' | 'Decision' | 'Incident') | null;
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
    locations?: (number | Location)[] | null;
    connections?: {
      teammates?: (number | Driver)[] | null;
      members?: (number | Member)[] | null;
      leaders?: (number | Leader)[] | null;
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

// FILE: src/collections/Attributes/Tone/seeders/types.ts
export interface Tone {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  alias?: string | null;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    scope?: {
      significance?: string | null;
      scale?: ('Local' | 'Regional' | 'National' | 'Global') | null;
      depth?: ('Surface' | 'Moderate' | 'Deep' | 'Profound') | null;
    };
    qualities?: {
      list?:
      | {
        quality?: ('Positive' | 'Neutral' | 'Negative' | 'Mixed') | null;
        intensity?: ('Low' | 'Medium' | 'High' | 'Extreme') | null;
        mood?: ('Optimistic' | 'Somber' | 'Energetic' | 'Calm' | 'Tense' | 'Celebratory') | null;
        scale?: ('Minute' | 'Moderate' | 'Grand' | 'Epic') | null;
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

// FILE: src/collections/Entities/Driver/seeders/types.ts
export interface Driver {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  first: string;
  middle?: string | null;
  last: string;
  alias?: string | null;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    identifier?: {
      number?: string | null;
      nickname?: string | null;
      competition?: string | null;
      callsign?: string | null;
    };
    tagline?: string | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    chronology?: {
      birth?: string | null;
      debut?: string | null;
      retirement?: string | null;
    };
    about?: {
      narrative?: (number | null) | Narrative;
      biography?: (number | null) | History;
      journeys?: (number | Journey)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    identity?: {
      gender?: ('Male' | 'Female' | 'NonBinary' | 'Undisclosed') | null;
      pronouns?: string | null;
      age?: number | null;
      nationality?: string | null;
    };
    communication?: {
      channels?: (number | Channel)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  metrics?: {
    enable?: boolean | null;
    qualifications?: {
      skills?: (number | Skill)[] | null;
      experiences?: (number | Experience)[] | null;
      trainings?: (number | Training)[] | null;
    };
    outcomes?: {
      points?: (number | Point)[] | null;
      results?: (number | Result)[] | null;
      awards?: (number | Award)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets: {
    enable?: boolean | null;
    avatar: number | Media;
    cover?: (number | null) | Media;
    autograph?: (number | null) | Media;
    helmet?: (number | null) | Media;
    suit?: (number | null) | Media;
    gallery?: (number | Gallery)[] | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    connections?: {
      teammates?: (number | Driver)[] | null;
      crew?:
      | (
        | {
          relationTo: 'members';
          value: number | Member;
        }
        | {
          relationTo: 'leaders';
          value: number | Leader;
        }
      )[]
      | null;
    };
    associations?: {
      cars?: (number | Car)[] | null;
      kits?: (number | Kit)[] | null;
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

// FILE: src/collections/Content/History/seeders/types.ts
export interface History {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  alias?: string | null;
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
    content?: {
      narrative?: (number | null) | Narrative;
      stories?: (number | Story)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    legacy?: {
      impact?: ('Low' | 'Medium' | 'High' | 'Monumental') | null;
      memory?: ('Forgotten' | 'Obscure' | 'Celebrated' | 'Legendary') | null;
      legacy?: string | null;
    };
    evolution?: {
      origin?: string | null;
      development?: string | null;
      lineage?: string | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets?: {
    enable?: boolean | null;
    thumbnail?: (number | null) | Media;
    gallery?: (number | null) | Gallery;
    playlist?: (number | null) | Playlist;
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

// FILE: src/collections/Content/Story/seeders/types.ts
export interface Story {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  alias?: string | null;
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
    alias?: string | null;
    narrative?: (number | null) | Narrative;
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    concerns?: {
      list?:
      | {
        conflict?: string | null;
        stakes?: string | null;
        resolution?: string | null;
        settings?: {
          show?: boolean | null;
          featured?: boolean | null;
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    interactions?: {
      list?:
      | {
        dynamics?: ('Cooperative' | 'Competitive' | 'Adversarial' | 'Mentorship') | null;
        outcome?: string | null;
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
    thumbnail?: (number | null) | Media;
    cover?: (number | null) | Media;
    gallery?: (number | null) | Gallery;
    playlist?: (number | null) | Playlist;
    visualization?: (number | null) | Visualization;
    documents?: (number | null) | Archive;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    highlights?: (number | Highlight)[] | null;
    incidents?: (number | Incident)[] | null;
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

// FILE: src/collections/Resources/Gallery/seeders/types.ts
export interface Gallery {
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
    images?: (number | Media)[] | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    content?: {
      narratives?: (number | Narrative)[] | null;
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

// FILE: src/collections/Resources/Playlist/seeders/types.ts
export interface Playlist {
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
  details: {
    enable?: boolean | null;
    clips?: (number | Media)[] | null;
    videos: (number | Media)[];
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    quality?: ('4K' | 'HD' | 'SD' | 'Raw') | null;
    format?: ('Wide' | 'Vertical' | 'Square') | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    content?: {
      narratives?: (number | Narrative)[] | null;
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

// FILE: src/collections/Resources/Visualization/seeders/types.ts
export interface Visualization {
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
  details: {
    enable?: boolean | null;
    designs: (number | Media)[];
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    content?: {
      narratives?: (number | Narrative)[] | null;
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

// FILE: src/collections/Outcomes/Highlight/seeders/types.ts
export interface Highlight {
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
    content?: {
      narrative?: (number | null) | Narrative;
      stories?: (number | Story)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    attributes?: {
      specifications?: (number | Specification)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets?: {
    enable?: boolean | null;
    thumbnail?: (number | null) | Media;
    gallery?: (number | null) | Gallery;
    playlist?: (number | null) | Playlist;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    associations?: {
      drivers?: (number | Driver)[] | null;
      cars?: (number | Car)[] | null;
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

// FILE: src/collections/Resources/Car/seeders/types.ts
export interface Car {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    identifiers?: {
      chassis?: string | null;
      model?: string | null;
      version?: string | null;
      code?: string | null;
    };
    tagline?: string | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    status?: ('Active' | 'Retired' | 'Development' | 'Museum' | 'Prototype' | 'Concept') | null;
    classifications?: (number | Classification)[] | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    features?: (number | Feature)[] | null;
    specifications?: (number | Specification)[] | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  assets: {
    enable?: boolean | null;
    thumbnail: number | Media;
    cover?: (number | null) | Media;
    gallery?: (number | null) | Gallery;
    playlist?: (number | null) | Playlist;
    visualization?: (number | null) | Visualization;
    documents?: (number | null) | Archive;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    connections?: {
      manufacturers?: (number | Organization)[] | null;
      drivers?: (number | Driver)[] | null;
      crew?: (number | Member)[] | null;
    };
    associations?: {
      organizations?: (number | Organization)[] | null;
      leaders?: (number | Leader)[] | null;
      individuals?: (number | Individual)[] | null;
    };
    content?: {
      histories?: (number | null) | History;
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

// FILE: src/collections/Attributes/Feature/seeders/types.ts
export interface Feature {
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
    functionality?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    nature?: {
      complexity?: ('Low' | 'Medium' | 'High' | 'Extreme') | null;
      visibility?: ('Visible' | 'Concealed' | 'Integrated' | 'Prominent') | null;
      impact?: ('Marginal' | 'Moderate' | 'Significant' | 'Critical') | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
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

// FILE: src/collections/Entities/Organization/seeders/types.ts
export interface Organization {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  alias?: string | null;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    identifier?: {
      code?: string | null;
      abbreviation?: string | null;
      registration?: string | null;
    };
    tagline?: string | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    headquarters?: (number | Location)[] | null;
    evolution?: {
      founded?: string | null;
      merged?: string | null;
      rebranded?: string | null;
      defunct?: string | null;
    };
    about?: {
      background?: string | null;
      narrative?: (number | null) | Narrative;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    reputation?: {
      prestige?: ('Unknown' | 'Emerging' | 'Established' | 'Prestigious' | 'Iconic') | null;
      reliability?: ('Unproven' | 'Developing' | 'Reliable' | 'Exceptional') | null;
      innovation?: ('Conservative' | 'Adaptive' | 'Innovative' | 'Revolutionary') | null;
    };
    communication?: {
      channels?: (number | Channel)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  metrics?: {
    enable?: boolean | null;
    benefits?: {
      list?:
      | {
        benefit?: string | null;
        type?: ('Financial' | 'Technical' | 'Marketing' | 'Operational') | null;
        impact?: ('Minor' | 'Moderate' | 'Significant' | 'Strategic') | null;
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
    logo: number | Media;
    gallery?: (number | null) | Gallery;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    associations?: {
      list?:
      | {
        branch?: (number | null) | Location;
        parent?: (number | null) | Organization;
        settings?: {
          show?: boolean | null;
          featured?: boolean | null;
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    content?: {
      history?: (number | null) | History;
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

// FILE: src/collections/Attributes/Channel/seeders/types.ts
export interface Channel {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name?: string | null;
  type: (number | Category)[];
  basics?: {
    enable?: boolean | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    identifier?: {
      label?: string | null;
      title?: string | null;
    };
    address?: {
      value?: string | null;
      locator?: string | null;
      endpoint?: string | null;
    };
    protocol?: {
      format?: ('HTTP' | 'HTTPS' | 'FTP' | 'SFTP' | 'SMTP' | 'Custom') | null;
      scheme?: ('Standard' | 'Secure' | 'Legacy') | null;
      specification?: string | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    usage?: {
      list?:
      | {
        purpose?: string | null;
        role?: ('Primary' | 'Secondary' | 'Backup' | 'Test') | null;
        function?: ('Broadcast' | 'Receive' | 'Monitor' | 'Control') | null;
        settings?: {
          show?: boolean | null;
          featured?: boolean | null;
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    validity?: {
      list?:
      | {
        status?: ('Active' | 'Inactive' | 'Pending' | 'Deprecated') | null;
        condition?: ('Operational' | 'Degraded' | 'Failed' | 'Maintenance') | null;
        state?: ('Enabled' | 'Disabled' | 'Locked') | null;
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

// FILE: src/collections/Entities/Member/seeders/types.ts
export interface Member {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  first: string;
  middle?: string | null;
  last: string;
  alias?: string | null;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    identifier?: {
      number?: string | null;
      nickname?: string | null;
      callsign?: string | null;
      badge?: string | null;
    };
    tagline?: string | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    chronology?: {
      birth?: string | null;
      debut?: string | null;
      retirement?: string | null;
    };
    departments?: (number | Classification)[] | null;
    about?: {
      background?: string | null;
      narrative?: (number | null) | Narrative;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    identity?: {
      gender?: ('Male' | 'Female' | 'NonBinary' | 'Undisclosed') | null;
      pronouns?: string | null;
      age?: number | null;
      nationality?: string | null;
    };
    personalities?: (number | Feature)[] | null;
    communication?: {
      channels?: (number | Channel)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  metrics?: {
    enable?: boolean | null;
    qualifications?: {
      duties?: (number | Duty)[] | null;
      skills?: (number | Skill)[] | null;
      trainings?: (number | Training)[] | null;
      certifications?: (number | Archive)[] | null;
    };
    outcomes?: {
      impacts?: (number | Impact)[] | null;
      awards?: (number | Award)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets: {
    enable?: boolean | null;
    avatar: number | Media;
    cover?: (number | null) | Media;
    gallery?: (number | null) | Gallery;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    connections?: {
      mentors?:
      | (
        | {
          relationTo: 'leaders';
          value: number | Leader;
        }
        | {
          relationTo: 'members';
          value: number | Member;
        }
      )[]
      | null;
      crew?: (number | Driver)[] | null;
    };
    associations?: {
      cars?: (number | Car)[] | null;
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

// FILE: src/collections/Operations/Duty/seeders/types.ts
export interface Duty {
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
    protocols?: (number | Protocol)[] | null;
    expectations?: (number | Expectation)[] | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
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

// FILE: src/collections/Operations/Expectation/seeders/types.ts
export interface Expectation {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    statement?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    specifications?: (number | Specification)[] | null;
    protocols?: (number | Protocol)[] | null;
    criteria?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    direction?: ('Anticipated' | 'Committed') | null;
    priority?: ('Critical' | 'High' | 'Medium' | 'Low') | null;
    flexibility?: ('Strict' | 'Negotiable' | 'Guideline') | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
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

// FILE: src/collections/Operations/Training/seeders/types.ts
export interface Training {
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
    narrative?: (number | null) | Narrative;
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    intensity?: ('Low' | 'Medium' | 'High' | 'Extreme') | null;
    format?: ('Individual' | 'Group' | 'Lecture' | 'HandsOn' | 'Simulated' | 'Remote' | 'Classroom') | null;
    specifications?: (number | Specification)[] | null;
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
      drivers?: (number | Driver)[] | null;
      members?: (number | Member)[] | null;
      leaders?: (number | Leader)[] | null;
      individuals?: (number | Individual)[] | null;
      organizations?: (number | Organization)[] | null;
    };
    associations?: {
      strategies?: (number | Strategy)[] | null;
      skills?: (number | Skill)[] | null;
    };
    content?: {
      stories?: (number | Story)[] | null;
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

// FILE: src/collections/Entities/Leader/seeders/types.ts
export interface Leader {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  first: string;
  middle?: string | null;
  last: string;
  alias?: string | null;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    identifier?: {
      designation?: string | null;
      title?: string | null;
      code?: string | null;
    };
    tagline?: string | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    chronology?: {
      birth?: string | null;
      debut?: string | null;
      retirement?: string | null;
    };
    departments?: (number | Classification)[] | null;
    vision?: {
      principles?: (number | Principle)[] | null;
    };
    about?: {
      narrative?: (number | null) | Narrative;
      biography?: (number | null) | History;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    identity?: {
      gender?: ('Male' | 'Female' | 'NonBinary' | 'Undisclosed') | null;
      pronouns?: string | null;
      age?: number | null;
      nationality?: string | null;
    };
    personalities?: (number | Feature)[] | null;
    communication?: {
      channels?: (number | Channel)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  metrics?: {
    enable?: boolean | null;
    operations?: {
      strategies?: (number | Strategy)[] | null;
      achievements?: (number | Experience)[] | null;
    };
    outcomes?: {
      impacts?: (number | Impact)[] | null;
      awards?: (number | Award)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets: {
    enable?: boolean | null;
    avatar: number | Media;
    cover?: (number | null) | Media;
    gallery?: (number | Gallery)[] | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    connections?: {
      peers?:
      | (
        | {
          relationTo: 'leaders';
          value: number | Leader;
        }
        | {
          relationTo: 'individuals';
          value: number | Individual;
        }
      )[]
      | null;
      crew?:
      | (
        | {
          relationTo: 'drivers';
          value: number | Driver;
        }
        | {
          relationTo: 'members';
          value: number | Member;
        }
      )[]
      | null;
    };
    anecdotes?: (number | Note)[] | null;
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

// FILE: src/collections/Attributes/Principle/seeders/types.ts
export interface Principle {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    description?: string | null;
    statement?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    application?: string | null;
    rationale?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
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

// FILE: src/collections/Outcomes/Decision/seeders/types.ts
export interface Decision {
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
    features?: (number | Feature)[] | null;
    specifications?: (number | Specification)[] | null;
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
      organizations?: (number | Organization)[] | null;
      individuals?: (number | Individual)[] | null;
    };
    operations?: {
      protocols?: (number | Protocol)[] | null;
      preferences?: (number | Preference)[] | null;
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

// FILE: src/collections/Entities/Individual/seeders/types.ts
export interface Individual {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  first: string;
  middle?: string | null;
  last: string;
  alias?: string | null;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    identifier?: {
      nickname?: string | null;
      code?: string | null;
      number?: string | null;
    };
    tagline?: string | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    interests?: {
      list?:
      | {
        interest?: string | null;
        level?: ('Casual' | 'Enthusiast' | 'Expert' | 'Professional') | null;
        duration?: string | null;
        settings?: {
          show?: boolean | null;
          featured?: boolean | null;
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    about?: {
      background?: string | null;
      narrative?: (number | null) | Narrative;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    identity?: {
      gender?: ('Male' | 'Female' | 'NonBinary' | 'Undisclosed') | null;
      pronouns?: string | null;
      age?: number | null;
      nationality?: string | null;
    };
    influence?: {
      reach?: ('Local' | 'Regional' | 'National' | 'Global') | null;
      authority?: ('None' | 'Low' | 'Medium' | 'High') | null;
      network?: ('Small' | 'Moderate' | 'Extensive' | 'Vast') | null;
    };
    communication?: {
      channels?: (number | Channel)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  metrics?: {
    enable?: boolean | null;
    benefits?: {
      benefit?: string | null;
      type?: ('Access' | 'Discount' | 'Information' | 'Collaboration') | null;
      impact?: ('Minor' | 'Moderate' | 'Significant' | 'Strategic') | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets: {
    enable?: boolean | null;
    avatar: number | Media;
    gallery?: (number | Gallery)[] | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    history?: (number | null) | History;
    notes?: (number | Note)[] | null;
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

// FILE: src/collections/Attributes/Preference/seeders/types.ts
export interface Preference {
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
  traits?: {
    enable?: boolean | null;
    conditions?: {
      list?:
      | {
        trigger?: string | null;
        prerequisite?: string | null;
        settings?: {
          show?: boolean | null;
          featured?: boolean | null;
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    reasons?: {
      list?:
      | {
        reason?: string | null;
        importance?: ('Low' | 'Medium' | 'High' | 'Critical') | null;
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
    principles?: (number | Principle)[] | null;
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

// FILE: src/collections/Outcomes/Impact/seeders/types.ts
export interface Impact {
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
    scope?: {
      significance?: string | null;
      scale?: ('Local' | 'Regional' | 'National' | 'Global' | 'Organization' | 'Event') | null;
      depth?: ('Surface' | 'Moderate' | 'Deep' | 'Fundamental' | 'Profound') | null;
      rarity?: ('Common' | 'Uncommon' | 'Rare' | 'VeryRare' | 'Unique') | null;
    };
    content?: {
      notes?: (number | Note)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    tone?: (number | null) | Tone;
    velocity?: ('Immediate' | 'Rapid' | 'Gradual' | 'Delayed') | null;
    gravity?: ('Catastrophic' | 'Severe' | 'Moderate' | 'Minor' | 'Negligible' | 'Major') | null;
    permanence?: ('Permanent' | 'LongTerm' | 'Temporary' | 'Reversible') | null;
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
    references?: {
      cars?: (number | Car)[] | null;
      kits?: (number | Kit)[] | null;
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

// FILE: src/collections/Outcomes/Experience/seeders/types.ts
export interface Experience {
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
    content?: {
      narrative?: (number | null) | Narrative;
      journey?: (number | null) | Journey;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    skills?: {
      list?:
      | {
        skill?: (number | null) | Skill;
        proficiency?: ('Beginner' | 'Intermediate' | 'Advanced' | 'Expert') | null;
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
    evidence?: (number | Media)[] | null;
    gallery?: (number | null) | Gallery;
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

// FILE: src/collections/Content/Journey/seeders/types.ts
export interface Journey {
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
    content?: {
      narrative?: (number | null) | Narrative;
      stories?: (number | Story)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    lessons?: {
      list?:
      | {
        lesson?: string | null;
        application?: string | null;
        significance?: ('Minor' | 'Notable' | 'Significant' | 'LifeChanging') | null;
        impact?: ('Personal' | 'Team' | 'Organizational' | 'Industry') | null;
        settings?: {
          show?: boolean | null;
          featured?: boolean | null;
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    outcomes?: {
      decisions?: (number | Decision)[] | null;
      impacts?: (number | Impact)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets?: {
    enable?: boolean | null;
    thumbnail?: (number | null) | Media;
    gallery?: (number | null) | Gallery;
    playlist?: (number | null) | Playlist;
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

// FILE: src/collections/Outcomes/Incident/seeders/types.ts
export interface Incident {
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
      specifications?: (number | Specification)[] | null;
    };
    content?: {
      narrative?: (number | null) | Narrative;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    outcomes?: {
      decisions?: (number | Decision)[] | null;
      impacts?: (number | Impact)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets?: {
    enable?: boolean | null;
    thumbnail?: (number | null) | Media;
    gallery?: (number | null) | Gallery;
    archive?: (number | null) | Archive;
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
    references?: {
      cars?: (number | Car)[] | null;
      kits?: (number | Kit)[] | null;
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

// FILE: src/collections/Outcomes/Award/seeders/types.ts
export interface Award {
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
    content?: {
      narrative?: (number | null) | Narrative;
      stories?: (number | Story)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets?: {
    enable?: boolean | null;
    thumbnail?: (number | null) | Media;
    visualization?: (number | Visualization)[] | null;
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

// FILE: src/collections/Operations/Meetup/seeders/types.ts
export interface Meetup {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    date?: string | null;
    location?: (number | null) | Location;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    features?: (number | Feature)[] | null;
    schedules?: (number | Schedule)[] | null;
    narrative?: (number | null) | Narrative;
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    format?: ('InPerson' | 'Virtual' | 'Hybrid') | null;
    access?: ('Public' | 'InviteOnly' | 'Private' | 'Exclusive') | null;
    specifications?: (number | Specification)[] | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  assets: {
    enable?: boolean | null;
    primary: number | Media;
    gallery?: (number | null) | Gallery;
    playlist?: (number | null) | Playlist;
    materials?: (number | null) | Archive;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    hosts?: {
      organizations?: (number | Organization)[] | null;
      leaders?: (number | Leader)[] | null;
      individuals?: (number | Individual)[] | null;
    };
    attendees?: {
      drivers?: (number | Driver)[] | null;
      members?: (number | Member)[] | null;
      leaders?: (number | Leader)[] | null;
      individuals?: (number | Individual)[] | null;
      organizations?: (number | Organization)[] | null;
    };
    references?: {
      initiatives?: (number | Initiative)[] | null;
      celebrations?: (number | Celebration)[] | null;
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

// FILE: src/collections/Operations/Initiative/seeders/types.ts
export interface Initiative {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    mission?: string | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    status?: ('Proposed' | 'Active' | 'Paused' | 'Completed' | 'Archived') | null;
    classifications?: (number | null) | Classification;
    narrative?: (number | null) | Narrative;
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    schedules?: (number | Schedule)[] | null;
    outcomes?: {
      strategies?: (number | Strategy)[] | null;
      expectations?: (number | Expectation)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets: {
    enable?: boolean | null;
    primary: number | Media;
    gallery?: (number | null) | Gallery;
    documents?: (number | null) | Archive;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    connections?: {
      organizations?: (number | Organization)[] | null;
      leaders?: (number | Leader)[] | null;
      individuals?: (number | Individual)[] | null;
    };
    references?: {
      incidents?: (number | Incident)[] | null;
      celebrations?: (number | Celebration)[] | null;
    };
    content?: {
      histories?: (number | History)[] | null;
      insights?: (number | Note)[] | null;
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

// FILE: src/collections/Operations/Celebration/seeders/types.ts
export interface Celebration {
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
    prestige?: ('Intimate' | 'Notable' | 'Prestigious' | 'Iconic') | null;
    exclusivity?: ('Public' | 'InviteOnly' | 'Private' | 'TeamOnly') | null;
    narrative?: (number | null) | Narrative;
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    outcomes?: {
      expectations?: (number | Expectation)[] | null;
      stories?: (number | Story)[] | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets: {
    enable?: boolean | null;
    primary: number | Media;
    gallery?: (number | null) | Gallery;
    playlist?: (number | null) | Playlist;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    beneficiaries?: {
      drivers?: (number | Driver)[] | null;
      members?: (number | Member)[] | null;
      leaders?: (number | Leader)[] | null;
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

// FILE: src/collections/Competition/Season/seeders/types.ts
export interface Season {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  series: number | Series;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    identifiers?: {
      code?: string | null;
      abbreviation?: string | null;
    };
    tagline?: string | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    attributes?: {
      classification?: (number | Classification)[] | null;
      regulations?: (number | Protocol)[] | null;
      schedules?: (number | Schedule)[] | null;
    };
    content?: {
      narrative?: (number | null) | Narrative;
      history?: (number | null) | History;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  metrics?: {
    enable?: boolean | null;
    counts?: {
      entries?: number | null;
      events?: number | null;
      races?: number | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets?: {
    enable?: boolean | null;
    cover?: (number | null) | Media;
    gallery?: (number | null) | Gallery;
    playlist?: (number | null) | Playlist;
    archive?: (number | Archive)[] | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    authorities?: {
      organizations?: (number | Organization)[] | null;
      individuals?: (number | Individual)[] | null;
    };
    associations?: {
      teams?: (number | Organization)[] | null;
      participants?: (number | Driver)[] | null;
    };
    notes?: (number | Note)[] | null;
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

// FILE: src/collections/Competition/Event/seeders/types.ts
export interface Event {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  season: number | Season;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    identifiers?: {
      code?: string | null;
      round?: string | null;
    };
    tagline?: string | null;
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
      classification?: (number | Classification)[] | null;
      features?: (number | Feature)[] | null;
      regulations?: (number | Protocol)[] | null;
    };
    content?: {
      narrative?: (number | null) | Narrative;
      history?: (number | null) | History;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    chronology?: {
      start?: string | null;
      end?: string | null;
      timezone?: string | null;
    };
    format?: {
      segment?: string | null;
      duration?: number | null;
      interval?: number | null;
      specification?: string | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  metrics?: {
    enable?: boolean | null;
    attributes?: {
      specifications?: (number | Specification)[] | null;
      location?: (number | null) | Location;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets?: {
    enable?: boolean | null;
    poster?: (number | null) | Media;
    cover?: (number | null) | Media;
    gallery?: (number | null) | Gallery;
    playlist?: (number | null) | Playlist;
    archive?: (number | null) | Archive;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    references?: {
      highlights?: (number | Highlight)[] | null;
      insights?: (number | Note)[] | null;
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

// FILE: src/collections/Competition/Entry/seeders/types.ts
export interface Entry {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name: string;
  session: number | Session;
  type?: (number | Category)[] | null;
  basics?: {
    enable?: boolean | null;
    identifiers?: {
      number?: string | null;
      plate?: string | null;
    };
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    status?:
    | (
      | 'Entered'
      | 'Confirmed'
      | 'Withdrawn'
      | 'Disqualified'
      | 'DidNotStart'
      | 'DidNotFinish'
      | 'Classified'
      | 'NotClassified'
      | 'Provisional'
      | 'Excluded'
    )
    | null;
    attributes?: {
      classification?: (number | Classification)[] | null;
      preferences?: (number | Preference)[] | null;
      specifications?: (number | Specification)[] | null;
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
    role?: ('Primary' | 'Reserve' | 'Test' | 'Development' | 'Rookie' | 'Veteran' | 'Guest') | null;
    eligibility?: {
      license?: string | null;
      waiver?: string | null;
      restriction?: string | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  metrics?: {
    enable?: boolean | null;
    positions?: {
      grid?: number | null;
      laps?: number | null;
      start?: number | null;
      finish?: number | null;
    };
    parameters?: {
      parameter?: (number | null) | Classification;
      value?: string | null;
      unit?: string | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  assets?: {
    enable?: boolean | null;
    thumbnail?: (number | null) | Media;
    livery?: (number | Media)[] | null;
    gallery?: (number | null) | Gallery;
    playlist?: (number | null) | Playlist;
    visibility?: {
      show?: boolean | null;
    };
  };
  contexts?: {
    enable?: boolean | null;
    associations?: {
      drivers?: (number | Driver)[] | null;
      crew?: (number | null) | Member;
      car?: (number | null) | Car;
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
