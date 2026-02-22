// FILE: src/collections/Competition/Results/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const detailsFields: Field[] = [
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
        name: 'classification',
        relationTo: 'classifications',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: ['advanced'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'highlights',
        relationTo: 'highlights',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: ['hasMany', 'advanced'],
      }),
      relationshipFieldFactory({
        name: 'incidents',
        relationTo: 'incidents',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: ['hasMany', 'advanced'],
      }),
    ],
  },
]
