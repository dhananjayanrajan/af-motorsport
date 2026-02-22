// FILE: src/collections/Operations/Meetups/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const detailsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'narrative',
        relationTo: 'narratives',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['required'],
      }),
    ],
  },
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'features',
          relationTo: 'features',
          dictionary: dictionary.tabs.details.fields,
          width: 1,
          flags: ['hasMany', 'advanced'],
        }),
      ],
    }
  ),
]
