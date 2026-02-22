// FILE: src/collections/Content/Notes/tabs/assets.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const assetsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'archive',
        relationTo: 'archives',
        dictionary: dictionary.tabs.assets.fields,
        width: 1,
        flags: [],
      }),
    ],
  },
]
