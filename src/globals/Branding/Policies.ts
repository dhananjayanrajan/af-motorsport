import type { GlobalConfig } from 'payload'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Policies: GlobalConfig = {
  slug: 'policies',
  label: 'Policies',
  access: {
    read: adminOrPublishedStatus,
  },
  admin: {
    group: 'Branding',
    description: 'Defines the policies of the entire brand.',
  },
  fields: [

    // Privacy, Terms, Transactions, Cookies, Legal, Returns, Refunds
    {
      label: 'What are the policies of the entire brand?',
      name: 'policies',
      type: 'richText',
      required: true,
      localized: true,
      admin: {
        description: 'Detailed policies of the entire brand.',
        readOnly: true,
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    }
  ],
}
