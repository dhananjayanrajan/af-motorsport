// FILE: src/collections/Entities/Individuals/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { groupFactory } from '@/fields/factories/blueprint'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'
import {
  INFLUENCE_REACH,
  INFLUENCE_AUTHORITY,
  INFLUENCE_NETWORK,
  BENEFIT_TYPE,
  BENEFIT_IMPACT,
} from '../sources/constants'

export const traitsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'channels',
          relationTo: 'channels',
          dictionary: dictionary.tabs.traits.fields,
          width: 1,
          flags: ['hasMany', 'advanced'],
        }),
      ],
    }
  ),
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.influence,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'reach',
              options: INFLUENCE_REACH,
              dictionary: dictionary.tabs.traits.fields.influence.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'authority',
              options: INFLUENCE_AUTHORITY,
              dictionary: dictionary.tabs.traits.fields.influence.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'network',
              options: INFLUENCE_NETWORK,
              dictionary: dictionary.tabs.traits.fields.influence.fields,
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
    {
      name: 'benefits',
      type: 'array',
      label: dictionary.tabs.traits.fields.benefits.label,
      admin: {
        description: dictionary.tabs.traits.fields.benefits.description,
      },
      fields: [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'benefit',
              dictionary: dictionary.tabs.traits.fields.benefits.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'type',
              options: BENEFIT_TYPE,
              dictionary: dictionary.tabs.traits.fields.benefits.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'impact',
              options: BENEFIT_IMPACT,
              dictionary: dictionary.tabs.traits.fields.benefits.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ],
        },
      ],
    }
  ),
]
