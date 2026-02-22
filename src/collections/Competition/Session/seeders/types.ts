export interface Session {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The session name.
   */
  name: string;
  /**
   * Enter text value.
   */
  alias?: string | null;
  /**
   * Enter text value.
   */
  code?: string | null;
  /**
   * The type of session.
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
     * Session status.
     */
    status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Postponed' | 'Abandoned' | 'Provisional';
    /**
     * Session access.
     */
    access: 'Public' | 'Private' | 'InviteOnly' | 'MemberOnly' | 'VIP';
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
    narrative?: (number | null) | Narrative;
    /**
     * Associated event.
     */
    event: number | Event;
    /**
     * Session format.
     */
    format?: {
      /**
       * Enter text value.
       */
      segment?: string | null;
      /**
       * Enter numeric value.
       */
      duration?: number | null;
      /**
       * Enter numeric value.
       */
      interval?: number | null;
      /**
       * Enter text value.
       */
      specification?: string | null;
    };
    /**
     * Select related document(s).
     */
    classifications?: (number | null) | Classification;
    /**
     * Select related document(s).
     */
    features?: (number | null) | Feature;
    /**
     * Select related document(s).
     */
    protocols?: (number | null) | Protocol;
    /**
     * Select related document(s).
     */
    strategies?: (number | null) | Strategy;
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
     * Session constraints.
     */
    constraints?:
    | {
      /**
       * Select related document(s).
       */
      type?: (number | null) | Classification;
      /**
       * Enter text value.
       */
      limit?: string | null;
      /**
       * Enter text value.
       */
      unit?: string | null;
      id?: string | null;
    }[]
    | null;
    /**
     * Session parameters.
     */
    parameters?:
    | {
      /**
       * Select related document(s).
       */
      parameter?: (number | null) | Classification;
      /**
       * Enter text value.
       */
      value?: string | null;
      /**
       * Enter text value.
       */
      unit?: string | null;
      id?: string | null;
    }[]
    | null;
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
   * Performance stats.
   */
  metrics?: {
    /**
     * Toggle the Metrics section on or off.
     */
    enable?: boolean | null;
    /**
     * Quantifiable data.
     */
    quantifiers?: {
      /**
       * Enter numeric value.
       */
      laps?: number | null;
      /**
       * Enter text value.
       */
      distance?: string | null;
      /**
       * Enter text value.
       */
      duration?: string | null;
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
    gallery?: (number | null) | Gallery;
    /**
     * Select related document(s).
     */
    playlist?: (number | null) | Playlist;
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
    highlights?: (number | null) | Highlight;
    /**
     * Select related document(s).
     */
    incidents?: (number | null) | Incident;
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
    participants?: (number | null) | Driver;
    /**
     * Select related document(s).
     */
    crews?: (number | null) | Member;
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
    } | null);
    /**
     * Select related document(s).
     */
    insights?: (number | null) | Note;
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
