// FILE: src/collections/Entities/Leaders/tabs/contexts.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const contextsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'peers',
        relationTo: ['leaders', 'individuals'],
        dictionary: dictionary.tabs.contexts.fields,
        width: 1,
        flags: ['hasMany'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'crew',
        relationTo: ['drivers', 'members'],
        dictionary: dictionary.tabs.contexts.fields,
        width: 2,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'anecdotes',
        relationTo: 'notes',
        dictionary: dictionary.tabs.contexts.fields,
        width: 2,
        flags: ['hasMany'],
      }),
    ],
  },
]
