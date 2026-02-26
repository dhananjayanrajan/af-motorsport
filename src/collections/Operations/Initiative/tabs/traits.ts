// FILE: src/collections/Operations/Initiatives/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { advanced } from '@/fields/factories/toggles/advanced'
import { groupFactory } from '@/fields/factories/blueprint'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const traitsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'schedules',
          relationTo: 'schedules',
          dictionary: dictionary.tabs.traits.fields,
          width: 1,
          flags: ['hasMany', 'advanced'],
        }),
      ],
    }
  ),
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.outcomes,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'strategies',
              relationTo: 'strategies',
              dictionary: dictionary.tabs.traits.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'expectations',
              relationTo: 'expectations',
              dictionary: dictionary.tabs.traits.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
          ],
        }
      ],
      false
    )
  ),
]
