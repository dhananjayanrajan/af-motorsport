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
  type: number | Category;
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
    narrative: number | Narrative;
    /**
     * Select related document(s).
     */
    stories?: (number | null) | Story;
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
    lessons?:
    | {
      /**
       * Enter text value.
       */
      lesson: string;
      /**
       * Select one or more options.
       */
      significance?: ('Minor' | 'Notable' | 'Significant' | 'LifeChanging') | null;
      /**
       * Enter text value.
       */
      application?: string | null;
      /**
       * Select one or more options.
       */
      impact?: ('Personal' | 'Team' | 'Organizational' | 'Industry') | null;
      id?: string | null;
    }[]
    | null;
    /**
     * Select related document(s).
     */
    decisions?: (number | null) | Decision;
    /**
     * Select related document(s).
     */
    impacts?: (number | null) | Impact;
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
