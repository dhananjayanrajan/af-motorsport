// FILE: src/collections/Content/Histories/tabs/details.ts
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
        width: 2,
        flags: ['required'],
      }),
      relationshipFieldFactory({
        name: 'stories',
        relationTo: 'stories',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: ['hasMany', 'advanced'],
      }),
    ],
  },
]
