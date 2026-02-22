export interface Specification {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Spec name.
   */
  name: string;
  /**
   * Spec type.
   */
  type: number | Category;
  /**
   * Unique identifier.
   */
  identifier?: {
    /**
     * Spec code.
     */
    code?: string | null;
    /**
     * Spec version.
     */
    version?: string | null;
    /**
     * Spec revision.
     */
    revision?: string | null;
  };
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Spec description.
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
     * Spec definition.
     */
    definition?: string | null;
    /**
     * Spec conditions.
     */
    conditions?: {
      /**
       * Environment condition.
       */
      environment?: string | null;
      /**
       * Constraint details.
       */
      constraints?: string | null;
      /**
       * Compliance level.
       */
      compliance?: ('Mandatory' | 'Optional' | 'Recommended' | 'NotApplicable') | null;
    };
    visibility?: {
      /**
       * Toggle the Details section on or off.
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
     * Spec parameters.
     */
    parameters?:
    | {
      /**
       * Parameter name.
       */
      parameter: string;
      /**
       * Parameter value.
       */
      value: string;
      /**
       * Measurement unit.
       */
      unit: string;
      /**
       * Allowed tolerance.
       */
      tolerance?: string | null;
      id?: string | null;
    }[]
    | null;
    /**
     * Measurement method.
     */
    measurement?: {
      /**
       * Measurement method.
       */
      method?: string | null;
      /**
       * Measurement frequency.
       */
      frequency?: ('Once' | 'Periodic' | 'Continuous' | 'OnDemand') | null;
      /**
       * Measurement accuracy.
       */
      accuracy?: ('Low' | 'Medium' | 'High' | 'Precision') | null;
    };
    visibility?: {
      /**
       * Toggle the Metrics section on or off.
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
