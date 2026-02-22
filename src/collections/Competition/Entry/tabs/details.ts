// FILE: src/collections/Competition/Entries/tabs/details.ts
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
        name: 'session',
        relationTo: 'sessions',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: ['required'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'drivers',
        relationTo: 'drivers',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: ['hasMany', 'required'],
      }),
      relationshipFieldFactory({
        name: 'crew',
        relationTo: 'members',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: ['hasMany', 'advanced'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'car',
        relationTo: 'cars',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: ['required'],
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
]
