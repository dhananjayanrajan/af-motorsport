export interface Series {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The series name.
   */
  name: string;
  /**
   * The series alias.
   */
  alias?: string | null;
  /**
   * The type of series.
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
     * Series identifiers.
     */
    identifiers?: {
      /**
       * Enter text value.
       */
      code?: string | null;
      /**
       * Enter text value.
       */
      abbreviation?: string | null;
    };
    /**
     * Enter text value.
     */
    tagline?: string | null;
    /**
     * Series status.
     */
    status: 'Active' | 'Inactive' | 'Defunct' | 'Upcoming' | 'Rebranded' | 'Merged' | 'Sanctioned';
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
    history?: (number | null) | History;
    /**
     * Governing bodies.
     */
    organization?: (number | null) | Organization;
    /**
     * Select related document(s).
     */
    classification?: (number | null) | Classification;
    /**
     * Select related document(s).
     */
    features?: (number | null) | Feature;
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
     * Series lineage.
     */
    heritage?: {
      /**
       * Select related document(s).
       */
      predecessor?: (number | null) | Series;
      /**
       * Select related document(s).
       */
      successor?: (number | null) | Series;
    };
    /**
     * Select related document(s).
     */
    specifications?: (number | null) | Specification;
    /**
     * Select related document(s).
     */
    schedule: number | Schedule;
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
     * Series estadísticas.
     */
    counts?: {
      /**
       * Enter numeric value.
       */
      seasons?: number | null;
      /**
       * Enter numeric value.
       */
      events?: number | null;
      /**
       * Enter numeric value.
       */
      participants?: number | null;
    };
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
    logo?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    cover?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    archive?: (number | null) | Archive;
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
    locations?: (number | null) | Location;
    /**
     * Select related document(s).
     */
    authorities?:
    | ({
      relationTo: 'organizations';
      value: number | Organization;
    } | null)
    | ({
      relationTo: 'individuals';
      value: number | Individual;
    } | null);
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
