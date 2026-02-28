// FILE: src/collections/Attributes/Channel/seeders/types.ts
export interface Channel {
  id: number;
  toggle?: ('simple' | 'advanced') | null;
  name?: string | null;
  type: (number | Category)[];
  basics?: {
    enable?: boolean | null;
    description?: string | null;
    visibility?: {
      show?: boolean | null;
    };
  };
  details?: {
    enable?: boolean | null;
    identifier?: {
      label?: string | null;
      title?: string | null;
    };
    address?: {
      value?: string | null;
      locator?: string | null;
      endpoint?: string | null;
    };
    protocol?: {
      format?: ('HTTP' | 'HTTPS' | 'FTP' | 'SFTP' | 'SMTP' | 'Custom') | null;
      scheme?: ('Standard' | 'Secure' | 'Legacy') | null;
      specification?: string | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  traits?: {
    enable?: boolean | null;
    usage?: {
      list?:
      | {
        purpose?: string | null;
        role?: ('Primary' | 'Secondary' | 'Backup' | 'Test') | null;
        function?: ('Broadcast' | 'Receive' | 'Monitor' | 'Control') | null;
        settings?: {
          show?: boolean | null;
          featured?: boolean | null;
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    validity?: {
      list?:
      | {
        status?: ('Active' | 'Inactive' | 'Pending' | 'Deprecated') | null;
        condition?: ('Operational' | 'Degraded' | 'Failed' | 'Maintenance') | null;
        state?: ('Enabled' | 'Disabled' | 'Locked') | null;
        settings?: {
          show?: boolean | null;
          featured?: boolean | null;
          pinned?: boolean | null;
        };
        id?: string | null;
      }[]
      | null;
    };
    visibility?: {
      show?: boolean | null;
    };
  };
  seo?: {
    title?: string | null;
    image?: (number | null) | Media;
    description?: string | null;
  };
  generateSlug?: boolean | null;
  slug?: string | null;
  categories?: (number | Category)[] | null;
  tags?: (number | Tag)[] | null;
  visibility?: {
    check_publish?: boolean | null;
    check_featured?: boolean | null;
    check_pinned?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
