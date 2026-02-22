// FILE: src/collections/Competition/Seasons/tabs/contexts.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const contextsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'authorities',
        relationTo: ['organizations', 'individuals'],
        dictionary: dictionary.tabs.contexts.fields,
        width: 2,
        flags: ['hasMany', 'advanced'],
      }),
      relationshipFieldFactory({
        name: 'teams',
        relationTo: 'organizations',
        dictionary: dictionary.tabs.contexts.fields,
        width: 2,
        flags: ['hasMany', 'advanced'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'participants',
        relationTo: 'drivers',
        dictionary: dictionary.tabs.contexts.fields,
        width: 2,
        flags: ['hasMany', 'advanced'],
      }),
      relationshipFieldFactory({
        name: 'notes',
        relationTo: 'notes',
        dictionary: dictionary.tabs.contexts.fields,
        width: 2,
        flags: ['hasMany', 'advanced'],
      }),
    ],
  },
]
