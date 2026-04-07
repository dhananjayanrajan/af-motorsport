import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'
import type { GlobalConfig } from 'payload'

export const Identity: GlobalConfig = {
  slug: 'identity',
  label: 'Identity',
  access: {
    read: adminOrPublishedStatus,
  },
  admin: {
    group: 'Branding',
    description: 'The complete brand identity of AF Motorsport — vision, values, voice, leadership, and visual identity.',
  },
  fields: [
    {
      name: 'vision',
      label: 'Vision Statement',
      type: 'text',
      localized: true,
      admin: {
        description: 'The single sentence that defines what AF Motorsport exists to achieve.',
      },
    },
    {
      name: 'mission',
      label: 'Mission Statement',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'How AF Motorsport pursues its vision — the operational purpose.',
      },
    },
    {
      name: 'story',
      label: 'Founding Story',
      type: 'richText',
      localized: true,
      admin: {
        description: 'The authored narrative that tells the origin and founding story of AF Motorsport.',
      },
    },
    {
      name: 'values',
      label: 'Brand Values',
      type: 'array',
      maxRows: 10,
      fields: [
        {
          name: 'value',
          label: 'Value',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'principleName',
          label: 'Associated Principle',
          type: 'text',
          localized: true,
          admin: {
            description: 'The name of the principle that backs this value (e.g., "Precision", "Passion").',
          },
        },
      ],
    },
    {
      name: 'voice',
      label: 'Brand Voice',
      type: 'group',
      fields: [
        {
          name: 'toneKeywords',
          label: 'Tone Keywords',
          type: 'array',
          maxRows: 5,
          fields: [
            {
              name: 'keyword',
              label: 'Keyword',
              type: 'text',
              required: true,
              localized: true,
            },
          ],
          admin: {
            description: 'Keywords that define how AF Motorsport communicates (e.g., "Bold", "Technical", "Inspiring").',
          },
        },
        {
          name: 'description',
          label: 'Voice Description',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'How the brand speaks — the character, register, and style of all communication.',
          },
        },
      ],
    },
    {
      name: 'leadership',
      label: 'Leadership',
      type: 'relationship',
      relationTo: 'leaders',
      hasMany: true,
      admin: {
        description: 'The leaders who represent and embody the brand publicly.',
      },
    },
    {
      name: 'sustainability',
      label: 'Sustainability',
      type: 'group',
      fields: [
        {
          name: 'stance',
          label: 'Sustainability Stance',
          type: 'textarea',
          localized: true,
          admin: {
            description: "AF Motorsport's position and commitments on sustainability.",
          },
        },
        {
          name: 'initiativeNames',
          label: 'Key Initiatives',
          type: 'array',
          maxRows: 5,
          fields: [
            {
              name: 'name',
              label: 'Initiative Name',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
              localized: true,
            },
          ],
          admin: {
            description: 'Active initiatives that support the sustainability stance.',
          },
        },
      ],
    },
    {
      name: 'visual',
      label: 'Visual Identity',
      type: 'group',
      fields: [
        {
          name: 'logo',
          label: 'Primary Logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'logoInverted',
          label: 'Inverted Logo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Logo variant for dark backgrounds.',
          },
        },
        {
          name: 'wordmark',
          label: 'Wordmark',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'favicon',
          label: 'Favicon',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'primaryColour',
          label: 'Primary Colour',
          type: 'text',
          admin: {
            description: 'Hex value. E.g. #C0392B',
          },
        },
        {
          name: 'secondaryColour',
          label: 'Secondary Colour',
          type: 'text',
          admin: {
            description: 'Hex value.',
          },
        },
        {
          name: 'guidelines',
          label: 'Brand Guidelines',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Brand guidelines document or PDF.',
          },
        },
      ],
    },
  ],
}