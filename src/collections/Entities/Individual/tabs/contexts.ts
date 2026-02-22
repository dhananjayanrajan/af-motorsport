// FILE: src/collections/Entities/Individuals/tabs/contexts.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const contextsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'history',
        relationTo: 'histories',
        dictionary: dictionary.tabs.contexts.fields,
        width: 2,
        flags: [],
      }),
      relationshipFieldFactory({
        name: 'notes',
        relationTo: 'notes',
        dictionary: dictionary.tabs.contexts.fields,
        width: 2,
        flags: ['hasMany'],
      }),
    ],
  },
]
