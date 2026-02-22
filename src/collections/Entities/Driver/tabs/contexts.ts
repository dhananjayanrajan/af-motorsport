// FILE: src/collections/Entities/Drivers/tabs/contexts.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const contextsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'teammates',
        relationTo: 'drivers',
        dictionary: dictionary.tabs.contexts.fields,
        width: 2,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'crew',
        relationTo: ['members', 'leaders'],
        dictionary: dictionary.tabs.contexts.fields,
        width: 2,
        flags: ['hasMany'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'cars',
        relationTo: 'cars',
        dictionary: dictionary.tabs.contexts.fields,
        width: 2,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'kits',
        relationTo: 'kits',
        dictionary: dictionary.tabs.contexts.fields,
        width: 2,
        flags: ['hasMany'],
      }),
    ],
  },
]
