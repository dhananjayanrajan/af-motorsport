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
  type: number | Category;
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
    description?: string | null;
    /**
     * Enter text value.
     */
    tagline?: string | null;
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
    /**
     * Enter text value.
     */
    background?: string | null;
    /**
     * Select related document(s).
     */
    parent?: (number | null) | Organization;
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
    channels?: (number | null) | Channel;
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
     * Partner benefits.
     */
    benefits?:
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
      id?: string | null;
    }[]
    | null;
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
    logo?: (number | null) | Media;
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
     * Select related document(s).
     */
    headquarters?: (number | null) | Location;
    /**
     * Select related document(s).
     */
    history?: (number | null) | History;
    /**
     * Select related document(s).
     */
    notes?: (number | null) | Note;
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
  slug: string;
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
    /**
     * Publish as live.
     */
    check_publish?: boolean | null;
    /**
     * Highlights as featured.
     */
    check_featured?: boolean | null;
    /**
     * Pins on the top.
     */
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
