// FILE: src/collections/Operations/Duties/tabs/contexts.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const contextsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'protocols',
        relationTo: 'protocols',
        dictionary: dictionary.tabs.contexts.fields,
        width: 3,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'expectations',
        relationTo: 'expectations',
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
