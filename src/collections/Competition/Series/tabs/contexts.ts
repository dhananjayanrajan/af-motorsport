// FILE: src/collections/Competition/Series/tabs/contexts.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const contextsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'locations',
        relationTo: 'locations',
        dictionary: dictionary.tabs.contexts.fields,
        width: 3,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'authorities',
        relationTo: ['organizations', 'individuals'],
        dictionary: dictionary.tabs.contexts.fields,
        width: 3,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'notes',
        relationTo: 'notes',
        dictionary: dictionary.tabs.contexts.fields,
        width: 3,
        flags: ['hasMany'],
      }),
    ],
  },
]
