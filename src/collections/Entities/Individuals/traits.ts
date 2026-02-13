import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { groupFactory } from '@/fields/factories/blueprint'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import {
  INFLUENCE_REACH,
  INFLUENCE_AUTHORITY,
  INFLUENCE_NETWORK,
  BENEFIT_TYPE,
  BENEFIT_IMPACT,
} from './constants'

export const traitsFields: Field[] = [
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
  },
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
  ),
  {
    name: 'benefits',
    type: 'array',
    label: dictionary.tabs.traits.fields.benefits.label,
    admin: {
      description: dictionary.tabs.traits.fields.benefits.description,
      condition: (data: any) => data?.toggle === 'advanced',
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
  },
]
