import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { CAREER_CONTRACT_TYPES } from './constants'

export const traitsFields: Field[] = [
  {
    name: 'positions',
    type: 'array',
    label: dictionary.tabs.traits.fields.positions.label,
    admin: {
      description: dictionary.tabs.traits.fields.positions.description,
    },
    fields: [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'title',
            dictionary: dictionary.tabs.traits.fields.positions.fields,
            width: 2,
            flags: ['required'],
          }),
          dateFieldFactory({
            name: 'start',
            dictionary: dictionary.tabs.traits.fields.positions.fields,
            width: 2,
            flags: ['required'],
          }),
          dateFieldFactory({
            name: 'end',
            dictionary: dictionary.tabs.traits.fields.positions.fields,
            width: 1,
            flags: [],
          }),
        ],
      },
    ],
  },
  {
    type: 'row',
    fields: [
      selectFieldFactory({
        name: 'contract',
        options: CAREER_CONTRACT_TYPES,
        dictionary: dictionary.tabs.traits.fields,
        width: 1,
        flags: [],
      }),
    ],
  },
]
