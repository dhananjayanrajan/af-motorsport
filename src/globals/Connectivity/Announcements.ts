import type { GlobalConfig } from 'payload'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Announcements: GlobalConfig = {
  slug: 'announcements',
  label: 'Announcements',
  access: {
    read: adminOrPublishedStatus,
  },
  admin: {
    group: 'Connectivity',
    description: 'Defines the announcements of the entire brand.',
  },
  fields: [
    {
      label: 'What are the announcements of the entire brand?',
      name: 'announcements',
      type: 'richText',
      required: true,
      localized: true,
      admin: {
        description: 'Detailed announcements of the entire brand.',
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
