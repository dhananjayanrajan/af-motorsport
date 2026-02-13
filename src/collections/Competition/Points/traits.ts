import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { textFieldFactory } from '@/fields/factories/fields/textField'

export const traitsFields: Field[] = [
  groupFactory(
    dictionary.tabs.traits.fields.ranking,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          numberFieldFactory({
            name: 'before',
            dictionary: dictionary.tabs.traits.fields.ranking.fields,
            width: 3,
            flags: [],
          }),
          numberFieldFactory({
            name: 'after',
            dictionary: dictionary.tabs.traits.fields.ranking.fields,
            width: 3,
            flags: [],
          }),
          numberFieldFactory({
            name: 'delta',
            dictionary: dictionary.tabs.traits.fields.ranking.fields,
            width: 3,
            flags: [],
          }),
        ],
      },
    ],
    true
  ),
  {
    name: 'modifiers',
    type: 'array',
    label: dictionary.tabs.traits.fields.modifiers.label,
    admin: {
      description: dictionary.tabs.traits.fields.modifiers.description,
      condition: (data: any) => data?.toggle === 'advanced',
    },
    fields: [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'condition',
            dictionary: dictionary.tabs.traits.fields.modifiers.fields,
            width: 3,
            flags: ['required', 'advanced'],
          }),
          numberFieldFactory({
            name: 'adjustment',
            dictionary: dictionary.tabs.traits.fields.modifiers.fields,
            width: 3,
            flags: ['required', 'advanced'],
          }),
          textFieldFactory({
            name: 'impact',
            dictionary: dictionary.tabs.traits.fields.modifiers.fields,
            width: 3,
            flags: ['advanced'],
          }),
        ],
      },
    ],
  },
]
