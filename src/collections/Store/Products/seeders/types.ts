export interface Product {
  id: number;
  title: string;
  description?: {
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
  } | null;
  gallery?:
  | {
    image?: (number | null) | Media;
    variantOption?: (number | null) | VariantOption;
    id?: string | null;
  }[]
  | null;
  layout?: (CallToActionBlock | ContentBlock | MediaBlock)[] | null;
  inventory?: number | null;
  enableVariants?: boolean | null;
  variantTypes?: (number | VariantType)[] | null;
  variants?: {
    docs?: (number | Variant)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  priceInUSDEnabled?: boolean | null;
  priceInUSD?: number | null;
  relatedProducts?: (number | Product)[] | null;
  meta?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  categories?: (number | Category)[] | null;
  /**
   * When enabled, the slug will auto-generate from the title field on save and autosave.
   */
  generateSlug?: boolean | null;
  slug: string;
  updatedAt: string;
  createdAt: string;
  deletedAt?: string | null;
  _status?: ('draft' | 'published') | null;
}
