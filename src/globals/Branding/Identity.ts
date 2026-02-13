import type { GlobalConfig } from 'payload'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Identity: GlobalConfig = {
  slug: 'identity',
  label: 'Identity',
  access: {
    read: adminOrPublishedStatus,
  },
  admin: {
    group: 'Branding',
    description: 'Defines the identity of the entire brand.',
  },
  fields: [
    // Vision
    // Values
    // Leadership
    // Sustainability
    {
      label: 'What are the identity of the entire brand?',
      name: 'identity',
      type: 'richText',
      required: true,
      localized: true,
      admin: {
        description: 'Detailed identity of the entire brand.',
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
