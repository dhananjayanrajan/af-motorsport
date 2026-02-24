// FILE: src/collections/Operations/Meetups/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { MEETUP_FORMAT, MEETUP_ACCESS } from '../sources/constants'

export const traitsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'specifications',
          relationTo: 'specifications',
          dictionary: dictionary.tabs.traits.fields,
          width: 1,
          flags: ['hasMany', 'advanced'],
        }),
      ],
    }
  ),
  {
    type: 'row',
    fields: [
      selectFieldFactory({
        name: 'format',
        options: MEETUP_FORMAT,
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: [],
      }),
      selectFieldFactory({
        name: 'access',
        options: MEETUP_ACCESS,
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: [],
      }),
    ],
  },
]
