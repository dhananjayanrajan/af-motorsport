import { link } from '@/fields/common/link'
import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header Navigation',
  admin: {
    group: 'Configurations',
    description: 'Defines the global navigation — primary nav items, utility nav, and the primary CTA.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      label: 'Navigation Items',
      type: 'array',
      admin: {
        description: 'Primary navigation links (e.g., Glory, Pursuit, Craft).',
      },
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          label: 'Link',
          type: 'text',
          required: true,
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
      admin: {
        description: 'Secondary links typically found in the top bar or corner (e.g., Store, About).',
      },
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          label: 'Link',
          type: 'text',
          required: true,
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
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.enable,
          },
        },
        link({ appearances: false }),
      ],
    },
  ],
}