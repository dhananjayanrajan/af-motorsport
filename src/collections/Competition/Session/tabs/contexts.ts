// FILE: src/collections/Competition/Sessions/tabs/contexts.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const contextsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'highlights',
        relationTo: 'highlights',
        dictionary: dictionary.tabs.contexts.fields,
        width: 2,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'incidents',
        relationTo: 'incidents',
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
        name: 'authorities',
        relationTo: ['organizations', 'individuals'],
        dictionary: dictionary.tabs.contexts.fields,
        width: 2,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'participants',
        relationTo: 'drivers',
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
        name: 'crews',
        relationTo: 'members',
        dictionary: dictionary.tabs.contexts.fields,
        width: 3,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'entities',
        relationTo: ['organizations', 'individuals'],
        dictionary: dictionary.tabs.contexts.fields,
        width: 3,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'insights',
        relationTo: 'notes',
        dictionary: dictionary.tabs.contexts.fields,
        width: 3,
        flags: ['hasMany'],
      }),
    ],
  },
]
