// FILE: src/collections/Entities/Leaders/tabs/details.ts
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
        name: 'vision',
        relationTo: 'principles',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: ['hasMany', 'advanced'],
      }),
      relationshipFieldFactory({
        name: 'departments',
        relationTo: 'classifications',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: ['hasMany'],
      }),
    ],
  },
]
