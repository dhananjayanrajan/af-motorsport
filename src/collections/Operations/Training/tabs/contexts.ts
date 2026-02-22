// FILE: src/collections/Operations/Trainings/tabs/contexts.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const contextsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'entities',
        relationTo: ['drivers', 'members', 'leaders', 'individuals', 'organizations'],
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
        name: 'strategies',
        relationTo: 'strategies',
        dictionary: dictionary.tabs.contexts.fields,
        width: 3,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'skills',
        relationTo: 'skills',
        dictionary: dictionary.tabs.contexts.fields,
        width: 3,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'stories',
        relationTo: 'stories',
        dictionary: dictionary.tabs.contexts.fields,
        width: 3,
        flags: ['hasMany'],
      }),
    ],
  },
]
