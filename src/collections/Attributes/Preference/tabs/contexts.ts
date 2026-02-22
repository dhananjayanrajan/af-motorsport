// FILE: src/collections/Attributes/Preferences/tabs/contexts.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const contextsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'principles',
        relationTo: 'principles',
        dictionary: dictionary.tabs.contexts.fields,
        width: 1,
        flags: ['hasMany', 'advanced'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'notes',
        relationTo: 'notes',
        dictionary: dictionary.tabs.contexts.fields,
        width: 1,
        flags: ['hasMany', 'advanced'],
      }),
    ],
  },
]
