// FILE: src/collections/Competition/Points/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const detailsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'result',
        relationTo: 'results',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['required'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'classification',
        relationTo: 'classifications',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: ['advanced'],
      }),
      relationshipFieldFactory({
        name: 'specification',
        relationTo: 'specifications',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: ['advanced'],
      }),
    ],
  },
]
