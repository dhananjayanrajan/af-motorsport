export interface Protocol {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Enter text value.
   */
  name: string;
  /**
   * Select related document(s).
   */
  type: number | Category;
  /**
   * Protocol identification details.
   */
  identifier?: {
    /**
     * Enter text value.
     */
    code?: string | null;
    /**
     * Enter text value.
     */
    version?: string | null;
    /**
     * Enter text value.
     */
    revision?: string | null;
  };
  /**
   * Identifying info.
   */
  basics: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Enter text value.
     */
    description?: string | null;
    /**
     * Enter text value.
     */
    objective: string;
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
     * Enter text value.
     */
    procedure: string;
    /**
     * Step-by-step instructions.
     */
    steps?:
    | {
      /**
       * Enter text value.
       */
      step: string;
      /**
       * Enter text value.
       */
      instruction: string;
      /**
       * Enter text value.
       */
      requirement?: string | null;
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
    documentation?: (number | null) | Archive;
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
    classifications?: (number | null) | Classification;
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
