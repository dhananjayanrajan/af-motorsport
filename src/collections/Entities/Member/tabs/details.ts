// FILE: src/collections/Entities/Members/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
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
        name: 'departments',
        relationTo: 'classifications',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['hasMany'],
      }),
    ],
  },
]
