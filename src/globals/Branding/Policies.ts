import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { GlobalConfig } from 'payload'

export const Policies: GlobalConfig = {
  slug: 'policies',
  label: 'Policies',
  access: {
    read: adminOrPublishedStatus,
  },
  admin: {
    group: 'Branding',
    description: 'All legal and operational policies — privacy, terms, cookies, returns, refunds, and transactions.',
  },
  fields: [
    {
      name: 'documents',
      label: 'Policy Documents',
      type: 'array',
      fields: [
        {
          name: 'type',
          label: 'Policy Type',
          type: 'select',
          required: true,
          options: [
            { label: 'Privacy Policy', value: 'privacy' },
            { label: 'Terms of Use', value: 'terms' },
            { label: 'Cookie Policy', value: 'cookies' },
            { label: 'Returns Policy', value: 'returns' },
            { label: 'Refunds Policy', value: 'refunds' },
            { label: 'Transaction Policy', value: 'transactions' },
            { label: 'Legal Notice', value: 'legal' },
          ],
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'version',
          label: 'Version',
          type: 'text',
          admin: {
            description: 'E.g. v1.2 or 2025-01',
          },
        },
        {
          name: 'lastUpdated',
          label: 'Last Updated',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
            },
          },
        },
        {
          name: 'body',
          label: 'Policy Body',
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
          name: 'visible',
          label: 'Visible',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
  ],
}