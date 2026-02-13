import type { GlobalConfig } from 'payload'

import { link } from '@/fields/common/link'

export const Socials: GlobalConfig = {
  slug: 'socials',
  admin: {
    group: 'Connectivity',
    description: 'Defines the global social media links.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'socials',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 12,
    },
  ],
}
