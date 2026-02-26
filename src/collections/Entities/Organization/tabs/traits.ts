// FILE: src/collections/Entities/Organizations/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { groupFactory } from '@/fields/factories/blueprint'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import {
  ORG_PRESTIGE,
  ORG_RELIABILITY,
  ORG_INNOVATION,
} from '../sources/constants'

export const traitsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.reputation,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'prestige',
              options: ORG_PRESTIGE,
              dictionary: dictionary.tabs.traits.fields.reputation.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'reliability',
              options: ORG_RELIABILITY,
              dictionary: dictionary.tabs.traits.fields.reputation.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'innovation',
              options: ORG_INNOVATION,
              dictionary: dictionary.tabs.traits.fields.reputation.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.communication,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'channels',
              relationTo: 'channels',
              dictionary: dictionary.tabs.traits.fields.communication.fields,
              width: 1,
              flags: ['hasMany', 'advanced'],
            }),
          ],
        }
      ]
    )
  ),
]
