// FILE: src/collections/Attributes/Skills/tabs/contexts.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const contextsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'classifications',
        relationTo: 'classifications',
        dictionary: dictionary.tabs.contexts.fields,
        width: 3,
        flags: ['hasMany', 'advanced'],
      }),
      relationshipFieldFactory({
        name: 'trainings',
        relationTo: 'trainings',
        dictionary: dictionary.tabs.contexts.fields,
        width: 3,
        flags: ['hasMany', 'advanced'],
      }),
      relationshipFieldFactory({
        name: 'notes',
        relationTo: 'notes',
        dictionary: dictionary.tabs.contexts.fields,
        width: 3,
        flags: ['hasMany', 'advanced'],
      }),
    ],
  },
]
