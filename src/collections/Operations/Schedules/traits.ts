import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { SCHEDULE_CONSTRAINT_TYPE, SCHEDULE_CONSTRAINT_IMPACT } from './constants'

export const traitsFields: Field[] = [
  {
    name: 'constraints',
    type: 'array',
    label: dictionary.tabs.traits.fields.constraints.label,
    admin: {
      description: dictionary.tabs.traits.fields.constraints.description,
      condition: (data: any) => data?.toggle === 'advanced',
    },
    fields: [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'constraint',
            dictionary: dictionary.tabs.traits.fields.constraints.fields,
            width: 2,
            flags: ['advanced'],
          }),
          selectFieldFactory({
            name: 'type',
            options: SCHEDULE_CONSTRAINT_TYPE,
            dictionary: dictionary.tabs.traits.fields.constraints.fields,
            width: 2,
            flags: ['advanced'],
          }),
          selectFieldFactory({
            name: 'impact',
            options: SCHEDULE_CONSTRAINT_IMPACT,
            dictionary: dictionary.tabs.traits.fields.constraints.fields,
            width: 2,
            flags: ['advanced'],
          }),
        ],
      },
    ],
  },
]
