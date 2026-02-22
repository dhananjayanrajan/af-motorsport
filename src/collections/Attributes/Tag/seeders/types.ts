export interface Tag {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Tag name.
   */
  name: string;
  /**
   * Tag type.
   */
  type: number | Category;
  /**
   * Extra data.
   */
  details?: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Tag description.
     */
    description?: string | null;
    /**
     * Usage context.
     */
    context?: string | null;
    visibility?: {
      /**
       * Toggle the Details section on or off.
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
