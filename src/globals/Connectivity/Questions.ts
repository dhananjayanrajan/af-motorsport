import type { GlobalConfig } from 'payload'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Questions: GlobalConfig = {
  slug: 'questions',
  label: 'Questions',
  access: {
    read: adminOrPublishedStatus,
  },
  admin: {
    group: 'Connectivity',
    description: 'Defines the questions of the entire brand.',
  },
  fields: [
    {
      label: 'What are the questions of the entire brand?',
      name: 'questions',
      type: 'richText',
      required: true,
      localized: true,
      admin: {
        description: 'Detailed questions of the entire brand.',
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
