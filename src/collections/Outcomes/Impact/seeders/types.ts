export interface Impact {
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
     * Impact scope and significance.
     */
    scope?: {
      /**
       * Enter text value.
       */
      significance?: string | null;
      /**
       * Select one or more options.
       */
      scale?: ('Local' | 'Regional' | 'National' | 'Global') | null;
      /**
       * Select one or more options.
       */
      depth?: ('Surface' | 'Moderate' | 'Deep' | 'Fundamental') | null;
    };
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
     * Select related document(s).
     */
    tone?: (number | null) | Tone;
    /**
     * Select one or more options.
     */
    velocity?: ('Immediate' | 'Rapid' | 'Gradual' | 'Delayed') | null;
    /**
     * Select one or more options.
     */
    gravity?: ('Catastrophic' | 'Severe' | 'Moderate' | 'Minor' | 'Negligible') | null;
    /**
     * Select one or more options.
     */
    permanence?: ('Permanent' | 'LongTerm' | 'Temporary' | 'Reversible') | null;
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
      relationTo: 'drivers';
      value: number | Driver;
    } | null)
    | ({
      relationTo: 'leaders';
      value: number | Leader;
    } | null)
    | ({
      relationTo: 'members';
      value: number | Member;
    } | null)
    | ({
      relationTo: 'cars';
      value: number | Car;
    } | null)
    | ({
      relationTo: 'kits';
      value: number | Kit;
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
