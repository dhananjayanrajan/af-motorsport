export interface Car {
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
   * Car identification details.
   */
  identifiers: {
    /**
     * Enter text value.
     */
    chassis?: string | null;
    /**
     * Enter text value.
     */
    model: string;
    /**
     * Enter text value.
     */
    version?: string | null;
    /**
     * Enter text value.
     */
    code?: string | null;
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
     * Enter text value.
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
     * Select related document(s).
     */
    classifications?: (number | null) | Classification;
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
     * Select one or more options.
     */
    status: 'Active' | 'Retired' | 'Development' | 'Museum' | 'Prototype' | 'Concept';
    /**
     * Select related document(s).
     */
    features?: (number | null) | Feature;
    /**
     * Select related document(s).
     */
    specifications?: (number | null) | Specification;
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
    primary?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    cover?: (number | null) | Media;
    /**
     * Select related document(s).
     */
    gallery?: (number | null) | Gallery;
    /**
     * Select related document(s).
     */
    playlist?: (number | null) | Playlist;
    /**
     * Select related document(s).
     */
    visualization?: (number | null) | Visualization;
    /**
     * Select related document(s).
     */
    documents?: (number | null) | Archive;
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
    manufacturers?: (number | null) | Organization;
    /**
     * Select related document(s).
     */
    drivers?: (number | null) | Driver;
    /**
     * Select related document(s).
     */
    crew?: (number | null) | Member;
    /**
     * Select related document(s).
     */
    associations?:
    | ({
      relationTo: 'organizations';
      value: number | Organization;
    } | null)
    | ({
      relationTo: 'individuals';
      value: number | Individual;
    } | null)
    | ({
      relationTo: 'leaders';
      value: number | Leader;
    } | null);
    /**
     * Select related document(s).
     */
    histories?: (number | null) | History;
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
