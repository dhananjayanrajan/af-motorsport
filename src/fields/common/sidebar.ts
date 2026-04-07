// FILE: src/fields/common/sidebar.ts
import type { Field } from 'payload'
import { slugField } from 'payload'

export const createSidebarFields = (): Field[] => [
  slugField({
    required: false,
    useAsSlug: 'name'
  }),
  {
    label: '',
    type: 'group',
    admin: { position: 'sidebar' },
    fields: [
      {
        label: 'Categories',
        name: 'categories',
        type: 'relationship',
        relationTo: 'categories',
        hasMany: true,
        admin: {
          description: {
            en: 'Categories that are relevant to the record.',
            es: 'Categorías relevantes para el registro.',
            pt: 'Categorias relevantes para o registro.',
          },
          placeholder: 'Create/Select a category',
          appearance: 'select',
          isSortable: true,
          allowCreate: true,
          allowEdit: true,
        },
      },
    ],
  },
  {
    label: '',
    type: 'group',
    admin: { position: 'sidebar' },
    fields: [
      {
        label: 'Tags',
        name: 'tags',
        type: 'relationship',
        relationTo: 'tags',
        hasMany: true,
        admin: {
          description: {
            en: 'Associated tags for the record.',
            es: 'Etiquetas asociadas para el registro.',
            pt: 'Tags associadas para o registro.',
          },
          placeholder: 'Create/Select a tag',
          appearance: 'select',
          isSortable: true,
          allowCreate: true,
          allowEdit: true,
        },
      },
    ],
  },
]