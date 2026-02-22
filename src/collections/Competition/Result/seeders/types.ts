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
     * Result status.
     */
    status: 'Official' | 'Provisional' | 'Corrected' | 'Historic' | 'Estimated' | 'Certified' | 'Void';
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
    classification?: (number | null) | Classification;
    /**
     * Select related document(s).
     */
    highlights?: (number | null) | Highlight;
    /**
     * Select related document(s).
     */
    incidents?: (number | null) | Incident;
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
     * Final positions.
     */
    position: {
      /**
       * Enter numeric value.
       */
      overall: number;
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
     * Achievement details.
     */
    achievement?: {
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
       * Enter text value.
       */
      duration?: string | null;
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
  /**
   * Contextual information.
   */
  contexts: {
    /**
     * Toggle the Contexts section on or off.
     */
    enable?: boolean | null;
    /**
     * Select related document(s).
     */
    entry: number | Entry;
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
