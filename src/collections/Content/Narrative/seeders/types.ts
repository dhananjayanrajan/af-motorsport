export interface Narrative {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The narrative name.
   */
  name: string;
  /**
   * Enter text value.
   */
  alias?: string | null;
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
     * Main narrative body.
     */
    content: {
      root: {
        type: string;
        children: {
          type: any;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    };
    /**
     * Narrative scope.
     */
    scope?: {
      /**
       * Select one or more options.
       */
      significance?: ('Minor' | 'Moderate' | 'Major' | 'Historic') | null;
      /**
       * Select one or more options.
       */
      scale?: ('Individual' | 'Team' | 'Organization' | 'Sport') | null;
      /**
       * Select one or more options.
       */
      depth?: ('Surface' | 'Detailed' | 'Comprehensive' | 'Exhaustive') | null;
      /**
       * Enter text value.
       */
      level?: string | null;
    };
    /**
     * Narrative context.
     */
    context?: {
      /**
       * Enter text value.
       */
      background?: string | null;
      /**
       * Enter text value.
       */
      perspective?: string | null;
      /**
       * Enter text value.
       */
      purpose?: string | null;
    };
    /**
     * Key moments.
     */
    timeline?:
    | {
      /**
       * Select a date and/or time.
       */
      date?: string | null;
      /**
       * Select one or more options.
       */
      type?: ('Event' | 'Milestone' | 'Decision' | 'Incident') | null;
      id?: string | null;
    }[]
    | null;
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
     * Emotional tone.
     */
    tone?: (number | null) | Tone;
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
    locations?: (number | null) | Location;
    /**
     * Select related document(s).
     */
    notes?: (number | null) | Note;
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
