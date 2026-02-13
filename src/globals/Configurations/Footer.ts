import type { GlobalConfig } from 'payload'

import { link } from '@/fields/common/link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer Navigation',
  admin: {
    group: 'Configurations',
    description: 'Defines the global bottom-level navigation and legal references.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
  ],
}
