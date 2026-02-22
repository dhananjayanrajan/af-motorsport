// FILE: src/collections/Competition/Sessions/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const traitsFields: Field[] = [
  advanced(
    {
      name: 'constraints',
      type: 'array',
      label: dictionary.tabs.traits.fields.constraints.label,
      admin: {
        description: dictionary.tabs.traits.fields.constraints.description,
      },
      fields: [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'type',
              relationTo: 'classifications',
              dictionary: dictionary.tabs.traits.fields.constraints.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'limit',
              dictionary: dictionary.tabs.traits.fields.constraints.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'unit',
              dictionary: dictionary.tabs.traits.fields.constraints.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ],
        },
      ],
    }
  ),
  advanced(
    {
      name: 'parameters',
      type: 'array',
      label: dictionary.tabs.traits.fields.parameters.label,
      admin: {
        description: dictionary.tabs.traits.fields.parameters.description,
      },
      fields: [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'parameter',
              relationTo: 'classifications',
              dictionary: dictionary.tabs.traits.fields.parameters.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'value',
              dictionary: dictionary.tabs.traits.fields.parameters.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'unit',
              dictionary: dictionary.tabs.traits.fields.parameters.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ],
        },
      ],
    }
  ),
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'specifications',
        relationTo: 'specifications',
        dictionary: dictionary.tabs.traits.fields,
        width: 1,
        flags: ['hasMany', 'advanced'],
      }),
    ],
  },
]
