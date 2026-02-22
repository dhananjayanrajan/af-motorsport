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
     * Primary narrative.
     */
    narrative: number | Narrative;
    /**
     * Related stories.
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
