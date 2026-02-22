export interface Location {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The name of the location.
   */
  name: string;
  /**
   * The type of location.
   */
  type: number | Category;
  /**
   * A short label.
   */
  label?: string | null;
  /**
   * Identifying info.
   */
  basics?: {
    /**
     * Toggle the Basics section on or off.
     */
    enable?: boolean | null;
    /**
     * Display title.
     */
    title?: string | null;
    /**
     * Brief description.
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
     * Full address.
     */
    address?: string | null;
    /**
     * Geometric data.
     */
    geometry?: {
      /**
       * Location coordinates.
       *
       * @minItems 2
       * @maxItems 2
       */
      coordinates?: [number, number] | null;
      /**
       * Geographic bounds.
       */
      bounds?: string | null;
      /**
       * Total area.
       */
      area?: string | null;
    };
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
     * Geographic features.
     */
    geography?: {
      /**
       * Terrain type.
       */
      terrain?: string | null;
      /**
       * Climate zone.
       */
      climate?: ('Temperate' | 'Tropical' | 'Arid' | 'Continental' | 'Polar') | null;
      /**
       * Natural features.
       */
      features?: string | null;
    };
    /**
     * Infrastructure details.
     */
    infrastructure?: {
      /**
       * Transport links.
       */
      transport?: string | null;
      /**
       * On-site facilities.
       */
      facilities?: string | null;
      /**
       * Visitor amenities.
       */
      amenities?: string | null;
    };
    /**
     * Accessibility info.
     */
    accessibility?: {
      /**
       * Main access route.
       */
      approach?: ('PublicRoad' | 'PrivateRoad' | 'Air' | 'Sea' | 'Rail') | null;
      /**
       * Access facilities.
       */
      facilities?: ('DisabledAccess' | 'VIPEntry' | 'ServiceEntry') | null;
      /**
       * Visitor capacity.
       */
      capacity?: ('Small' | 'Medium' | 'Large' | 'Massive') | null;
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
     * Associated entities.
     */
    entities?:
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
    } | null)
    | ({
      relationTo: 'drivers';
      value: number | Driver;
    } | null)
    | ({
      relationTo: 'members';
      value: number | Member;
    } | null);
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
