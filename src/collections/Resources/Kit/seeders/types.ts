export interface Kit {
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
    /**
     * Kit usage purpose.
     */
    purpose?: {
      /**
       * Select one or more options.
       */
      application?: ('Track' | 'Street' | 'Show' | 'Promotion') | null;
      /**
       * Enter text value.
       */
      context?: string | null;
      /**
       * Enter text value.
       */
      conditions?: string | null;
    };
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
     * Kit design details.
     */
    design?: {
      /**
       * Enter text value.
       */
      concept?: string | null;
      /**
       * Enter text value.
       */
      inspiration?: string | null;
      /**
       * Enter text value.
       */
      designer?: string | null;
      /**
       * Select a date and/or time.
       */
      year?: string | null;
    };
    /**
     * Kit functionality ratings.
     */
    functionality?: {
      /**
       * Select one or more options.
       */
      performance?: ('Standard' | 'Enhanced' | 'Maximum') | null;
      /**
       * Select one or more options.
       */
      durability?: ('Low' | 'Medium' | 'High' | 'Extreme') | null;
      /**
       * Select one or more options.
       */
      comfort?: ('Basic' | 'Comfortable' | 'Premium') | null;
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
     * Material and construction composition.
     */
    composition?: {
      /**
       * Select one or more options.
       */
      construction?: ('CutAndSew' | 'Knitted' | '3DPrinted' | 'Molded') | null;
      /**
       * Select one or more options.
       */
      assembly?: ('Glued' | 'Stitched' | 'Welded' | 'Bonded') | null;
      /**
       * Select one or more options.
       */
      finish?: ('Matte' | 'Glossy' | 'Textured' | 'Coated') | null;
    };
    /**
     * Materials used in the kit.
     */
    materials?:
    | {
      /**
       * Select one or more options.
       */
      type?: ('Cotton' | 'Polyester' | 'Nomex' | 'Carbon' | 'Leather' | 'Synthetic') | null;
      /**
       * Enter text value.
       */
      specification?: string | null;
      /**
       * Enter text value.
       */
      origin?: string | null;
      id?: string | null;
    }[]
    | null;
    /**
     * Visual appearance and branding.
     */
    appearance?: {
      /**
       * Enter text value.
       */
      colors?: string | null;
      /**
       * Select one or more options.
       */
      branding?: ('Minimal' | 'Prominent' | 'Full' | 'Heritage') | null;
      /**
       * Select one or more options.
       */
      style?: ('Classic' | 'Modern' | 'Futuristic' | 'Retro') | null;
    };
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
    thumbnail?: (number | null) | Media;
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
    visualizations?: (number | null) | Visualization;
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
    entities?:
    | ({
      relationTo: 'drivers';
      value: number | Driver;
    } | null)
    | ({
      relationTo: 'members';
      value: number | Member;
    } | null)
    | ({
      relationTo: 'leaders';
      value: number | Leader;
    } | null);
    /**
     * Select related document(s).
     */
    associations?:
    | ({
      relationTo: 'individuals';
      value: number | Individual;
    } | null)
    | ({
      relationTo: 'organizations';
      value: number | Organization;
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
