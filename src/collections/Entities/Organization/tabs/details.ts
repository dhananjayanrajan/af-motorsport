// FILE: src/collections/Entities/Organizations/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { groupFactory } from '@/fields/factories/blueprint'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const detailsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'narrative',
          relationTo: 'narratives',
          dictionary: dictionary.tabs.details.fields,
          width: 1,
          flags: ['advanced'],
        }),
      ],
    }
  ),
  advanced(
    {
      type: 'row',
      fields: [
        textareaFieldFactory({
          name: 'background',
          dictionary: dictionary.tabs.details.fields,
          width: 1,
          flags: ['localized', 'advanced'],
        }),
      ],
    }
  ),
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'parent',
        relationTo: 'organizations',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['advanced'],
      }),
    ],
  },
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.evolution,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            dateFieldFactory({
              name: 'founded',
              dictionary: dictionary.tabs.details.fields.evolution.fields,
              width: 2,
              flags: [],
              pickerAppearance: 'dayOnly',
            }),
            dateFieldFactory({
              name: 'merged',
              dictionary: dictionary.tabs.details.fields.evolution.fields,
              width: 2,
              flags: ['advanced'],
              pickerAppearance: 'dayOnly',
            }),
          ],
        },
        {
          type: 'row',
          fields: [
            dateFieldFactory({
              name: 'rebranded',
              dictionary: dictionary.tabs.details.fields.evolution.fields,
              width: 2,
              flags: ['advanced'],
              pickerAppearance: 'dayOnly',
            }),
            dateFieldFactory({
              name: 'defunct',
              dictionary: dictionary.tabs.details.fields.evolution.fields,
              width: 2,
              flags: ['advanced'],
              pickerAppearance: 'dayOnly',
            }),
          ],
        },
      ],
      false
    )
  ),
]
