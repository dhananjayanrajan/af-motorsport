export interface Feature {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The name of the feature.
   */
  name: string;
  /**
   * The category of the feature.
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
     * A brief description.
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
     * How the feature works.
     */
    functionality?: string | null;
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
     * Nature of the feature.
     */
    nature?: {
      /**
       * Technical complexity.
       */
      complexity?: ('Low' | 'Medium' | 'High' | 'Extreme') | null;
      /**
       * Feature visibility.
       */
      visibility?: ('Visible' | 'Concealed' | 'Integrated' | 'Prominent') | null;
      /**
       * Feature impact.
       */
      impact?: ('Marginal' | 'Moderate' | 'Significant' | 'Critical') | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
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
     * Related notes.
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
