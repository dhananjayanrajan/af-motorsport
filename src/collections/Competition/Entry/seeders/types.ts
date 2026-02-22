export interface Entry {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The entry name.
   */
  name: string;
  /**
   * The type of entry.
   */
  type: number | Category;
  /**
   * Identifying info.
   */
  basics: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Short description.
     */
    description?: string | null;
    /**
     * Entry identifiers.
     */
    identifiers?: {
      /**
       * Enter text value.
       */
      number: string;
      /**
       * Enter text value.
       */
      plate?: string | null;
    };
    /**
     * Entry status.
     */
    status:
    | 'Entered'
    | 'Confirmed'
    | 'Withdrawn'
    | 'Disqualified'
    | 'DidNotStart'
    | 'DidNotFinish'
    | 'Classified'
    | 'NotClassified'
    | 'Provisional'
    | 'Excluded';
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
  details: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Related narrative.
     */
    narrative?: (number | null) | Narrative;
    /**
     * Associated session.
     */
    session: number | Session;
    /**
     * Assigned drivers.
     */
    drivers: number | Driver;
    /**
     * Assigned crew.
     */
    crew?: (number | null) | Member;
    /**
     * Assigned car.
     */
    car: number | Car;
    /**
     * Classification.
     */
    classification?: (number | null) | Classification;
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
    /**
     * Select related document(s).
     */
    preferences?: (number | null) | Preference;
    /**
     * Select related document(s).
     */
    specifications?: (number | null) | Specification;
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
      start?: number | null;
      /**
       * Enter numeric value.
       */
      finish?: number | null;
      /**
       * Enter numeric value.
       */
      laps?: number | null;
    };
    /**
     * Custom parameters.
     */
    parameters?:
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
    thumbnail?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    livery?: (number | null) | Media;
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
