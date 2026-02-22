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
     * Enter text value.
     */
    description?: string | null;
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
    journeys?: (number | null) | Journey;
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
    experiences?: (number | null) | Experience;
    /**
     * Select related document(s).
     */
    skills?: (number | null) | Skill;
    /**
     * Select related document(s).
     */
    trainings?: (number | null) | Training;
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
    results?: (number | null) | Result;
    /**
     * Select related document(s).
     */
    points?: (number | null) | Point;
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
    thumbnail?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    cover?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    helmet?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    suit?: (number | null) | Media;
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
    teammates?: (number | null) | Driver;
    /**
     * Select related document(s).
     */
    crew?:
    | ({
      relationTo: 'members';
      value: number | Member;
    } | null)
    | ({
      relationTo: 'leaders';
      value: number | Leader;
    } | null);
    /**
     * Select related document(s).
     */
    cars?: (number | null) | Car;
    /**
     * Select related document(s).
     */
    kits?: (number | null) | Kit;
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
