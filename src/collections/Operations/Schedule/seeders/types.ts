export interface Schedule {
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
    agenda?: string | null;
    /**
     * Significance and scale of the schedule.
     */
    scope?: {
      /**
       * Select one or more options.
       */
      significance?: ('Minor' | 'Moderate' | 'Major' | 'Critical') | null;
      /**
       * Select one or more options.
       */
      scale?: ('Individual' | 'Team' | 'Department' | 'Organization') | null;
      /**
       * Select one or more options.
       */
      depth?: ('Overview' | 'Detailed' | 'Comprehensive') | null;
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
     * Date and recurring type.
     */
    chronology?: {
      /**
       * Select a date and/or time.
       */
      date: string;
      /**
       * Select one or more options.
       */
      type?: ('Single' | 'Recurring' | 'MultiDay') | null;
    };
    /**
     * Timeline of activities.
     */
    slots?:
    | {
      /**
       * Enter text value.
       */
      activity: string;
      /**
       * Select a date and/or time.
       */
      start: string;
      /**
       * Select a date and/or time.
       */
      end: string;
      /**
       * Enter text value.
       */
      duration?: string | null;
      /**
       * Enter text value.
       */
      location?: string | null;
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
     * Factors limiting the schedule.
     */
    constraints?:
    | {
      /**
       * Enter text value.
       */
      constraint?: string | null;
      /**
       * Select one or more options.
       */
      type?: ('Time' | 'Resource' | 'Weather' | 'Regulation') | null;
      /**
       * Select one or more options.
       */
      impact?: ('Low' | 'Medium' | 'High' | 'Blocking') | null;
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
    occurrences?:
    | ({
      relationTo: 'trainings';
      value: number | Training;
    } | null)
    | ({
      relationTo: 'meetups';
      value: number | Meetup;
    } | null)
    | ({
      relationTo: 'initiatives';
      value: number | Initiative;
    } | null)
    | ({
      relationTo: 'celebrations';
      value: number | Celebration;
    } | null);
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
      relationTo: 'organizations';
      value: number | Organization;
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
