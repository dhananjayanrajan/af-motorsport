export interface Tone {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Tone name.
   */
  name: string;
  /**
   * Tone alias.
   */
  alias?: string | null;
  /**
   * Tone type.
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
     * Tone description.
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
   * Characteristics.
   */
  traits?: {
    /**
     * Toggle the Traits section on or off.
     */
    enable?: boolean | null;
    /**
     * Scope details.
     */
    scope?: {
      /**
       * Scope significance.
       */
      significance?: string | null;
      /**
       * Scope scale.
       */
      scale?: ('Local' | 'Regional' | 'National' | 'Global') | null;
      /**
       * Scope depth.
       */
      depth?: ('Surface' | 'Moderate' | 'Deep' | 'Profound') | null;
    };
    /**
     * Tonal qualities.
     */
    qualities?:
    | {
      /**
       * Quality type.
       */
      quality?: ('Positive' | 'Neutral' | 'Negative' | 'Mixed') | null;
      /**
       * Intensity level.
       */
      intensity?: ('Low' | 'Medium' | 'High' | 'Extreme') | null;
      /**
       * Associated mood.
       */
      mood?: ('Optimistic' | 'Somber' | 'Energetic' | 'Calm' | 'Tense' | 'Celebratory') | null;
      /**
       * Quality scale.
       */
      scale?: ('Minute' | 'Moderate' | 'Grand' | 'Epic') | null;
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
