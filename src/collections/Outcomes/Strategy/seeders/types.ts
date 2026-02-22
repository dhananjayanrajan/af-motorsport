export interface Strategy {
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
     * Enter text value.
     */
    methodology?: string | null;
    /**
     * Select related document(s).
     */
    decisions?: (number | null) | Decision;
    /**
     * Select related document(s).
     */
    impacts?: (number | null) | Impact;
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
     * Strategy directives.
     */
    directives?:
    | {
      /**
       * Enter text value.
       */
      phase?: string | null;
      /**
       * Enter text value.
       */
      action?: string | null;
      /**
       * Enter text value.
       */
      owner?: string | null;
      /**
       * Select a date and/or time.
       */
      deadline?: string | null;
      id?: string | null;
    }[]
    | null;
    /**
     * Strategy contingencies.
     */
    contingencies?:
    | {
      /**
       * Enter text value.
       */
      trigger?: string | null;
      /**
       * Enter text value.
       */
      response?: string | null;
      /**
       * Select one or more options.
       */
      probability?: ('Low' | 'Medium' | 'High' | 'Certain') | null;
      /**
       * Select one or more options.
       */
      impact?: ('Minor' | 'Moderate' | 'Major' | 'Critical') | null;
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
    narrative?: (number | null) | Narrative;
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
    } | null)
    | ({
      relationTo: 'organizations';
      value: number | Organization;
    } | null)
    | ({
      relationTo: 'kits';
      value: number | Kit;
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
