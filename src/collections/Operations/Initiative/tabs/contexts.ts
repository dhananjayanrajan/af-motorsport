// FILE: src/collections/Operations/Initiatives/tabs/contexts.ts
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
          name: 'classifications',
          relationTo: 'classifications',
          dictionary: dictionary.tabs.contexts.fields,
          width: 2,
          flags: ['advanced'],
        }),
        relationshipFieldFactory({
          name: 'entities',
          relationTo: ['organizations', 'leaders', 'individuals'],
          dictionary: dictionary.tabs.contexts.fields,
          width: 2,
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
          name: 'schedules',
          relationTo: 'schedules',
          dictionary: dictionary.tabs.contexts.fields,
          width: 2,
          flags: ['hasMany', 'advanced'],
        }),
        relationshipFieldFactory({
          name: 'references',
          relationTo: ['incidents', 'celebrations'],
          dictionary: dictionary.tabs.contexts.fields,
          width: 2,
          flags: ['hasMany', 'advanced'],
        }),
      ],
    }
  ),
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'histories',
        relationTo: 'histories',
        dictionary: dictionary.tabs.contexts.fields,
        width: 1,
        flags: ['hasMany', 'advanced'],
      }),
    ],
  },
]
