// FILE: src/collections/Attributes/Locations/tabs/contexts.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const contextsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'entities',
        relationTo: ['organizations', 'individuals', 'leaders', 'drivers', 'members'],
        dictionary: dictionary.tabs.contexts.fields,
        width: 1,
        flags: ['hasMany', 'advanced'],
      }),
    ],
  },
]
