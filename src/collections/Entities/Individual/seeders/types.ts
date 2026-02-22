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
       * Enter text value.
       */
      age?: string | null;
      /**
       * Enter text value.
       */
      nationality?: string | null;
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
     * Select related document(s).
     */
    narrative?: (number | null) | Narrative;
    /**
     * Enter text value.
     */
    background?: string | null;
    /**
     * Personal interests.
     */
    interests?:
    | {
      /**
       * Enter text value.
       */
      interest: string;
      /**
       * Select one or more options.
       */
      level?: ('Casual' | 'Enthusiast' | 'Expert' | 'Professional') | null;
      /**
       * Enter text value.
       */
      duration?: string | null;
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
     * Member benefits.
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
      type?: ('Access' | 'Discount' | 'Information' | 'Collaboration') | null;
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
    avatar?: (number | null) | Media;
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
