import { link } from '@/fields/common/link'
import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header Navigation',
  admin: {
    group: 'Configurations',
    description: 'Defines the global mega menu navigation — primary nav items, sub-links, spotlights, utility nav, and the primary CTA.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      label: 'Navigation Items',
      type: 'array',
      minRows: 7,
      maxRows: 7,
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
        },
        {
          name: 'tagline',
          label: 'Tagline',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
        },
        {
          name: 'subItems',
          label: 'Sub Items',
          type: 'array',
          maxRows: 10,
          fields: [
            {
              name: 'label',
              label: 'Label',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              label: 'Description',
              type: 'text',
            },
            link({ appearances: false }),
            {
              name: 'isFeatured',
              label: 'Featured',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        {
          name: 'spotlight',
          label: 'Spotlight',
          type: 'group',
          fields: [
            {
              name: 'enable',
              label: 'Show spotlight',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'label',
              label: 'Spotlight Label',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData?.enable,
              },
            },
            {
              name: 'entity',
              label: 'Featured Entity',
              type: 'relationship',
              relationTo: [
                'drivers',
                'leaders',
                'members',
                'cars',
                'kits',
                'series',
                'seasons',
                'events',
                'awards',
                'stories',
                'journeys',
                'histories',
                'initiatives',
                'celebrations',
                'meetups',
                'careers',
                'trainings',
                'organizations',
              ],
              admin: {
                condition: (_, siblingData) => siblingData?.enable,
              },
            },
            {
              name: 'overrideUrl',
              label: 'Override URL',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData?.enable,
              },
            },
          ],
        },
        {
          name: 'visible',
          label: 'Visible',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'utilityNav',
      label: 'Utility Navigation',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
        },
        link({ appearances: false }),
        {
          name: 'visible',
          label: 'Visible',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'cta',
      label: 'Primary CTA',
      type: 'group',
      fields: [
        {
          name: 'enable',
          label: 'Show CTA',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.enable,
          },
        },
        link({ appearances: false }),
      ],
    },
  ],
}