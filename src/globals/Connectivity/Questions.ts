import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { GlobalConfig } from 'payload'

export const Questions: GlobalConfig = {
  slug: 'questions',
  label: 'Questions',
  access: {
    read: adminOrPublishedStatus,
  },
  admin: {
    group: 'Connectivity',
    description: 'Frequently asked questions — organized by category and rendered as an FAQ across the site.',
  },
  fields: [
    {
      name: 'categories',
      label: 'FAQ Categories',
      type: 'array',
      fields: [
        {
          name: 'label',
          label: 'Category Label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'visible',
          label: 'Visible',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'items',
          label: 'Questions',
          type: 'array',
          fields: [
            {
              name: 'question',
              label: 'Question',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'answer',
              label: 'Answer',
              type: 'richText',
              required: true,
              localized: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
            },
            {
              name: 'relatedPage',
              label: 'Related Page',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}