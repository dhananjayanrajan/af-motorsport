export interface Point {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The points name.
   */
  name: string;
  /**
   * The type of points.
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
     * Points value.
     */
    value: number;
    /**
     * Points scale.
     */
    scale?: ('Standard' | 'Inverse' | 'Logarithmic' | 'Custom' | 'Multiplier' | 'Fixed') | null;
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
     * Associated result.
     */
    result: number | Result;
    /**
     * Select related document(s).
     */
    classification?: (number | null) | Classification;
    /**
     * Select related document(s).
     */
    specification?: (number | null) | Specification;
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
     * Ranking update.
     */
    ranking?: {
      /**
       * Enter numeric value.
       */
      before?: number | null;
      /**
       * Enter numeric value.
       */
      after?: number | null;
      /**
       * Enter numeric value.
       */
      delta?: number | null;
    };
    /**
     * Point modifiers.
     */
    modifiers?:
    | {
      /**
       * Enter text value.
       */
      condition?: string | null;
      /**
       * Enter numeric value.
       */
      adjustment?: number | null;
      /**
       * Enter text value.
       */
      impact?: string | null;
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
    authorities?: (number | null) | Organization;
    /**
     * Select related document(s).
     */
    entries?: (number | null) | Entry;
    /**
     * Select related document(s).
     */
    drivers?: (number | null) | Driver;
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
