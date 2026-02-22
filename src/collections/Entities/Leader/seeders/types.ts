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
      designation?: string | null;
      /**
       * Enter text value.
       */
      title: string;
      /**
       * Enter text value.
       */
      code?: string | null;
    };
    /**
     * Enter text value.
     */
    description?: string | null;
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
     * Select related document(s).
     */
    biography?: (number | null) | History;
    /**
     * Select related document(s).
     */
    vision?: (number | null) | Principle;
    /**
     * Select related document(s).
     */
    departments?: (number | null) | Classification;
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
     * Select related document(s).
     */
    personalities?: (number | null) | Feature;
    /**
     * Select related document(s).
     */
    achievements?: (number | null) | Experience;
    /**
     * Select related document(s).
     */
    strategies?: (number | null) | Strategy;
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
    impacts?: (number | null) | Impact;
    /**
     * Select related document(s).
     */
    awards?: (number | null) | Award;
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
    avatar?: (number | null) | Media;
    /**
     * Select related document(s).
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
     * Select related document(s).
     */
    peers?:
    | ({
      relationTo: 'leaders';
      value: number | Leader;
    } | null)
    | ({
      relationTo: 'individuals';
      value: number | Individual;
    } | null);
    /**
     * Select related document(s).
     */
    crew?:
    | ({
      relationTo: 'drivers';
      value: number | Driver;
    } | null)
    | ({
      relationTo: 'members';
      value: number | Member;
    } | null);
    /**
     * Select related document(s).
     */
    anecdotes?: (number | null) | Note;
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
