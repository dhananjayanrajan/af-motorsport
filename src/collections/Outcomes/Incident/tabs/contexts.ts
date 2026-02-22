// FILE: src/collections/Outcomes/Incidents/tabs/contexts.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const contextsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'narrative',
        relationTo: 'narratives',
        dictionary: dictionary.tabs.contexts.fields,
        width: 1,
        flags: ['required'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'entities',
        relationTo: ['drivers', 'members', 'leaders', 'organizations', 'kits'],
        dictionary: dictionary.tabs.contexts.fields,
        width: 1,
        flags: ['hasMany'],
      }),
    ],
  },
]
