// FILE: src/collections/Resources/Galleries/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const detailsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'images',
        relationTo: 'media',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['hasMany', 'required'],
      }),
    ],
  },
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
]
