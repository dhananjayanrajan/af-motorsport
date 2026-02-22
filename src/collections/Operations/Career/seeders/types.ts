export interface Career {
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
  details: {
    /**
     * Toggle the Details section on or off.
     */
    enable?: boolean | null;
    /**
     * Select related document(s).
     */
    narrative: number | Narrative;
    /**
     * Select related document(s).
     */
    organization: number | Organization;
    /**
     * Select related document(s).
     */
    expectations?: (number | null) | Expectation;
    /**
     * Select related document(s).
     */
    awards?: (number | null) | Award;
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
     * Historical positions held.
     */
    positions?:
    | {
      /**
       * Enter text value.
       */
      title: string;
      /**
       * Select a date and/or time.
       */
      start: string;
      /**
       * Select a date and/or time.
       */
      end?: string | null;
      id?: string | null;
    }[]
    | null;
    /**
     * Select one or more options.
     */
    contract?: ('FullTime' | 'PartTime' | 'Reserve' | 'Test' | 'Loan' | 'Guest') | null;
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
    } | null)
    | ({
      relationTo: 'individuals';
      value: number | Individual;
    } | null)
    | ({
      relationTo: 'cars';
      value: number | Car;
    } | null);
    /**
     * Select related document(s).
     */
    highlights?: (number | null) | Highlight;
    /**
     * Select related document(s).
     */
    stories?: (number | null) | Story;
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
