import { link } from '@/fields/common/link'
import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer Navigation',
  admin: {
    group: 'Configurations',
    description: 'Defines the global footer — brand block, navigation columns, bottom CTA, legal links, and copyright.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'brand',
      label: 'Brand Block',
      type: 'group',
      fields: [
        {
          name: 'enable',
          label: 'Show brand block',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'logo',
          label: 'Logo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.enable,
          },
        },
        {
          name: 'tagline',
          label: 'Tagline',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.enable,
          },
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          admin: {
            condition: (_, siblingData) => siblingData?.enable,
          },
        },
      ],
    },
    {
      name: 'columns',
      label: 'Navigation Columns',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          name: 'label',
          label: 'Column Heading',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          label: 'Links',
          type: 'array',
          maxRows: 12,
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
          name: 'visible',
          label: 'Visible',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'cta',
      label: 'Bottom CTA',
      type: 'group',
      fields: [
        {
          name: 'enable',
          label: 'Show CTA',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'headline',
          label: 'Headline',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.enable,
          },
        },
        {
          name: 'subtext',
          label: 'Subtext',
          type: 'textarea',
          admin: {
            condition: (_, siblingData) => siblingData?.enable,
          },
        },
        {
          name: 'buttonLabel',
          label: 'Button Label',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.enable,
          },
        },
        link({ appearances: false }),
      ],
    },
    {
      name: 'legal',
      label: 'Legal Links',
      type: 'array',
      maxRows: 8,
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
      name: 'copyright',
      label: 'Copyright',
      type: 'text',
    },
  ],
}