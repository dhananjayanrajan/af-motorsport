export interface Channel {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * The name of the channel.
   */
  name: string;
  /**
   * Category of the channel.
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
     * Identification details.
     */
    identifier?: {
      /**
       * Display name.
       */
      label?: string | null;
      /**
       * Formal title.
       */
      title?: string | null;
    };
    /**
     * Address details.
     */
    address?: {
      /**
       * The actual address.
       */
      value?: string | null;
      /**
       * Location reference.
       */
      locator?: string | null;
      /**
       * Specific endpoint.
       */
      endpoint?: string | null;
    };
    /**
     * Protocol details.
     */
    protocol: {
      /**
       * Data format.
       */
      format: 'HTTP' | 'HTTPS' | 'FTP' | 'SFTP' | 'SMTP' | 'Custom';
      /**
       * Communication scheme.
       */
      scheme?: ('Standard' | 'Secure' | 'Legacy') | null;
      /**
       * Technical spec.
       */
      specification?: string | null;
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
     * Usage constraints.
     */
    usage?: {
      list?:
      | {
        /**
         * Intended use.
         */
        purpose?: string | null;
        /**
         * Functional role.
         */
        role?: ('Primary' | 'Secondary' | 'Backup' | 'Test') | null;
        /**
         * Operational function.
         */
        function?: ('Broadcast' | 'Receive' | 'Monitor' | 'Control') | null;
        settings?: {
          /**
           * Toggle the Usage entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Usage entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Usage entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    /**
     * Validity status.
     */
    validity?: {
      list?:
      | {
        /**
         * Current status.
         */
        status?: ('Active' | 'Inactive' | 'Pending' | 'Deprecated') | null;
        /**
         * Operational condition.
         */
        condition?: ('Operational' | 'Degraded' | 'Failed' | 'Maintenance') | null;
        /**
         * Connection state.
         */
        state?: ('Enabled' | 'Disabled' | 'Locked') | null;
        settings?: {
          /**
           * Toggle the Validity entry on or off.
           */
          show?: boolean | null;
          /**
           * Toggle the Validity entry on or off.
           */
          featured?: boolean | null;
          /**
           * Toggle the Validity entry on or off.
           */
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    visibility?: {
      /**
       * Toggle the Traits section on or off.
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
