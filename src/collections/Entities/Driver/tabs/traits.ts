// FILE: src/collections/Entities/Drivers/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const traitsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'channels',
          relationTo: 'channels',
          dictionary: dictionary.tabs.traits.fields,
          width: 2,
          flags: ['hasMany', 'advanced'],
        }),
        relationshipFieldFactory({
          name: 'experiences',
          relationTo: 'experiences',
          dictionary: dictionary.tabs.traits.fields,
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
        name: 'skills',
        relationTo: 'skills',
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'trainings',
        relationTo: 'trainings',
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: ['hasMany'],
      }),
    ],
  },
]
