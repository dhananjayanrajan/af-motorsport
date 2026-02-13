import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { STRATEGY_CONTINGENCY_PROBABILITY, STRATEGY_CONTINGENCY_IMPACT } from './constants'

export const traitsFields: Field[] = [
  {
    name: 'directives',
    type: 'array',
    label: dictionary.tabs.traits.fields.directives.label,
    admin: {
      description: dictionary.tabs.traits.fields.directives.description,
    },
    fields: [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'phase',
            dictionary: dictionary.tabs.traits.fields.directives.fields,
            width: 4,
            flags: [],
          }),
          textFieldFactory({
            name: 'action',
            dictionary: dictionary.tabs.traits.fields.directives.fields,
            width: 4,
            flags: [],
          }),
          textFieldFactory({
            name: 'owner',
            dictionary: dictionary.tabs.traits.fields.directives.fields,
            width: 4,
            flags: [],
          }),
          dateFieldFactory({
            name: 'deadline',
            dictionary: dictionary.tabs.traits.fields.directives.fields,
            width: 4,
            flags: [],
          }),
        ],
      },
    ],
  },
  {
    name: 'contingencies',
    type: 'array',
    label: dictionary.tabs.traits.fields.contingencies.label,
    admin: {
      description: dictionary.tabs.traits.fields.contingencies.description,
      condition: (data: any) => data?.toggle === 'advanced',
    },
    fields: [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'trigger',
            dictionary: dictionary.tabs.traits.fields.contingencies.fields,
            width: 2,
            flags: ['advanced'],
          }),
          textFieldFactory({
            name: 'response',
            dictionary: dictionary.tabs.traits.fields.contingencies.fields,
            width: 2,
            flags: ['advanced'],
          }),
        ],
      },
      {
        type: 'row',
        fields: [
          selectFieldFactory({
            name: 'probability',
            options: STRATEGY_CONTINGENCY_PROBABILITY,
            dictionary: dictionary.tabs.traits.fields.contingencies.fields,
            width: 2,
            flags: ['advanced'],
          }),
          selectFieldFactory({
            name: 'impact',
            options: STRATEGY_CONTINGENCY_IMPACT,
            dictionary: dictionary.tabs.traits.fields.contingencies.fields,
            width: 2,
            flags: ['advanced'],
          }),
        ],
      },
    ],
  },
]
