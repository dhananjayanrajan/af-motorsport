// FILE: src/collections/Outcomes/Decisions/tabs/contexts.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const contextsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'protocols',
          relationTo: 'protocols',
          dictionary: dictionary.tabs.contexts.fields,
          width: 3,
          flags: ['hasMany', 'advanced'],
        }),
        relationshipFieldFactory({
          name: 'preferences',
          relationTo: 'preferences',
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
    }
  ),
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'entities',
          relationTo: ['organizations', 'individuals', 'leaders', 'drivers', 'members'],
          dictionary: dictionary.tabs.contexts.fields,
          width: 2,
          flags: ['hasMany', 'advanced'],
        }),
        relationshipFieldFactory({
          name: 'impacts',
          relationTo: 'impacts',
          dictionary: dictionary.tabs.contexts.fields,
          width: 2,
          flags: ['hasMany', 'advanced'],
        }),
      ],
    }
  ),
]
