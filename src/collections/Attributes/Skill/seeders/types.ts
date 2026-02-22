export interface Skill {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  /**
   * Skill name.
   */
  name: string;
  /**
   * Skill type.
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
     * Skill description.
     */
    description?: string | null;
    /**
     * Skill scope.
     */
    scope?: {
      /**
       * Skill significance.
       */
      significance?: string | null;
      /**
       * Skill scale.
       */
      scale?: ('Narrow' | 'Moderate' | 'Broad' | 'Comprehensive') | null;
      /**
       * Skill depth.
       */
      depth?: ('Basic' | 'Intermediate' | 'Advanced' | 'Expert') | null;
      /**
       * Skill rarity.
       */
      rarity?: ('Common' | 'Uncommon' | 'Rare' | 'Unique') | null;
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
     * Official definition.
     */
    definition?: string | null;
    /**
     * Learning methods.
     */
    methods?:
    | {
      /**
       * Method name.
       */
      method?: string | null;
      /**
       * Method type.
       */
      type?: ('Theoretical' | 'Practical' | 'Simulation' | 'Field') | null;
      /**
       * Method description.
       */
      description?: string | null;
      id?: string | null;
    }[]
    | null;
    /**
     * Related features.
     */
    features?: (number | null) | Feature;
    /**
     * Related specs.
     */
    specifications?: (number | null) | Specification;
    /**
     * Skill dependencies.
     */
    dependencies?:
    | {
      /**
       * Dependent skill.
       */
      skill?: (number | null) | Skill;
      /**
       * Dependency type.
       */
      type?: ('Prerequisite' | 'Corequisite' | 'Recommended') | null;
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
     * Skill nature.
     */
    nature?: {
      /**
       * Skill complexity.
       */
      complexity?: ('Low' | 'Medium' | 'High' | 'Extreme') | null;
      /**
       * Skill visibility.
       */
      visibility?: ('Obvious' | 'Subtle' | 'Concealed' | 'Latent') | null;
      /**
       * Skill impact.
       */
      impact?: ('Minor' | 'Moderate' | 'Major' | 'Transformative') | null;
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
     * Related classifications.
     */
    classifications?: (number | null) | Classification;
    /**
     * Related trainings.
     */
    trainings?: (number | null) | Training;
    /**
     * Related notes.
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
