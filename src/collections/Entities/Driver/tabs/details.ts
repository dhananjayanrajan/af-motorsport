// FILE: src/collections/Entities/Drivers/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
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
          width: 2,
          flags: ['advanced'],
        }),
        relationshipFieldFactory({
          name: 'biography',
          relationTo: 'histories',
          dictionary: dictionary.tabs.details.fields,
          width: 2,
          flags: ['advanced'],
        }),
      ],
    }
  ),
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'journeys',
        relationTo: 'journeys',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['hasMany', 'advanced'],
      }),
    ],
  },
]
