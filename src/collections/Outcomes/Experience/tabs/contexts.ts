// FILE: src/collections/Outcomes/Experiences/tabs/contexts.ts
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
          name: 'entities',
          relationTo: ['organizations', 'drivers', 'members', 'leaders', 'individuals'],
          dictionary: dictionary.tabs.contexts.fields,
          width: 2,
          flags: ['hasMany', 'advanced'],
        }),
        relationshipFieldFactory({
          name: 'highlights',
          relationTo: 'highlights',
          dictionary: dictionary.tabs.contexts.fields,
          width: 2,
          flags: ['hasMany', 'advanced'],
        }),
        relationshipFieldFactory({
          name: 'incidents',
          relationTo: 'incidents',
          dictionary: dictionary.tabs.contexts.fields,
          width: 2,
          flags: ['hasMany', 'advanced'],
        }),
        relationshipFieldFactory({
          name: 'journey',
          relationTo: 'journeys',
          dictionary: dictionary.tabs.contexts.fields,
          width: 2,
          flags: ['advanced'],
        }),
      ]
    }
  ),
]
