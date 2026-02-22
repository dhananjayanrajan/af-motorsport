export interface Story {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The story name.
   */
  name: string;
  /**
   * Enter text value.
   */
  alias?: string | null;
  /**
   * The type of story.
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
    concerns?:
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
      id?: string | null;
    }[]
    | null;
    /**
     * Character dynamics.
     */
    interactions?:
    | {
      /**
       * Select one or more options.
       */
      dynamics?: ('Cooperative' | 'Competitive' | 'Adversarial' | 'Mentorship') | null;
      /**
       * Enter text value.
       */
      outcome?: string | null;
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
    highlights?: (number | null) | Highlight;
    /**
     * Select related document(s).
     */
    incidents?: (number | null) | Incident;
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
