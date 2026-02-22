export interface Event {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The event name.
   */
  name: string;
  /**
   * The type of event.
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
     * Event status.
     */
    status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Postponed' | 'Abandoned' | 'Provisional';
    /**
     * Event access.
     */
    access: 'Public' | 'Private' | 'InviteOnly' | 'MemberOnly' | 'VIP';
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
     * Select related document(s).
     */
    narrative?: (number | null) | Narrative;
    /**
     * Select related document(s).
     */
    story?: (number | null) | Story;
    /**
     * Associated season.
     */
    season: number | Season;
    /**
     * Event location.
     */
    location: number | Location;
    /**
     * Select related document(s).
     */
    classification?: (number | null) | Classification;
    /**
     * Select related document(s).
     */
    features?: (number | null) | Feature;
    /**
     * Select related document(s).
     */
    regulations?: (number | null) | Protocol;
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
  traits: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Event timing.
     */
    chronology: {
      /**
       * Select a date and/or time.
       */
      start: string;
      /**
       * Select a date and/or time.
       */
      end: string;
      /**
       * Enter text value.
       */
      timezone: string;
    };
    /**
     * Select related document(s).
     */
    format: number | Category;
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
    specifications?: (number | null) | Specification;
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
    poster?: (number | null) | Media;
    /**
     * Select related document(s).
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
     * Select related document(s).
     */
    highlights?: (number | null) | Highlight;
    /**
     * Select related document(s).
     */
    insights?: (number | null) | Note;
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
