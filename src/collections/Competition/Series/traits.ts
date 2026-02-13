import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const traitsFields: Field[] = [
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
        flags: ['required'],
      }),
    ],
  },
]
