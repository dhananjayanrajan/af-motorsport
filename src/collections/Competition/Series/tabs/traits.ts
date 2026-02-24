// FILE: src/collections/Competition/Series/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const traitsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.heritage,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'predecessor',
              relationTo: 'series',
              dictionary: dictionary.tabs.traits.fields.heritage.fields,
              width: 2,
              flags: ['advanced'],
            }),
            relationshipFieldFactory({
              name: 'successor',
              relationTo: 'series',
              dictionary: dictionary.tabs.traits.fields.heritage.fields,
              width: 2,
              flags: [],
            }),
          ],
        },
      ],
      false
    )
  ),
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'specifications',
        relationTo: 'specifications',
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: ['hasMany', 'advanced'],
      }),
      relationshipFieldFactory({
        name: 'schedule',
        relationTo: 'schedules',
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: [],
      }),
    ],
  },
]
