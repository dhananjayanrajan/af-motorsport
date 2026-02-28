export interface Series {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The series name.
   */
  name: string;
  /**
   * The series alias.
   */
  alias?: string | null;
  /**
   * The type of series.
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Series identifiers.
     */
    identifiers?: {
      /**
       * Enter text value.
       */
      code?: string | null;
      /**
       * Enter text value.
       */
      abbreviation?: string | null;
    };
    /**
     * Enter text value.
     */
    tagline?: string | null;
    /**
     * Short description.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Series status.
     */
    status?: ('Active' | 'Inactive' | 'Defunct' | 'Upcoming' | 'Rebranded' | 'Merged' | 'Sanctioned') | null;
    /**
     * Series attributes.
     */
    attributes?: {
      /**
       * Select related document(s).
       */
      classification?: (number | Classification)[] | null;
      /**
       * Select related document(s).
       */
      features?: (number | Feature)[] | null;
    };
    /**
     * Content information
     */
    content?: {
      /**
       * Select related document(s).
       */
      history?: (number | null) | History;
      /**
       * Select related document(s).
       */
      narrative?: (number | null) | Narrative;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Select related document(s).
     */
    specifications?: (number | Specification)[] | null;
    /**
     * Series lineage.
     */
    heritage?: {
      /**
       * Select related document(s).
       */
      predecessor?: (number | null) | Series;
      /**
       * Select related document(s).
       */
      successor?: (number | null) | Series;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Performance stats.
   */
  metrics?: {
    /**
     * Toggle the Metrics section on or off.
     */
    enable?: boolean | null;
    /**
     * Select related document(s).
     */
    schedule?: (number | null) | Schedule;
    /**
     * Select related document(s).
     */
    locations?: (number | Location)[] | null;
    /**
     * Series estadísticas.
     */
    counts?: {
      /**
       * Enter numeric value.
       */
      seasons?: number | null;
      /**
       * Enter numeric value.
       */
      events?: number | null;
      /**
       * Enter numeric value.
       */
      participants?: number | null;
    };
    visibility?: {
      /**
       * Toggle the Metrics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    logo: number | Media;
    /**
     * Select an uploaded file.
     */
    cover?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    archive?: (number | Archive)[] | null;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Connection information
     */
    connections?: {
      /**
       * Select related document(s).
       */
      organizations?: (number | Organization)[] | null;
      /**
       * Select related document(s).
       */
      individuals?: (number | Individual)[] | null;
    };
    /**
     * Select related document(s).
     */
    notes?: (number | Note)[] | null;
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The category name.
   */
  name: string;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Category description.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Category types with label and value pairs
     */
    type?:
    | {
      /**
       * Enter text value.
       */
      label?: string | null;
      /**
       * Enter text value.
       */
      value?: string | null;
      id?: string | null;
    }[]
    | null;
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
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
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tags".
 */
export interface Tag {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Tag name.
   */
  name: string;
  /**
   * Tag type.
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Tag description.
     */
    description?: string | null;
    /**
     * Usage context.
     */
    context?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "classifications".
 */
export interface Classification {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The name of the classification.
   */
  name: string;
  /**
   * The category type.
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * A brief description.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Formal definition.
     */
    definition?: string | null;
    /**
     * Classification criteria.
     */
    criteria?: string | null;
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Content of the feature.
     */
    content?: {
      /**
       * Related notes.
       */
      notes?: (number | Note)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "notes".
 */
export interface Note {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The note name.
   */
  name: string;
  /**
   * The type of note.
   */
  type?: (number | Category)[] | null;
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Enter text value.
     */
    alias?: string | null;
    /**
     * Enter text value.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Communication goals.
     */
    intentions?: {
      list?:
      | {
        /**
         * Select one or more options.
         */
        type?: ('Inform' | 'Persuade' | 'Clarify' | 'Critique' | 'Praise' | 'Evaluate') | null;
        /**
         * Select one or more options.
         */
        impact?: ('Positive' | 'Neutral' | 'Negative') | null;
        /**
         * Enter text value.
         */
        remark?: string | null;
        settings?: {
          /**
           * Toggle the Intention entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Intention entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Intention entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets?: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    thumbnail?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    archive?: (number | null) | Archive;
    /**
     * Select related document(s).
     */
    visualization?: (number | null) | Visualization;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "archives".
 */
export interface Archive {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Extra data.
   */
  details: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    samples?: (number | Media)[] | null;
    /**
     * Select an uploaded file.
     */
    documents: (number | Media)[];
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Content.
     */
    content?: {
      /**
       * Select related document(s).
       */
      narratives?: (number | Narrative)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "narratives".
 */
export interface Narrative {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The narrative name.
   */
  name: string;
  /**
   * Enter text value.
   */
  alias?: string | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Enter text value.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Main narrative body.
     */
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
    /**
     * Narrative scope.
     */
    scope?: {
      /**
       * Select one or more options.
       */
      significance?: ('Minor' | 'Moderate' | 'Major' | 'Historic') | null;
      /**
       * Select one or more options.
       */
      scale?: ('Individual' | 'Team' | 'Organization' | 'Sport') | null;
      /**
       * Select one or more options.
       */
      depth?: ('Surface' | 'Detailed' | 'Comprehensive' | 'Exhaustive') | null;
      /**
       * Enter text value.
       */
      level?: string | null;
    };
    /**
     * Narrative context.
     */
    context?: {
      /**
       * Enter text value.
       */
      background?: string | null;
      /**
       * Enter text value.
       */
      perspective?: string | null;
      /**
       * Enter text value.
       */
      purpose?: string | null;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Emotional tone.
     */
    tone?: (number | null) | Tone;
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Performance stats.
   */
  metrics?: {
    /**
     * Toggle the Metrics section on or off.
     */
    enable?: boolean | null;
    /**
     * Key moments.
     */
    timeline?: {
      list?:
      | {
        /**
         * Select a date and/or time.
         */
        date?: string | null;
        /**
         * Select one or more options.
         */
        type?: ('Event' | 'Milestone' | 'Decision' | 'Incident') | null;
        settings?: {
          /**
           * Toggle the Timeline entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Timeline entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Timeline entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    visibility?: {
      /**
       * Toggle the Metrics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Select related document(s).
     */
    locations?: (number | Location)[] | null;
    /**
     * Connections of the location.
     */
    connections?: {
      /**
       * Select related document(s).
       */
      teammates?: (number | Driver)[] | null;
      /**
       * Associated members.
       */
      members?: (number | Member)[] | null;
      /**
       * Associated leaders.
       */
      leaders?: (number | Leader)[] | null;
      /**
       * Associated organizations.
       */
      organizations?: (number | Organization)[] | null;
      /**
       * Associated individuals.
       */
      individuals?: (number | Individual)[] | null;
    };
    /**
     * Content of the feature.
     */
    content?: {
      /**
       * Related notes.
       */
      notes?: (number | Note)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tones".
 */
export interface Tone {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Tone name.
   */
  name: string;
  /**
   * Tone type.
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Enter text value.
     */
    alias?: string | null;
    /**
     * Tone description.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Scope details.
     */
    scope?: {
      /**
       * Scope significance.
       */
      significance?: string | null;
      /**
       * Scope scale.
       */
      scale?: ('Local' | 'Regional' | 'National' | 'Global') | null;
      /**
       * Scope depth.
       */
      depth?: ('Surface' | 'Moderate' | 'Deep' | 'Profound') | null;
    };
    /**
     * Tonal qualities.
     */
    qualities?: {
      list?:
      | {
        /**
         * Quality type.
         */
        quality?: ('Positive' | 'Neutral' | 'Negative' | 'Mixed') | null;
        /**
         * Intensity level.
         */
        intensity?: ('Low' | 'Medium' | 'High' | 'Extreme') | null;
        /**
         * Associated mood.
         */
        mood?: ('Optimistic' | 'Somber' | 'Energetic' | 'Calm' | 'Tense' | 'Celebratory') | null;
        /**
         * Quality scale.
         */
        scale?: ('Minute' | 'Moderate' | 'Grand' | 'Epic') | null;
        settings?: {
          /**
           * Toggle the Quality entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Quality entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Quality entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "locations".
 */
export interface Location {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The name of the location.
   */
  name: string;
  /**
   * The type of location.
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * A short label.
     */
    label?: string | null;
    /**
     * Display title.
     */
    title?: string | null;
    /**
     * Brief description.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Full address.
     */
    address?: string | null;
    /**
     * Geometric data.
     */
    geometry?: {
      /**
       * Location coordinates.
       *
       * @minItems 2
       * @maxItems 2
       */
      coordinates?: [number, number] | null;
      /**
       * Geographic bounds.
       */
      bounds?: string | null;
      /**
       * Total area.
       */
      area?: string | null;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Geographic features.
     */
    geography?: {
      /**
       * Terrain type.
       */
      terrain?: string | null;
      /**
       * Climate zone.
       */
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
      /**
       * Natural features.
       */
      features?: string | null;
    };
    /**
     * Infrastructure details.
     */
    infrastructure?: {
      /**
       * Transport links.
       */
      transport?: string | null;
      /**
       * On-site facilities.
       */
      facilities?: string | null;
      /**
       * Visitor amenities.
       */
      amenities?: string | null;
    };
    /**
     * Accessibility info.
     */
    accessibility?: {
      /**
       * Main access route.
       */
      approach?: ('PublicRoad' | 'PrivateRoad' | 'Air' | 'Sea' | 'Rail') | null;
      /**
       * Access facilities.
       */
      facilities?: ('DisabledAccess' | 'VIPEntry' | 'ServiceEntry') | null;
      /**
       * Visitor capacity.
       */
      capacity?: ('Small' | 'Medium' | 'Large' | 'Massive') | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Connections of the location.
     */
    connections?: {
      /**
       * Select related document(s).
       */
      teammates?: (number | Driver)[] | null;
      /**
       * Associated members.
       */
      members?: (number | Member)[] | null;
      /**
       * Associated leaders.
       */
      leaders?: (number | Leader)[] | null;
      /**
       * Associated organizations.
       */
      organizations?: (number | Organization)[] | null;
      /**
       * Associated individuals.
       */
      individuals?: (number | Individual)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "drivers".
 */
export interface Driver {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  first: string;
  /**
   * Enter text value.
   */
  middle?: string | null;
  /**
   * Enter text value.
   */
  last: string;
  /**
   * Enter text value.
   */
  alias?: string | null;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Identification data
     */
    identifier?: {
      /**
       * Enter text value.
       */
      number?: string | null;
      /**
       * Enter text value.
       */
      nickname?: string | null;
      /**
       * Enter text value.
       */
      competition?: string | null;
      /**
       * Enter text value.
       */
      callsign?: string | null;
    };
    /**
     * Enter text value.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Time events
     */
    chronology?: {
      /**
       * Select a date and/or time.
       */
      birth?: string | null;
      /**
       * Select a date and/or time.
       */
      debut?: string | null;
      /**
       * Select a date and/or time.
       */
      retirement?: string | null;
    };
    /**
     * About information
     */
    about?: {
      /**
       * Select related document(s).
       */
      narrative?: (number | null) | Narrative;
      /**
       * Select related document(s).
       */
      biography?: (number | null) | History;
      /**
       * Select related document(s).
       */
      journeys?: (number | Journey)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Personal identity
     */
    identity?: {
      /**
       * Select one or more options.
       */
      gender?: ('Male' | 'Female' | 'NonBinary' | 'Undisclosed') | null;
      /**
       * Enter text value.
       */
      pronouns?: string | null;
      /**
       * Enter numeric value.
       */
      age?: number | null;
      /**
       * Enter text value.
       */
      nationality?: string | null;
    };
    /**
     * Communication data
     */
    communication?: {
      /**
       * Select related document(s).
       */
      channels?: (number | Channel)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Performance stats.
   */
  metrics?: {
    /**
     * Toggle the Metrics section on or off.
     */
    enable?: boolean | null;
    /**
     * Qualification data
     */
    qualifications?: {
      /**
       * Select related document(s).
       */
      skills?: (number | Skill)[] | null;
      /**
       * Select related document(s).
       */
      experiences?: (number | Experience)[] | null;
      /**
       * Select related document(s).
       */
      trainings?: (number | Training)[] | null;
    };
    /**
     * Outcome information
     */
    outcomes?: {
      /**
       * Select related document(s).
       */
      points?: (number | Point)[] | null;
      /**
       * Select related document(s).
       */
      results?: (number | Result)[] | null;
      /**
       * Select related document(s).
       */
      awards?: (number | Award)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Metrics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    avatar: number | Media;
    /**
     * Select an uploaded file.
     */
    cover?: (number | null) | Media;
    /**
     * Select an uploaded file.
     */
    autograph?: (number | null) | Media;
    /**
     * Select an uploaded file.
     */
    helmet?: (number | null) | Media;
    /**
     * Select an uploaded file.
     */
    suit?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    gallery?: (number | Gallery)[] | null;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Connection information
     */
    connections?: {
      /**
       * Select related document(s).
       */
      teammates?: (number | Driver)[] | null;
      /**
       * Select related document(s).
       */
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
    /**
     * Association information
     */
    associations?: {
      /**
       * Select related document(s).
       */
      cars?: (number | Car)[] | null;
      /**
       * Select related document(s).
       */
      kits?: (number | Kit)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "histories".
 */
export interface History {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The history name.
   */
  name: string;
  /**
   * Enter text value.
   */
  alias?: string | null;
  /**
   * The type of history.
   */
  type?: (number | Category)[] | null;
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Content of the feature.
     */
    content?: {
      /**
       * Primary narrative.
       */
      narrative?: (number | null) | Narrative;
      /**
       * Related stories.
       */
      stories?: (number | Story)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * History legacy.
     */
    legacy?: {
      /**
       * Select one or more options.
       */
      impact?: ('Low' | 'Medium' | 'High' | 'Monumental') | null;
      /**
       * Select one or more options.
       */
      memory?: ('Forgotten' | 'Obscure' | 'Celebrated' | 'Legendary') | null;
      /**
       * Enter text value.
       */
      legacy?: string | null;
    };
    /**
     * History evolution.
     */
    evolution?: {
      /**
       * Enter text value.
       */
      origin?: string | null;
      /**
       * Enter text value.
       */
      development?: string | null;
      /**
       * Enter text value.
       */
      lineage?: string | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets?: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    thumbnail?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    gallery?: (number | null) | Gallery;
    /**
     * Select related document(s).
     */
    playlist?: (number | null) | Playlist;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "stories".
 */
export interface Story {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The story name.
   */
  name: string;
  /**
   * The type of story.
   */
  type?: (number | Category)[] | null;
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Enter text value.
     */
    alias?: string | null;
    /**
     * Primary narrative.
     */
    narrative?: (number | null) | Narrative;
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Story elements.
     */
    concerns?: {
      list?:
      | {
        /**
         * Enter text value.
         */
        conflict?: string | null;
        /**
         * Enter text value.
         */
        stakes?: string | null;
        /**
         * Enter text value.
         */
        resolution?: string | null;
        settings?: {
          /**
           * Toggle the Concern entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Concern entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Concern entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    /**
     * Character dynamics.
     */
    interactions?: {
      list?:
      | {
        /**
         * Select one or more options.
         */
        dynamics?: ('Cooperative' | 'Competitive' | 'Adversarial' | 'Mentorship') | null;
        /**
         * Enter text value.
         */
        outcome?: string | null;
        settings?: {
          /**
           * Toggle the Interaction entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Interaction entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Interaction entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets?: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    thumbnail?: (number | null) | Media;
    /**
     * Select an uploaded file.
     */
    cover?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    gallery?: (number | null) | Gallery;
    /**
     * Select related document(s).
     */
    playlist?: (number | null) | Playlist;
    /**
     * Select related document(s).
     */
    visualization?: (number | null) | Visualization;
    /**
     * Select related document(s).
     */
    documents?: (number | null) | Archive;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Select related document(s).
     */
    highlights?: (number | Highlight)[] | null;
    /**
     * Select related document(s).
     */
    incidents?: (number | Incident)[] | null;
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "galleries".
 */
export interface Gallery {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    images?: (number | Media)[] | null;
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Content.
     */
    content?: {
      /**
       * Select related document(s).
       */
      narratives?: (number | Narrative)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "playlists".
 */
export interface Playlist {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Extra data.
   */
  details: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    clips?: (number | Media)[] | null;
    /**
     * Select an uploaded file.
     */
    videos: (number | Media)[];
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Select one or more options.
     */
    quality?: ('4K' | 'HD' | 'SD' | 'Raw') | null;
    /**
     * Select one or more options.
     */
    format?: ('Wide' | 'Vertical' | 'Square') | null;
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Content.
     */
    content?: {
      /**
       * Select related document(s).
       */
      narratives?: (number | Narrative)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "visualizations".
 */
export interface Visualization {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Extra data.
   */
  details: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    designs: (number | Media)[];
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Content.
     */
    content?: {
      /**
       * Select related document(s).
       */
      narratives?: (number | Narrative)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "highlights".
 */
export interface Highlight {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Enter text value.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Experience content.
     */
    content?: {
      /**
       * Select related document(s).
       */
      narrative?: (number | null) | Narrative;
      /**
       * Select related document(s).
       */
      stories?: (number | Story)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Incident attributes.
     */
    attributes?: {
      /**
       * Select related document(s).
       */
      specifications?: (number | Specification)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets?: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    thumbnail?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    gallery?: (number | null) | Gallery;
    /**
     * Select related document(s).
     */
    playlist?: (number | null) | Playlist;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Highlight associations.
     */
    associations?: {
      /**
       * Select related document(s).
       */
      drivers?: (number | Driver)[] | null;
      /**
       * Select related document(s).
       */
      cars?: (number | Car)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "specifications".
 */
export interface Specification {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Spec name.
   */
  name: string;
  /**
   * Spec type.
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Unique identifier.
     */
    identifier?: {
      /**
       * Spec code.
       */
      code?: string | null;
      /**
       * Spec version.
       */
      version?: string | null;
      /**
       * Spec revision.
       */
      revision?: string | null;
    };
    /**
     * Spec description.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Spec definition.
     */
    definition?: string | null;
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Spec conditions.
     */
    conditions?: {
      list?:
      | {
        /**
         * Environment condition.
         */
        environment?: string | null;
        /**
         * Constraint details.
         */
        constraints?: string | null;
        /**
         * Compliance level.
         */
        compliance?: ('Mandatory' | 'Optional' | 'Recommended' | 'NotApplicable') | null;
        settings?: {
          /**
           * Toggle the Conditions entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Conditions entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Conditions entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Performance stats.
   */
  metrics?: {
    /**
     * Toggle the Metrics section on or off.
     */
    enable?: boolean | null;
    /**
     * Measurement method.
     */
    measurement?: {
      /**
       * Measurement method.
       */
      method?: string | null;
      /**
       * Measurement frequency.
       */
      frequency?: ('Once' | 'Periodic' | 'Continuous' | 'OnDemand') | null;
      /**
       * Measurement accuracy.
       */
      accuracy?: ('Low' | 'Medium' | 'High' | 'Precision') | null;
    };
    /**
     * Spec parameters.
     */
    parameters?: {
      list?:
      | {
        /**
         * Parameter name.
         */
        parameter?: string | null;
        /**
         * Parameter value.
         */
        value?: string | null;
        /**
         * Measurement unit.
         */
        unit?: string | null;
        /**
         * Allowed tolerance.
         */
        tolerance?: string | null;
        settings?: {
          /**
           * Toggle the Parameter entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Parameter entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Parameter entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    visibility?: {
      /**
       * Toggle the Metrics section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "cars".
 */
export interface Car {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Car identification details.
     */
    identifiers?: {
      /**
       * Enter text value.
       */
      chassis?: string | null;
      /**
       * Enter text value.
       */
      model?: string | null;
      /**
       * Enter text value.
       */
      version?: string | null;
      /**
       * Enter text value.
       */
      code?: string | null;
    };
    /**
     * Enter text value.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Select one option.
     */
    status?: ('Active' | 'Retired' | 'Development' | 'Museum' | 'Prototype' | 'Concept') | null;
    /**
     * Select related document(s).
     */
    classifications?: (number | Classification)[] | null;
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Select related document(s).
     */
    features?: (number | Feature)[] | null;
    /**
     * Select related document(s).
     */
    specifications?: (number | Specification)[] | null;
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    thumbnail: number | Media;
    /**
     * Select an uploaded file.
     */
    cover?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    gallery?: (number | null) | Gallery;
    /**
     * Select related document(s).
     */
    playlist?: (number | null) | Playlist;
    /**
     * Select related document(s).
     */
    visualization?: (number | null) | Visualization;
    /**
     * Select related document(s).
     */
    documents?: (number | null) | Archive;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Car relationships.
     */
    connections?: {
      /**
       * Select related document(s).
       */
      manufacturers?: (number | Organization)[] | null;
      /**
       * Select related document(s).
       */
      drivers?: (number | Driver)[] | null;
      /**
       * Select related document(s).
       */
      crew?: (number | Member)[] | null;
    };
    /**
     * Association information
     */
    associations?: {
      /**
       * Select related document(s).
       */
      organizations?: (number | Organization)[] | null;
      /**
       * Select related document(s).
       */
      leaders?: (number | Leader)[] | null;
      /**
       * Select related document(s).
       */
      individuals?: (number | Individual)[] | null;
    };
    /**
     * Content.
     */
    content?: {
      /**
       * Select related document(s).
       */
      histories?: (number | null) | History;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "features".
 */
export interface Feature {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The name of the feature.
   */
  name: string;
  /**
   * The category of the feature.
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * A brief description.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * How the feature works.
     */
    functionality?: string | null;
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Nature of the feature.
     */
    nature?: {
      /**
       * Technical complexity.
       */
      complexity?: ('Low' | 'Medium' | 'High' | 'Extreme') | null;
      /**
       * Feature visibility.
       */
      visibility?: ('Visible' | 'Concealed' | 'Integrated' | 'Prominent') | null;
      /**
       * Feature impact.
       */
      impact?: ('Marginal' | 'Moderate' | 'Significant' | 'Critical') | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Content of the feature.
     */
    content?: {
      /**
       * Related notes.
       */
      notes?: (number | Note)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "organizations".
 */
export interface Organization {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Enter text value.
   */
  alias?: string | null;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Identification data
     */
    identifier?: {
      /**
       * Enter text value.
       */
      code?: string | null;
      /**
       * Enter text value.
       */
      abbreviation?: string | null;
      /**
       * Enter text value.
       */
      registration?: string | null;
    };
    /**
     * Enter text value.
     */
    tagline?: string | null;
    /**
     * Enter text value.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Select related document(s).
     */
    headquarters?: (number | Location)[] | null;
    /**
     * Institutional evolution
     */
    evolution?: {
      /**
       * Select a date and/or time.
       */
      founded?: string | null;
      /**
       * Select a date and/or time.
       */
      merged?: string | null;
      /**
       * Select a date and/or time.
       */
      rebranded?: string | null;
      /**
       * Select a date and/or time.
       */
      defunct?: string | null;
    };
    /**
     * About information
     */
    about?: {
      /**
       * Enter text value.
       */
      background?: string | null;
      /**
       * Select related document(s).
       */
      narrative?: (number | null) | Narrative;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Market reputation
     */
    reputation?: {
      /**
       * Select one or more options.
       */
      prestige?: ('Unknown' | 'Emerging' | 'Established' | 'Prestigious' | 'Iconic') | null;
      /**
       * Select one or more options.
       */
      reliability?: ('Unproven' | 'Developing' | 'Reliable' | 'Exceptional') | null;
      /**
       * Select one or more options.
       */
      innovation?: ('Conservative' | 'Adaptive' | 'Innovative' | 'Revolutionary') | null;
    };
    /**
     * Communication information
     */
    communication?: {
      /**
       * Select related document(s).
       */
      channels?: (number | Channel)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Performance stats.
   */
  metrics?: {
    /**
     * Toggle the Metrics section on or off.
     */
    enable?: boolean | null;
    /**
     * Partner benefits.
     */
    benefits?: {
      list?:
      | {
        /**
         * Enter text value.
         */
        benefit?: string | null;
        /**
         * Select one or more options.
         */
        type?: ('Financial' | 'Technical' | 'Marketing' | 'Operational') | null;
        /**
         * Select one or more options.
         */
        impact?: ('Minor' | 'Moderate' | 'Significant' | 'Strategic') | null;
        settings?: {
          /**
           * Toggle the Benefit entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Benefit entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Benefit entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    visibility?: {
      /**
       * Toggle the Metrics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    logo: number | Media;
    /**
     * Select related document(s).
     */
    gallery?: (number | null) | Gallery;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Associations information
     */
    associations?: {
      list?:
      | {
        /**
         * Select related document(s).
         */
        branch?: (number | null) | Location;
        /**
         * Select related document(s).
         */
        parent?: (number | null) | Organization;
        settings?: {
          /**
           * Toggle the Association entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Association entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Association entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    /**
     * Content information
     */
    content?: {
      /**
       * Select related document(s).
       */
      history?: (number | null) | History;
      /**
       * Select related document(s).
       */
      notes?: (number | Note)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "channels".
 */
export interface Channel {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The name of the channel.
   */
  name?: string | null;
  /**
   * Category of the channel.
   */
  type: (number | Category)[];
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Category description.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Identification details.
     */
    identifier?: {
      /**
       * Display name.
       */
      label?: string | null;
      /**
       * Formal title.
       */
      title?: string | null;
    };
    /**
     * Address details.
     */
    address?: {
      /**
       * The actual address.
       */
      value?: string | null;
      /**
       * Location reference.
       */
      locator?: string | null;
      /**
       * Specific endpoint.
       */
      endpoint?: string | null;
    };
    /**
     * Protocol details.
     */
    protocol?: {
      /**
       * Data format.
       */
      format?: ('HTTP' | 'HTTPS' | 'FTP' | 'SFTP' | 'SMTP' | 'Custom') | null;
      /**
       * Communication scheme.
       */
      scheme?: ('Standard' | 'Secure' | 'Legacy') | null;
      /**
       * Technical spec.
       */
      specification?: string | null;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Usage constraints.
     */
    usage?: {
      list?:
      | {
        /**
         * Intended use.
         */
        purpose?: string | null;
        /**
         * Functional role.
         */
        role?: ('Primary' | 'Secondary' | 'Backup' | 'Test') | null;
        /**
         * Operational function.
         */
        function?: ('Broadcast' | 'Receive' | 'Monitor' | 'Control') | null;
        settings?: {
          /**
           * Toggle the Usage entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Usage entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Usage entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    /**
     * Validity status.
     */
    validity?: {
      list?:
      | {
        /**
         * Current status.
         */
        status?: ('Active' | 'Inactive' | 'Pending' | 'Deprecated') | null;
        /**
         * Operational condition.
         */
        condition?: ('Operational' | 'Degraded' | 'Failed' | 'Maintenance') | null;
        /**
         * Connection state.
         */
        state?: ('Enabled' | 'Disabled' | 'Locked') | null;
        settings?: {
          /**
           * Toggle the Validity entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Validity entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Validity entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "members".
 */
export interface Member {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  first: string;
  /**
   * Enter text value.
   */
  middle?: string | null;
  /**
   * Enter text value.
   */
  last: string;
  /**
   * Enter text value.
   */
  alias?: string | null;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Identification data
     */
    identifier?: {
      /**
       * Enter text value.
       */
      number?: string | null;
      /**
       * Enter text value.
       */
      nickname?: string | null;
      /**
       * Enter text value.
       */
      callsign?: string | null;
      /**
       * Enter text value.
       */
      badge?: string | null;
    };
    /**
     * Enter text value.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Time events
     */
    chronology?: {
      /**
       * Select a date and/or time.
       */
      birth?: string | null;
      /**
       * Select a date and/or time.
       */
      debut?: string | null;
      /**
       * Select a date and/or time.
       */
      retirement?: string | null;
    };
    /**
     * Select related document(s).
     */
    departments?: (number | Classification)[] | null;
    /**
     * About information
     */
    about?: {
      /**
       * Enter text value.
       */
      background?: string | null;
      /**
       * Select related document(s).
       */
      narrative?: (number | null) | Narrative;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Personal identity
     */
    identity?: {
      /**
       * Select one or more options.
       */
      gender?: ('Male' | 'Female' | 'NonBinary' | 'Undisclosed') | null;
      /**
       * Enter text value.
       */
      pronouns?: string | null;
      /**
       * Enter numeric value.
       */
      age?: number | null;
      /**
       * Enter text value.
       */
      nationality?: string | null;
    };
    /**
     * Select related document(s).
     */
    personalities?: (number | Feature)[] | null;
    /**
     * Communication information
     */
    communication?: {
      /**
       * Select related document(s).
       */
      channels?: (number | Channel)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Performance stats.
   */
  metrics?: {
    /**
     * Toggle the Metrics section on or off.
     */
    enable?: boolean | null;
    /**
     * Qualification data
     */
    qualifications?: {
      /**
       * Select related document(s).
       */
      duties?: (number | Duty)[] | null;
      /**
       * Select related document(s).
       */
      skills?: (number | Skill)[] | null;
      /**
       * Select related document(s).
       */
      trainings?: (number | Training)[] | null;
      /**
       * Select related document(s).
       */
      certifications?: (number | Archive)[] | null;
    };
    /**
     * Outcome information
     */
    outcomes?: {
      /**
       * Select related document(s).
       */
      impacts?: (number | Impact)[] | null;
      /**
       * Select related document(s).
       */
      awards?: (number | Award)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Metrics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    avatar: number | Media;
    /**
     * Select an uploaded file.
     */
    cover?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    gallery?: (number | null) | Gallery;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Connection information
     */
    connections?: {
      /**
       * Select related document(s).
       */
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
      /**
       * Select related document(s).
       */
      crew?: (number | Driver)[] | null;
    };
    /**
     * Association information
     */
    associations?: {
      /**
       * Select related document(s).
       */
      cars?: (number | Car)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "duties".
 */
export interface Duty {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Enter text value.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Select related document(s).
     */
    protocols?: (number | Protocol)[] | null;
    /**
     * Select related document(s).
     */
    expectations?: (number | Expectation)[] | null;
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Content.
     */
    content?: {
      /**
       * Select related document(s).
       */
      notes?: (number | Note)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "protocols".
 */
export interface Protocol {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Protocol identification details.
     */
    identifier?: {
      /**
       * Enter text value.
       */
      code?: string | null;
      /**
       * Enter text value.
       */
      version?: string | null;
      /**
       * Enter text value.
       */
      revision?: string | null;
    };
    /**
     * Enter text value.
     */
    objective?: string | null;
    /**
     * Enter text value.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Enter text value.
     */
    procedure?: string | null;
    /**
     * Step-by-step instructions.
     */
    steps?: {
      list?:
      | {
        /**
         * Enter text value.
         */
        step?: string | null;
        /**
         * Enter text value.
         */
        instruction?: string | null;
        /**
         * Enter text value.
         */
        requirement?: string | null;
        settings?: {
          /**
           * Toggle the Step entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Step entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Step entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets?: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select related document(s).
     */
    documentation?: (number | Archive)[] | null;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Select related document(s).
     */
    classifications?: (number | Classification)[] | null;
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "expectations".
 */
export interface Expectation {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Enter text value.
     */
    statement?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Select related document(s).
     */
    specifications?: (number | Specification)[] | null;
    /**
     * Select related document(s).
     */
    protocols?: (number | Protocol)[] | null;
    /**
     * Enter text value.
     */
    criteria?: string | null;
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Select one or more options.
     */
    direction?: ('Anticipated' | 'Committed') | null;
    /**
     * Select one or more options.
     */
    priority?: ('Critical' | 'High' | 'Medium' | 'Low') | null;
    /**
     * Select one or more options.
     */
    flexibility?: ('Strict' | 'Negotiable' | 'Guideline') | null;
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Content.
     */
    content?: {
      /**
       * Select related document(s).
       */
      notes?: (number | Note)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "skills".
 */
export interface Skill {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Skill name.
   */
  name: string;
  /**
   * Skill type.
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Skill scope.
     */
    scope?: {
      /**
       * Skill significance.
       */
      significance?: string | null;
      /**
       * Skill scale.
       */
      scale?: ('Narrow' | 'Moderate' | 'Broad' | 'Comprehensive') | null;
      /**
       * Skill depth.
       */
      depth?: ('Basic' | 'Intermediate' | 'Advanced' | 'Expert') | null;
      /**
       * Skill rarity.
       */
      rarity?: ('Common' | 'Uncommon' | 'Rare' | 'Unique') | null;
    };
    /**
     * Skill description.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Related classifications.
     */
    classifications?: (number | Classification)[] | null;
    /**
     * Official definition.
     */
    definition?: string | null;
    /**
     * Related features.
     */
    features?: (number | Feature)[] | null;
    /**
     * Related specs.
     */
    specifications?: (number | Specification)[] | null;
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Skill nature.
     */
    nature?: {
      /**
       * Skill complexity.
       */
      complexity?: ('Low' | 'Medium' | 'High' | 'Extreme') | null;
      /**
       * Skill visibility.
       */
      visibility?: ('Obvious' | 'Subtle' | 'Concealed' | 'Latent') | null;
      /**
       * Skill impact.
       */
      impact?: ('Minor' | 'Moderate' | 'Major' | 'Transformative') | null;
    };
    /**
     * Learning methods.
     */
    methods?: {
      list?:
      | {
        /**
         * Method name.
         */
        method?: string | null;
        /**
         * Method type.
         */
        type?: ('Theoretical' | 'Practical' | 'Simulation' | 'Field') | null;
        /**
         * Method description.
         */
        description?: string | null;
        settings?: {
          /**
           * Toggle the Add a new Method entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Add a new Method entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Add a new Method entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    /**
     * Skill dependencies.
     */
    dependencies?: {
      list?:
      | {
        /**
         * Dependent skill.
         */
        skill?: (number | null) | Skill;
        /**
         * Dependency type.
         */
        type?: ('Prerequisite' | 'Corequisite' | 'Recommended') | null;
        settings?: {
          /**
           * Toggle the Add a new Dependency entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Add a new Dependency entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Add a new Dependency entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Related trainings.
     */
    trainings?: (number | Training)[] | null;
    /**
     * Content of the feature.
     */
    content?: {
      /**
       * Related notes.
       */
      notes?: (number | Note)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "trainings".
 */
export interface Training {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Enter text value.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Select related document(s).
     */
    narrative?: (number | null) | Narrative;
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Select one or more options.
     */
    intensity?: ('Low' | 'Medium' | 'High' | 'Extreme') | null;
    /**
     * Select one or more options.
     */
    format?: ('Individual' | 'Group' | 'Lecture' | 'HandsOn' | 'Simulated' | 'Remote' | 'Classroom') | null;
    /**
     * Select related document(s).
     */
    specifications?: (number | Specification)[] | null;
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets?: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select related document(s).
     */
    gallery?: (number | null) | Gallery;
    /**
     * Select related document(s).
     */
    playlist?: (number | null) | Playlist;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Connection information
     */
    connections?: {
      /**
       * Select related document(s).
       */
      drivers?: (number | Driver)[] | null;
      /**
       * Select related document(s).
       */
      members?: (number | Member)[] | null;
      /**
       * Select related document(s).
       */
      leaders?: (number | Leader)[] | null;
      /**
       * Select related document(s).
       */
      individuals?: (number | Individual)[] | null;
      /**
       * Select related document(s).
       */
      organizations?: (number | Organization)[] | null;
    };
    /**
     * Association information
     */
    associations?: {
      /**
       * Select related document(s).
       */
      strategies?: (number | Strategy)[] | null;
      /**
       * Select related document(s).
       */
      skills?: (number | Skill)[] | null;
    };
    /**
     * Content.
     */
    content?: {
      /**
       * Select related document(s).
       */
      stories?: (number | Story)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "leaders".
 */
export interface Leader {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  first: string;
  /**
   * Enter text value.
   */
  middle?: string | null;
  /**
   * Enter text value.
   */
  last: string;
  /**
   * Enter text value.
   */
  alias?: string | null;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Identification data
     */
    identifier?: {
      /**
       * Enter text value.
       */
      designation?: string | null;
      /**
       * Enter text value.
       */
      title?: string | null;
      /**
       * Enter text value.
       */
      code?: string | null;
    };
    /**
     * Enter text value.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Time events
     */
    chronology?: {
      /**
       * Select a date and/or time.
       */
      birth?: string | null;
      /**
       * Select a date and/or time.
       */
      debut?: string | null;
      /**
       * Select a date and/or time.
       */
      retirement?: string | null;
    };
    /**
     * Select related document(s).
     */
    departments?: (number | Classification)[] | null;
    /**
     * Guiding principles
     */
    vision?: {
      /**
       * Select related document(s).
       */
      principles?: (number | Principle)[] | null;
    };
    /**
     * About information
     */
    about?: {
      /**
       * Select related document(s).
       */
      narrative?: (number | null) | Narrative;
      /**
       * Select related document(s).
       */
      biography?: (number | null) | History;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Personal identity
     */
    identity?: {
      /**
       * Select one or more options.
       */
      gender?: ('Male' | 'Female' | 'NonBinary' | 'Undisclosed') | null;
      /**
       * Enter text value.
       */
      pronouns?: string | null;
      /**
       * Enter numeric value.
       */
      age?: number | null;
      /**
       * Enter text value.
       */
      nationality?: string | null;
    };
    /**
     * Select related document(s).
     */
    personalities?: (number | Feature)[] | null;
    /**
     * Communication information
     */
    communication?: {
      /**
       * Select related document(s).
       */
      channels?: (number | Channel)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Performance stats.
   */
  metrics?: {
    /**
     * Toggle the Metrics section on or off.
     */
    enable?: boolean | null;
    /**
     * Operational information
     */
    operations?: {
      /**
       * Select related document(s).
       */
      strategies?: (number | Strategy)[] | null;
      /**
       * Select related document(s).
       */
      achievements?: (number | Experience)[] | null;
    };
    /**
     * Outcome information
     */
    outcomes?: {
      /**
       * Select related document(s).
       */
      impacts?: (number | Impact)[] | null;
      /**
       * Select related document(s).
       */
      awards?: (number | Award)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Metrics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    avatar: number | Media;
    /**
     * Select an uploaded file.
     */
    cover?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    gallery?: (number | Gallery)[] | null;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Connection information
     */
    connections?: {
      /**
       * Select related document(s).
       */
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
      /**
       * Select related document(s).
       */
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
    /**
     * Select related document(s).
     */
    anecdotes?: (number | Note)[] | null;
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "principles".
 */
export interface Principle {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Principle name.
   */
  name: string;
  /**
   * Principle type.
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Short description.
     */
    description?: string | null;
    /**
     * Official statement.
     */
    statement?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Application guide.
     */
    application?: string | null;
    /**
     * Underlying rationale.
     */
    rationale?: string | null;
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Content of the feature.
     */
    content?: {
      /**
       * Related notes.
       */
      notes?: (number | Note)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "strategies".
 */
export interface Strategy {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Enter text value.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Enter text value.
     */
    methodology?: string | null;
    /**
     * Strategy outcomes.
     */
    outcomes?: {
      list?:
      | {
        /**
         * Select related document(s).
         */
        decisions?: (number | Decision)[] | null;
        /**
         * Select related document(s).
         */
        impacts?: (number | Impact)[] | null;
        settings?: {
          /**
           * Toggle the Outcome entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Outcome entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Outcome entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Strategy directives.
     */
    directives?: {
      list?:
      | {
        /**
         * Enter text value.
         */
        phase?: string | null;
        /**
         * Enter text value.
         */
        action?: string | null;
        /**
         * Enter text value.
         */
        owner?: string | null;
        /**
         * Select a date and/or time.
         */
        deadline?: string | null;
        settings?: {
          /**
           * Toggle the Directive entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Directive entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Directive entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    /**
     * Strategy contingencies.
     */
    contingencies?: {
      list?:
      | {
        /**
         * Enter text value.
         */
        trigger?: string | null;
        /**
         * Enter text value.
         */
        response?: string | null;
        /**
         * Select one or more options.
         */
        probability?: ('Low' | 'Medium' | 'High' | 'Certain') | null;
        /**
         * Select one or more options.
         */
        impact?: ('Minor' | 'Moderate' | 'Major' | 'Critical') | null;
        settings?: {
          /**
           * Toggle the Contingency entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Contingency entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Contingency entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Strategy associations.
     */
    associations?: {
      /**
       * Select related document(s).
       */
      leaders?: (number | Leader)[] | null;
      /**
       * Select related document(s).
       */
      organizations?: (number | Organization)[] | null;
      /**
       * Select related document(s).
       */
      individuals?: (number | Individual)[] | null;
    };
    /**
     * Strategy content.
     */
    content?: {
      /**
       * Select related document(s).
       */
      narrative?: (number | null) | Narrative;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "decisions".
 */
export interface Decision {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Enter text value.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Content.
     */
    content?: {
      /**
       * Select related document(s).
       */
      narrative?: (number | null) | Narrative;
      /**
       * Select related document(s).
       */
      notes?: (number | Note)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Select related document(s).
     */
    features?: (number | Feature)[] | null;
    /**
     * Select related document(s).
     */
    specifications?: (number | Specification)[] | null;
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Decision connections.
     */
    connections?: {
      /**
       * Select related document(s).
       */
      drivers?: (number | Driver)[] | null;
      /**
       * Select related document(s).
       */
      members?: (number | Member)[] | null;
      /**
       * Select related document(s).
       */
      leaders?: (number | Leader)[] | null;
      /**
       * Select related document(s).
       */
      organizations?: (number | Organization)[] | null;
      /**
       * Select related document(s).
       */
      individuals?: (number | Individual)[] | null;
    };
    /**
     * Decision operations.
     */
    operations?: {
      /**
       * Select related document(s).
       */
      protocols?: (number | Protocol)[] | null;
      /**
       * Select related document(s).
       */
      preferences?: (number | Preference)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "individuals".
 */
export interface Individual {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  first: string;
  /**
   * Enter text value.
   */
  middle?: string | null;
  /**
   * Enter text value.
   */
  last: string;
  /**
   * Enter text value.
   */
  alias?: string | null;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Identification data
     */
    identifier?: {
      /**
       * Enter text value.
       */
      nickname?: string | null;
      /**
       * Enter text value.
       */
      code?: string | null;
      /**
       * Enter text value.
       */
      number?: string | null;
    };
    /**
     * Enter text value.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Personal interests.
     */
    interests?: {
      list?:
      | {
        /**
         * Enter text value.
         */
        interest?: string | null;
        /**
         * Select one or more options.
         */
        level?: ('Casual' | 'Enthusiast' | 'Expert' | 'Professional') | null;
        /**
         * Enter text value.
         */
        duration?: string | null;
        settings?: {
          /**
           * Toggle the Interest entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Interest entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Interest entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    /**
     * About information
     */
    about?: {
      /**
       * Enter text value.
       */
      background?: string | null;
      /**
       * Select related document(s).
       */
      narrative?: (number | null) | Narrative;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Personal identity
     */
    identity?: {
      /**
       * Select one or more options.
       */
      gender?: ('Male' | 'Female' | 'NonBinary' | 'Undisclosed') | null;
      /**
       * Enter text value.
       */
      pronouns?: string | null;
      /**
       * Enter numeric value.
       */
      age?: number | null;
      /**
       * Enter text value.
       */
      nationality?: string | null;
    };
    /**
     * Network influence.
     */
    influence?: {
      /**
       * Select one or more options.
       */
      reach?: ('Local' | 'Regional' | 'National' | 'Global') | null;
      /**
       * Select one or more options.
       */
      authority?: ('None' | 'Low' | 'Medium' | 'High') | null;
      /**
       * Select one or more options.
       */
      network?: ('Small' | 'Moderate' | 'Extensive' | 'Vast') | null;
    };
    /**
     * Communication information
     */
    communication?: {
      /**
       * Select related document(s).
       */
      channels?: (number | Channel)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Performance stats.
   */
  metrics?: {
    /**
     * Toggle the Metrics section on or off.
     */
    enable?: boolean | null;
    /**
     * Member benefits.
     */
    benefits?: {
      /**
       * Enter text value.
       */
      benefit?: string | null;
      /**
       * Select one or more options.
       */
      type?: ('Access' | 'Discount' | 'Information' | 'Collaboration') | null;
      /**
       * Select one or more options.
       */
      impact?: ('Minor' | 'Moderate' | 'Significant' | 'Strategic') | null;
    };
    visibility?: {
      /**
       * Toggle the Metrics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    avatar: number | Media;
    /**
     * Select related document(s).
     */
    gallery?: (number | Gallery)[] | null;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Select related document(s).
     */
    history?: (number | null) | History;
    /**
     * Select related document(s).
     */
    notes?: (number | Note)[] | null;
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "preferences".
 */
export interface Preference {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Preference name.
   */
  name: string;
  /**
   * Preference type.
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Short description.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Appyling conditions.
     */
    conditions?: {
      list?:
      | {
        /**
         * Condition trigger.
         */
        trigger?: string | null;
        /**
         * Required prerequisite.
         */
        prerequisite?: string | null;
        settings?: {
          /**
           * Toggle the Preference entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Preference entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Preference entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    /**
     * Reasons for preference.
     */
    reasons?: {
      list?:
      | {
        /**
         * The reason.
         */
        reason?: string | null;
        /**
         * Importance level.
         */
        importance?: ('Low' | 'Medium' | 'High' | 'Critical') | null;
        settings?: {
          /**
           * Toggle the Preference entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Preference entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Preference entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Related principles.
     */
    principles?: (number | Principle)[] | null;
    /**
     * Content of the feature.
     */
    content?: {
      /**
       * Related notes.
       */
      notes?: (number | Note)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "impacts".
 */
export interface Impact {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Enter text value.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Impact scope and significance.
     */
    scope?: {
      /**
       * Enter text value.
       */
      significance?: string | null;
      /**
       * Select one or more options.
       */
      scale?: ('Local' | 'Regional' | 'National' | 'Global' | 'Organization' | 'Event') | null;
      /**
       * Select one or more options.
       */
      depth?: ('Surface' | 'Moderate' | 'Deep' | 'Fundamental' | 'Profound') | null;
      /**
       * Select one or more options.
       */
      rarity?: ('Common' | 'Uncommon' | 'Rare' | 'VeryRare' | 'Unique') | null;
    };
    /**
     * Impact content.
     */
    content?: {
      /**
       * Select related document(s).
       */
      notes?: (number | Note)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Select related document(s).
     */
    tone?: (number | null) | Tone;
    /**
     * Select one or more options.
     */
    velocity?: ('Immediate' | 'Rapid' | 'Gradual' | 'Delayed') | null;
    /**
     * Select one or more options.
     */
    gravity?: ('Catastrophic' | 'Severe' | 'Moderate' | 'Minor' | 'Negligible' | 'Major') | null;
    /**
     * Select one or more options.
     */
    permanence?: ('Permanent' | 'LongTerm' | 'Temporary' | 'Reversible') | null;
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Connections of the experience.
     */
    connections?: {
      /**
       * Select related document(s).
       */
      drivers?: (number | Driver)[] | null;
      /**
       * Select related document(s).
       */
      members?: (number | Member)[] | null;
      /**
       * Select related document(s).
       */
      leaders?: (number | Leader)[] | null;
    };
    /**
     * Associations of the experience.
     */
    associations?: {
      /**
       * Select related document(s).
       */
      organizations?: (number | Organization)[] | null;
      /**
       * Select related document(s).
       */
      individuals?: (number | Individual)[] | null;
    };
    /**
     * References of the experience.
     */
    references?: {
      /**
       * Select related document(s).
       */
      cars?: (number | Car)[] | null;
      /**
       * Select related document(s).
       */
      kits?: (number | Kit)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "kits".
 */
export interface Kit {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Enter text value.
     */
    description?: string | null;
    /**
     * Kit usage purpose.
     */
    purpose?: {
      /**
       * Select one or more options.
       */
      application?: ('Track' | 'Street' | 'Show' | 'Promotion') | null;
      /**
       * Enter text value.
       */
      context?: string | null;
      /**
       * Enter text value.
       */
      conditions?: string | null;
    };
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Kit design details.
     */
    design?: {
      /**
       * Enter text value.
       */
      concept?: string | null;
      /**
       * Enter text value.
       */
      inspiration?: string | null;
      /**
       * Enter text value.
       */
      designer?: string | null;
      /**
       * Select a date and/or time.
       */
      year?: string | null;
    };
    /**
     * Visual appearance and branding.
     */
    appearance?: {
      /**
       * Enter text value.
       */
      colors?: string | null;
      /**
       * Select one or more options.
       */
      branding?: ('Minimal' | 'Prominent' | 'Full' | 'Heritage') | null;
      /**
       * Select one or more options.
       */
      style?: ('Classic' | 'Modern' | 'Futuristic' | 'Retro') | null;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Material and construction composition.
     */
    composition?: {
      /**
       * Select one or more options.
       */
      construction?: ('CutAndSew' | 'Knitted' | '3DPrinted' | 'Molded') | null;
      /**
       * Select one or more options.
       */
      assembly?: ('Glued' | 'Stitched' | 'Welded' | 'Bonded') | null;
      /**
       * Select one or more options.
       */
      finish?: ('Matte' | 'Glossy' | 'Textured' | 'Coated') | null;
    };
    /**
     * Kit functionality ratings.
     */
    functionality?: {
      /**
       * Select one or more options.
       */
      performance?: ('Standard' | 'Enhanced' | 'Maximum') | null;
      /**
       * Select one or more options.
       */
      durability?: ('Low' | 'Medium' | 'High' | 'Extreme') | null;
      /**
       * Select one or more options.
       */
      comfort?: ('Basic' | 'Comfortable' | 'Premium') | null;
    };
    /**
     * Materials used in the kit.
     */
    materials?: {
      list?:
      | {
        /**
         * Select one or more options.
         */
        type?: ('Cotton' | 'Polyester' | 'Nomex' | 'Carbon' | 'Leather' | 'Synthetic') | null;
        /**
         * Enter text value.
         */
        specification?: string | null;
        /**
         * Enter text value.
         */
        origin?: string | null;
        settings?: {
          /**
           * Toggle the Material entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Material entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Material entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    thumbnail: number | Media;
    /**
     * Select an uploaded file.
     */
    cover?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    gallery?: (number | null) | Gallery;
    /**
     * Select related document(s).
     */
    visualizations?: (number | null) | Visualization;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Connection information
     */
    connections?: {
      /**
       * Select related document(s).
       */
      drivers?: (number | Driver)[] | null;
      /**
       * Select related document(s).
       */
      members?: (number | Member)[] | null;
      /**
       * Select related document(s).
       */
      leaders?: (number | Leader)[] | null;
    };
    /**
     * Association information
     */
    associations?: {
      /**
       * Select related document(s).
       */
      organizations?: (number | Organization)[] | null;
      /**
       * Select related document(s).
       */
      individuals?: (number | Individual)[] | null;
    };
    /**
     * Content.
     */
    content?: {
      /**
       * Select related document(s).
       */
      notes?: (number | Note)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "experiences".
 */
export interface Experience {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Enter text value.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Experience content.
     */
    content?: {
      /**
       * Select related document(s).
       */
      narrative?: (number | null) | Narrative;
      /**
       * Select related document(s).
       */
      journey?: (number | null) | Journey;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Skills acquired or used.
     */
    skills?: {
      list?:
      | {
        /**
         * Select related document(s).
         */
        skill?: (number | null) | Skill;
        /**
         * Select one or more options.
         */
        proficiency?: ('Beginner' | 'Intermediate' | 'Advanced' | 'Expert') | null;
        settings?: {
          /**
           * Toggle the Skill entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Skill entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Skill entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Performance stats.
   */
  metrics?: {
    /**
     * Toggle the Metrics section on or off.
     */
    enable?: boolean | null;
    /**
     * Outcomes of the experience.
     */
    outcomes?: {
      /**
       * Select related document(s).
       */
      highlights?: (number | Highlight)[] | null;
      /**
       * Select related document(s).
       */
      incidents?: (number | Incident)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Metrics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets?: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    evidence?: (number | Media)[] | null;
    /**
     * Select related document(s).
     */
    gallery?: (number | null) | Gallery;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Connections of the experience.
     */
    connections?: {
      /**
       * Select related document(s).
       */
      drivers?: (number | Driver)[] | null;
      /**
       * Select related document(s).
       */
      members?: (number | Member)[] | null;
      /**
       * Select related document(s).
       */
      leaders?: (number | Leader)[] | null;
    };
    /**
     * Associations of the experience.
     */
    associations?: {
      /**
       * Select related document(s).
       */
      organizations?: (number | Organization)[] | null;
      /**
       * Select related document(s).
       */
      individuals?: (number | Individual)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "journeys".
 */
export interface Journey {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The journey name.
   */
  name: string;
  /**
   * The type of journey.
   */
  type?: (number | Category)[] | null;
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Content of the feature.
     */
    content?: {
      /**
       * Primary narrative.
       */
      narrative?: (number | null) | Narrative;
      /**
       * Related stories.
       */
      stories?: (number | Story)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Key takeaways.
     */
    lessons?: {
      list?:
      | {
        /**
         * Enter text value.
         */
        lesson?: string | null;
        /**
         * Enter text value.
         */
        application?: string | null;
        /**
         * Select one or more options.
         */
        significance?: ('Minor' | 'Notable' | 'Significant' | 'LifeChanging') | null;
        /**
         * Select one or more options.
         */
        impact?: ('Personal' | 'Team' | 'Organizational' | 'Industry') | null;
        settings?: {
          /**
           * Toggle the Lesson entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Lesson entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Lesson entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    /**
     * Key outcomes.
     */
    outcomes?: {
      /**
       * Select related document(s).
       */
      decisions?: (number | Decision)[] | null;
      /**
       * Select related document(s).
       */
      impacts?: (number | Impact)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets?: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    thumbnail?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    gallery?: (number | null) | Gallery;
    /**
     * Select related document(s).
     */
    playlist?: (number | null) | Playlist;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "incidents".
 */
export interface Incident {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Enter text value.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Incident attributes.
     */
    attributes?: {
      /**
       * Select related document(s).
       */
      specifications?: (number | Specification)[] | null;
    };
    /**
     * Incident content.
     */
    content?: {
      /**
       * Select related document(s).
       */
      narrative?: (number | null) | Narrative;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Incident outcomes.
     */
    outcomes?: {
      /**
       * Select related document(s).
       */
      decisions?: (number | Decision)[] | null;
      /**
       * Select related document(s).
       */
      impacts?: (number | Impact)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets?: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    thumbnail?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    gallery?: (number | null) | Gallery;
    /**
     * Select related document(s).
     */
    archive?: (number | null) | Archive;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Connections of the experience.
     */
    connections?: {
      /**
       * Select related document(s).
       */
      drivers?: (number | Driver)[] | null;
      /**
       * Select related document(s).
       */
      members?: (number | Member)[] | null;
      /**
       * Select related document(s).
       */
      leaders?: (number | Leader)[] | null;
    };
    /**
     * Associations of the experience.
     */
    associations?: {
      /**
       * Select related document(s).
       */
      organizations?: (number | Organization)[] | null;
      /**
       * Select related document(s).
       */
      individuals?: (number | Individual)[] | null;
    };
    /**
     * References of the experience.
     */
    references?: {
      /**
       * Select related document(s).
       */
      cars?: (number | Car)[] | null;
      /**
       * Select related document(s).
       */
      kits?: (number | Kit)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "awards".
 */
export interface Award {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Enter text value.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Content.
     */
    content?: {
      /**
       * Select related document(s).
       */
      narrative?: (number | null) | Narrative;
      /**
       * Select related document(s).
       */
      stories?: (number | Story)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets?: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    thumbnail?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    visualization?: (number | Visualization)[] | null;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Associations.
     */
    associations?: {
      /**
       * Select related document(s).
       */
      leaders?: (number | Leader)[] | null;
      /**
       * Select related document(s).
       */
      organizations?: (number | Organization)[] | null;
      /**
       * Select related document(s).
       */
      individuals?: (number | Individual)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "points".
 */
export interface Point {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The points name.
   */
  name: string;
  /**
   * The type of points.
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Short description.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Result attributes.
     */
    attributes?: {
      /**
       * Select related document(s).
       */
      classification?: (number | Classification)[] | null;
      /**
       * Select related document(s).
       */
      specification?: (number | Specification)[] | null;
    };
    /**
     * Content details.
     */
    content?: {
      /**
       * Select related document(s).
       */
      insights?: (number | Note)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Enter numeric value.
     */
    value?: number | null;
    /**
     * Select one or more options.
     */
    scale?: ('Standard' | 'Inverse' | 'Logarithmic' | 'Custom' | 'Multiplier' | 'Fixed') | null;
    /**
     * Ranking update.
     */
    ranking?: {
      /**
       * Enter numeric value.
       */
      before?: number | null;
      /**
       * Enter numeric value.
       */
      after?: number | null;
      /**
       * Enter numeric value.
       */
      delta?: number | null;
    };
    /**
     * Point modifiers.
     */
    modifiers?: {
      list?:
      | {
        /**
         * Enter text value.
         */
        condition?: string | null;
        /**
         * Enter numeric value.
         */
        adjustment?: number | null;
        /**
         * Enter text value.
         */
        impact?: string | null;
        settings?: {
          /**
           * Toggle the Modifier entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Modifier entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Modifier entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Related connections.
     */
    connections?: {
      /**
       * Select related document(s).
       */
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
      /**
       * Select related document(s).
       */
      participants?: (number | null) | Driver;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "results".
 */
export interface Result {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The result name.
   */
  name: string;
  /**
   * The type of result.
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Short description.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Select one or more options.
     */
    status?: ('Official' | 'Provisional' | 'Corrected' | 'Historic' | 'Estimated' | 'Certified' | 'Void') | null;
    /**
     * Result attributes.
     */
    attributes?: {
      /**
       * Select related document(s).
       */
      classification?: (number | Classification)[] | null;
    };
    /**
     * Result content.
     */
    content?: {
      /**
       * Select related document(s).
       */
      narrative?: (number | null) | Narrative;
      /**
       * Select related document(s).
       */
      notes?: (number | Note)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Result outcomes.
     */
    outcomes?: {
      /**
       * Select related document(s).
       */
      highlights?: (number | Highlight)[] | null;
      /**
       * Select related document(s).
       */
      incidents?: (number | Incident)[] | null;
    };
    /**
     * Achievement details.
     */
    achievements?: {
      /**
       * Enter text value.
       */
      gap?: string | null;
      /**
       * Enter text value.
       */
      interval?: string | null;
      /**
       * Enter text value.
       */
      status?: string | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Performance stats.
   */
  metrics?: {
    /**
     * Toggle the Metrics section on or off.
     */
    enable?: boolean | null;
    /**
     * Final positions.
     */
    position?: {
      /**
       * Enter numeric value.
       */
      overall?: number | null;
      /**
       * Enter numeric value.
       */
      class?: number | null;
      /**
       * Enter numeric value.
       */
      order?: number | null;
    };
    /**
     * Performance stats.
     */
    performance?: {
      /**
       * Enter numeric value.
       */
      laps?: number | null;
      /**
       * Enter text value.
       */
      time?: string | null;
      /**
       * Enter text value.
       */
      speed?: string | null;
      /**
       * Enter text value.
       */
      distance?: string | null;
    };
    /**
     * Session stoppages.
     */
    stoppages?:
    | {
      /**
       * Enter text value.
       */
      reason?: string | null;
      /**
       * Enter numeric value.
       */
      duration?: number | null;
      /**
       * Enter numeric value.
       */
      lap?: number | null;
      id?: string | null;
    }[]
    | null;
    visibility?: {
      /**
       * Toggle the Metrics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets?: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select related document(s).
     */
    visualization?: (number | null) | Visualization;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "schedules".
 */
export interface Schedule {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Significance and scale of the schedule.
     */
    scope?: {
      /**
       * Select one or more options.
       */
      significance?: ('Minor' | 'Moderate' | 'Major' | 'Critical') | null;
      /**
       * Select one or more options.
       */
      scale?: ('Individual' | 'Team' | 'Department' | 'Organization') | null;
      /**
       * Select one or more options.
       */
      depth?: ('Overview' | 'Detailed' | 'Comprehensive') | null;
    };
    /**
     * Enter text value.
     */
    agenda?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Date and recurring type.
     */
    chronology?: {
      /**
       * Select a date and/or time.
       */
      date?: string | null;
      /**
       * Select one or more options.
       */
      type?: ('Single' | 'Recurring' | 'MultiDay') | null;
    };
    /**
     * Timeline of activities.
     */
    slots?: {
      list?:
      | {
        /**
         * Enter text value.
         */
        activity?: string | null;
        /**
         * Select a date and/or time.
         */
        start?: string | null;
        /**
         * Select a date and/or time.
         */
        end?: string | null;
        /**
         * Enter numeric value.
         */
        duration?: number | null;
        /**
         * Select related document(s).
         */
        location?: (number | null) | Location;
        settings?: {
          /**
           * Toggle the Slot entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Slot entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Slot entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Factors limiting the schedule.
     */
    constraints?: {
      list?:
      | {
        /**
         * Enter text value.
         */
        constraint?: string | null;
        /**
         * Select one or more options.
         */
        type?: ('Time' | 'Resource' | 'Weather' | 'Regulation') | null;
        /**
         * Select one or more options.
         */
        impact?: ('Low' | 'Medium' | 'High' | 'Blocking') | null;
        settings?: {
          /**
           * Toggle the Constraint entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Constraint entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Constraint entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Schedule connections.
     */
    connections?: {
      /**
       * Select related document(s).
       */
      drivers?: (number | Driver)[] | null;
      /**
       * Select related document(s).
       */
      members?: (number | Member)[] | null;
      /**
       * Select related document(s).
       */
      leaders?: (number | Leader)[] | null;
      /**
       * Select related document(s).
       */
      individuals?: (number | Individual)[] | null;
      /**
       * Select related document(s).
       */
      organizations?: (number | Organization)[] | null;
    };
    /**
     * Schedule occurrences.
     */
    occurrences?: {
      /**
       * Select related document(s).
       */
      trainings?: (number | Training)[] | null;
      /**
       * Select related document(s).
       */
      meetups?: (number | Meetup)[] | null;
      /**
       * Select related document(s).
       */
      initiatives?: (number | Initiative)[] | null;
      /**
       * Select related document(s).
       */
      celebrations?: (number | Celebration)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "meetups".
 */
export interface Meetup {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Select a date and/or time.
     */
    date?: string | null;
    /**
     * Select related document(s).
     */
    location?: (number | null) | Location;
    /**
     * Enter text value.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Select related document(s).
     */
    features?: (number | Feature)[] | null;
    /**
     * Select related document(s).
     */
    schedules?: (number | Schedule)[] | null;
    /**
     * Select related document(s).
     */
    narrative?: (number | null) | Narrative;
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Select one or more options.
     */
    format?: ('InPerson' | 'Virtual' | 'Hybrid') | null;
    /**
     * Select one or more options.
     */
    access?: ('Public' | 'InviteOnly' | 'Private' | 'Exclusive') | null;
    /**
     * Select related document(s).
     */
    specifications?: (number | Specification)[] | null;
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    primary: number | Media;
    /**
     * Select related document(s).
     */
    gallery?: (number | null) | Gallery;
    /**
     * Select related document(s).
     */
    playlist?: (number | null) | Playlist;
    /**
     * Select related document(s).
     */
    materials?: (number | null) | Archive;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Host information
     */
    hosts?: {
      /**
       * Select related document(s).
       */
      organizations?: (number | Organization)[] | null;
      /**
       * Select related document(s).
       */
      leaders?: (number | Leader)[] | null;
      /**
       * Select related document(s).
       */
      individuals?: (number | Individual)[] | null;
    };
    /**
     * Attendee information
     */
    attendees?: {
      /**
       * Select related document(s).
       */
      drivers?: (number | Driver)[] | null;
      /**
       * Select related document(s).
       */
      members?: (number | Member)[] | null;
      /**
       * Select related document(s).
       */
      leaders?: (number | Leader)[] | null;
      /**
       * Select related document(s).
       */
      individuals?: (number | Individual)[] | null;
      /**
       * Select related document(s).
       */
      organizations?: (number | Organization)[] | null;
    };
    /**
     * Reference information
     */
    references?: {
      /**
       * Select related document(s).
       */
      initiatives?: (number | Initiative)[] | null;
      /**
       * Select related document(s).
       */
      celebrations?: (number | Celebration)[] | null;
    };
    /**
     * Content.
     */
    content?: {
      /**
       * Select related document(s).
       */
      notes?: (number | Note)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "initiatives".
 */
export interface Initiative {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Enter text value.
     */
    mission?: string | null;
    /**
     * Enter text value.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Select one option.
     */
    status?: ('Proposed' | 'Active' | 'Paused' | 'Completed' | 'Archived') | null;
    /**
     * Select related document(s).
     */
    classifications?: (number | null) | Classification;
    /**
     * Select related document(s).
     */
    narrative?: (number | null) | Narrative;
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Select related document(s).
     */
    schedules?: (number | Schedule)[] | null;
    /**
     * Outcome information
     */
    outcomes?: {
      /**
       * Select related document(s).
       */
      strategies?: (number | Strategy)[] | null;
      /**
       * Select related document(s).
       */
      expectations?: (number | Expectation)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    primary: number | Media;
    /**
     * Select related document(s).
     */
    gallery?: (number | null) | Gallery;
    /**
     * Select related document(s).
     */
    documents?: (number | null) | Archive;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Connection information
     */
    connections?: {
      /**
       * Select related document(s).
       */
      organizations?: (number | Organization)[] | null;
      /**
       * Select related document(s).
       */
      leaders?: (number | Leader)[] | null;
      /**
       * Select related document(s).
       */
      individuals?: (number | Individual)[] | null;
    };
    /**
     * Reference information
     */
    references?: {
      /**
       * Select related document(s).
       */
      incidents?: (number | Incident)[] | null;
      /**
       * Select related document(s).
       */
      celebrations?: (number | Celebration)[] | null;
    };
    /**
     * Content.
     */
    content?: {
      /**
       * Select related document(s).
       */
      histories?: (number | History)[] | null;
      /**
       * Select related document(s).
       */
      insights?: (number | Note)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "celebrations".
 */
export interface Celebration {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Enter text value.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Select one or more options.
     */
    prestige?: ('Intimate' | 'Notable' | 'Prestigious' | 'Iconic') | null;
    /**
     * Select one or more options.
     */
    exclusivity?: ('Public' | 'InviteOnly' | 'Private' | 'TeamOnly') | null;
    /**
     * Select related document(s).
     */
    narrative?: (number | null) | Narrative;
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Outcome information
     */
    outcomes?: {
      /**
       * Select related document(s).
       */
      expectations?: (number | Expectation)[] | null;
      /**
       * Select related document(s).
       */
      stories?: (number | Story)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    primary: number | Media;
    /**
     * Select related document(s).
     */
    gallery?: (number | null) | Gallery;
    /**
     * Select related document(s).
     */
    playlist?: (number | null) | Playlist;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Beneficiary information
     */
    beneficiaries?: {
      /**
       * Select related document(s).
       */
      drivers?: (number | Driver)[] | null;
      /**
       * Select related document(s).
       */
      members?: (number | Member)[] | null;
      /**
       * Select related document(s).
       */
      leaders?: (number | Leader)[] | null;
      /**
       * Select related document(s).
       */
      organizations?: (number | Organization)[] | null;
      /**
       * Select related document(s).
       */
      individuals?: (number | Individual)[] | null;
    };
    /**
     * Content.
     */
    content?: {
      /**
       * Select related document(s).
       */
      notes?: (number | Note)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "seasons".
 */
export interface Season {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The season name.
   */
  name: string;
  /**
   * Associated series.
   */
  series: number | Series;
  /**
   * The type of season.
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Season identifiers.
     */
    identifiers?: {
      /**
       * Enter text value.
       */
      code?: string | null;
      /**
       * Enter text value.
       */
      abbreviation?: string | null;
    };
    /**
     * Short description.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Series attributes.
     */
    attributes?: {
      /**
       * Select related document(s).
       */
      classification?: (number | Classification)[] | null;
      /**
       * Select related document(s).
       */
      regulations?: (number | Protocol)[] | null;
      /**
       * Season schedules.
       */
      schedules?: (number | Schedule)[] | null;
    };
    /**
     * Content information
     */
    content?: {
      /**
       * Season narrative.
       */
      narrative?: (number | null) | Narrative;
      /**
       * Season history.
       */
      history?: (number | null) | History;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Performance stats.
   */
  metrics?: {
    /**
     * Toggle the Metrics section on or off.
     */
    enable?: boolean | null;
    /**
     * Season estadísticas.
     */
    counts?: {
      /**
       * Enter numeric value.
       */
      entries?: number | null;
      /**
       * Enter numeric value.
       */
      events?: number | null;
      /**
       * Enter numeric value.
       */
      races?: number | null;
    };
    visibility?: {
      /**
       * Toggle the Metrics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets?: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    cover?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    gallery?: (number | null) | Gallery;
    /**
     * Select related document(s).
     */
    playlist?: (number | null) | Playlist;
    /**
     * Select related document(s).
     */
    archive?: (number | Archive)[] | null;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Authority information
     */
    authorities?: {
      /**
       * Select related document(s).
       */
      organizations?: (number | Organization)[] | null;
      /**
       * Select related document(s).
       */
      individuals?: (number | Individual)[] | null;
    };
    /**
     * Association information
     */
    associations?: {
      /**
       * Select related document(s).
       */
      teams?: (number | Organization)[] | null;
      /**
       * Select related document(s).
       */
      participants?: (number | Driver)[] | null;
    };
    /**
     * Select related document(s).
     */
    notes?: (number | Note)[] | null;
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events".
 */
export interface Event {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The event name.
   */
  name: string;
  /**
   * The season of the event.
   */
  season: number | Season;
  /**
   * The type of event.
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Event identifiers.
     */
    identifiers?: {
      /**
       * Enter text value.
       */
      code?: string | null;
      /**
       * Enter text value.
       */
      round?: string | null;
    };
    /**
     * Short description.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Select one or more options.
     */
    status?: ('Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Postponed' | 'Abandoned' | 'Provisional') | null;
    /**
     * Select one or more options.
     */
    access?: ('Public' | 'Private' | 'InviteOnly' | 'MemberOnly' | 'VIP') | null;
    /**
     * Event attributes.
     */
    attributes?: {
      /**
       * Select related document(s).
       */
      classification?: (number | Classification)[] | null;
      /**
       * Select related document(s).
       */
      features?: (number | Feature)[] | null;
      /**
       * Select related document(s).
       */
      regulations?: (number | Protocol)[] | null;
    };
    /**
     * Content information
     */
    content?: {
      /**
       * Event narrative.
       */
      narrative?: (number | null) | Narrative;
      /**
       * Event history.
       */
      history?: (number | null) | History;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Event timing.
     */
    chronology?: {
      /**
       * Select a date and/or time.
       */
      start?: string | null;
      /**
       * Select a date and/or time.
       */
      end?: string | null;
      /**
       * Enter text value.
       */
      timezone?: string | null;
    };
    /**
     * Session format.
     */
    format?: {
      /**
       * Enter text value.
       */
      segment?: string | null;
      /**
       * Enter numeric value.
       */
      duration?: number | null;
      /**
       * Enter numeric value.
       */
      interval?: number | null;
      /**
       * Enter text value.
       */
      specification?: string | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Performance stats.
   */
  metrics?: {
    /**
     * Toggle the Metrics section on or off.
     */
    enable?: boolean | null;
    /**
     * Event attributes.
     */
    attributes?: {
      /**
       * Select related document(s).
       */
      specifications?: (number | Specification)[] | null;
      /**
       * Event location.
       */
      location?: (number | null) | Location;
    };
    visibility?: {
      /**
       * Toggle the Metrics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets?: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    poster?: (number | null) | Media;
    /**
     * Select an uploaded file.
     */
    cover?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    gallery?: (number | null) | Gallery;
    /**
     * Select related document(s).
     */
    playlist?: (number | null) | Playlist;
    /**
     * Select related document(s).
     */
    archive?: (number | null) | Archive;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Reference information
     */
    references?: {
      /**
       * Select related document(s).
       */
      highlights?: (number | Highlight)[] | null;
      /**
       * Select related document(s).
       */
      insights?: (number | Note)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "sessions".
 */
export interface Session {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The session name.
   */
  name: string;
  /**
   * Enter text value.
   */
  alias?: string | null;
  /**
   * Enter text value.
   */
  code?: string | null;
  /**
   * The type of session.
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Series identifiers.
     */
    identifiers?: {
      /**
       * Enter text value.
       */
      code?: string | null;
    };
    /**
     * Short description.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Session status.
     */
    status?: ('Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Postponed' | 'Abandoned' | 'Provisional') | null;
    /**
     * Session access.
     */
    access?: ('Public' | 'Private' | 'InviteOnly' | 'MemberOnly' | 'VIP') | null;
    /**
     * Session attributes.
     */
    attributes?: {
      /**
       * Select related document(s).
       */
      classifications?: (number | Classification)[] | null;
      /**
       * Select related document(s).
       */
      features?: (number | Feature)[] | null;
    };
    /**
     * Session operations.
     */
    operations?: {
      /**
       * Select related document(s).
       */
      protocols?: (number | Protocol)[] | null;
      /**
       * Select related document(s).
       */
      strategies?: (number | Strategy)[] | null;
    };
    /**
     * Content information
     */
    content?: {
      /**
       * Event narrative.
       */
      narrative?: (number | null) | Narrative;
      /**
       * Event history.
       */
      history?: (number | null) | History;
      /**
       * Select related document(s).
       */
      insights?: (number | Note)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Session format.
     */
    format?: {
      /**
       * Enter text value.
       */
      segment?: string | null;
      /**
       * Enter numeric value.
       */
      duration?: number | null;
      /**
       * Enter numeric value.
       */
      interval?: number | null;
      /**
       * Enter text value.
       */
      specification?: string | null;
    };
    /**
     * Session constraints.
     */
    constraints?: {
      /**
       * Select related document(s).
       */
      type?: (number | null) | Classification;
      /**
       * Enter text value.
       */
      limit?: string | null;
      /**
       * Enter text value.
       */
      unit?: string | null;
    };
    /**
     * Session parameters.
     */
    parameters?: {
      list?:
      | {
        /**
         * Select related document(s).
         */
        parameter?: (number | null) | Classification;
        /**
         * Enter text value.
         */
        value?: string | null;
        /**
         * Enter text value.
         */
        unit?: string | null;
        settings?: {
          /**
           * Toggle the Parameter entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Parameter entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Parameter entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    /**
     * Select related document(s).
     */
    specifications?: (number | Specification)[] | null;
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Performance stats.
   */
  metrics?: {
    /**
     * Toggle the Metrics section on or off.
     */
    enable?: boolean | null;
    /**
     * Quantifiable data.
     */
    quantifiers?: {
      /**
       * Enter numeric value.
       */
      laps?: number | null;
      /**
       * Enter text value.
       */
      distance?: string | null;
      /**
       * Enter text value.
       */
      duration?: string | null;
    };
    /**
     * Session outcomes.
     */
    outcomes?: {
      /**
       * Select related document(s).
       */
      highlights?: (number | Highlight)[] | null;
      /**
       * Select related document(s).
       */
      incidents?: (number | Incident)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Metrics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets?: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select related document(s).
     */
    gallery?: (number | null) | Gallery;
    /**
     * Select related document(s).
     */
    playlist?: (number | null) | Playlist;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Session connections.
     */
    connections?: {
      /**
       * Select related document(s).
       */
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
      /**
       * Select related document(s).
       */
      participants?: (number | Driver)[] | null;
      /**
       * Select related document(s).
       */
      crews?: (number | Member)[] | null;
    };
    /**
     * Session associations.
     */
    associations?: {
      /**
       * Select related document(s).
       */
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
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "entries".
 */
export interface Entry {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The entry name.
   */
  name: string;
  /**
   * Associated session.
   */
  session: number | Session;
  /**
   * The type of entry.
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Entry identifiers.
     */
    identifiers?: {
      /**
       * Enter text value.
       */
      number?: string | null;
      /**
       * Enter text value.
       */
      plate?: string | null;
    };
    /**
     * Short description.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Select one or more options.
     */
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
    /**
     * Session attributes.
     */
    attributes?: {
      /**
       * Classification.
       */
      classification?: (number | Classification)[] | null;
      /**
       * Select related document(s).
       */
      preferences?: (number | Preference)[] | null;
      /**
       * Select related document(s).
       */
      specifications?: (number | Specification)[] | null;
    };
    /**
     * Entry content.
     */
    content?: {
      /**
       * Related narrative.
       */
      narrative?: (number | null) | Narrative;
      /**
       * Select related document(s).
       */
      notes?: (number | Note)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Select one or more options.
     */
    role?: ('Primary' | 'Reserve' | 'Test' | 'Development' | 'Rookie' | 'Veteran' | 'Guest') | null;
    /**
     * Eligibility info.
     */
    eligibility?: {
      /**
       * Enter text value.
       */
      license?: string | null;
      /**
       * Enter text value.
       */
      waiver?: string | null;
      /**
       * Enter text value.
       */
      restriction?: string | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Performance stats.
   */
  metrics?: {
    /**
     * Toggle the Metrics section on or off.
     */
    enable?: boolean | null;
    /**
     * Race positions.
     */
    positions?: {
      /**
       * Enter numeric value.
       */
      grid?: number | null;
      /**
       * Enter numeric value.
       */
      laps?: number | null;
      /**
       * Enter numeric value.
       */
      start?: number | null;
      /**
       * Enter numeric value.
       */
      finish?: number | null;
    };
    /**
     * Custom parameters.
     */
    parameters?: {
      /**
       * Select related document(s).
       */
      parameter?: (number | null) | Classification;
      /**
       * Enter text value.
       */
      value?: string | null;
      /**
       * Enter text value.
       */
      unit?: string | null;
    };
    visibility?: {
      /**
       * Toggle the Metrics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Media files.
   */
  assets?: {
    /**
     * Toggle the Assets section on or off.
     */
    enable?: boolean | null;
    /**
     * Select an uploaded file.
     */
    thumbnail?: (number | null) | Media;
    /**
     * Select an uploaded file.
     */
    livery?: (number | Media)[] | null;
    /**
     * Select related document(s).
     */
    gallery?: (number | null) | Gallery;
    /**
     * Select related document(s).
     */
    playlist?: (number | null) | Playlist;
    visibility?: {
      /**
       * Toggle the Assets section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Session associations.
     */
    associations?: {
      /**
       * Assigned drivers.
       */
      drivers?: (number | Driver)[] | null;
      /**
       * Assigned crew.
       */
      crew?: (number | null) | Member;
      /**
       * Assigned car.
       */
      car?: (number | null) | Car;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "careers".
 */
export interface Career {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type?: (number | Category)[] | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Enter text value.
     */
    description?: string | null;
    visibility?: {
      /**
       * Toggle the Basics section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Select one or more options.
     */
    contract?: ('FullTime' | 'PartTime' | 'Reserve' | 'Test' | 'Loan' | 'Guest') | null;
    /**
     * Historical positions held.
     */
    positions?: {
      list?:
      | {
        /**
         * Enter text value.
         */
        title?: string | null;
        /**
         * Select a date and/or time.
         */
        start?: string | null;
        /**
         * Select a date and/or time.
         */
        end?: string | null;
        settings?: {
          /**
           * Toggle the Position entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Position entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Position entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    /**
     * Select related document(s).
     */
    narrative?: (number | null) | Narrative;
    visibility?: {
      /**
       * Toggle the Details section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Outcome information
     */
    outcomes?: {
      /**
       * Select related document(s).
       */
      expectations?: (number | Expectation)[] | null;
      /**
       * Select related document(s).
       */
      highlights?: (number | Highlight)[] | null;
      /**
       * Select related document(s).
       */
      awards?: (number | Award)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
       */
      show?: boolean | null;
    };
  };
  /**
   * Contextual information.
   */
  contexts?: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Connection information
     */
    connections?: {
      /**
       * Select related document(s).
       */
      drivers?: (number | Driver)[] | null;
      /**
       * Select related document(s).
       */
      members?: (number | Member)[] | null;
      /**
       * Select related document(s).
       */
      leaders?: (number | Leader)[] | null;
      /**
       * Select related document(s).
       */
      individuals?: (number | Individual)[] | null;
    };
    /**
     * Association information
     */
    associations?: {
      /**
       * Select related document(s).
       */
      organizations?: (number | Organization)[] | null;
      /**
       * Select related document(s).
       */
      cars?: (number | Car)[] | null;
    };
    /**
     * Content.
     */
    content?: {
      /**
       * Select related document(s).
       */
      stories?: (number | Story)[] | null;
    };
    visibility?: {
      /**
       * Toggle the Contexts section on or off.
       */
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug?: string | null;
  /**
   * Categories that are relevant to the record.
   */
  categories?: (number | Category)[] | null;
  /**
   * Associated tags for the record.
   */
  tags?: (number | Tag)[] | null;
  /**
   * Controls who can see this record and under what conditions.
   */
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}