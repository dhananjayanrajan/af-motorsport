import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { groupFactory } from '@/fields/factories/blueprint'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import {
  ORG_PRESTIGE,
  ORG_RELIABILITY,
  ORG_INNOVATION,
  ORG_BENEFIT_TYPE,
  ORG_BENEFIT_IMPACT,
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
            options: ORG_BENEFIT_TYPE,
            dictionary: dictionary.tabs.traits.fields.benefits.fields,
            width: 3,
            flags: ['advanced'],
          }),
          selectFieldFactory({
            name: 'impact',
            options: ORG_BENEFIT_IMPACT,
            dictionary: dictionary.tabs.traits.fields.benefits.fields,
            width: 3,
            flags: ['advanced'],
          }),
        ],
      },
    ],
  },
]
