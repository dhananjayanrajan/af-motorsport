// collections/attributes/preferences/traits.ts
import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { PREFERENCE_IMPORTANCE } from './constants'

export const traitsFields: Field[] = [
  {
    name: 'conditions',
    type: 'array',
    label: dictionary.tabs.traits.fields.conditions.label,
    admin: {
      description: dictionary.tabs.traits.fields.conditions.description,
      condition: (data: any) => data?.toggle === 'advanced', // Advanced array
    },
    fields: [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'trigger',
            dictionary: dictionary.tabs.traits.fields.conditions.fields,
            width: 2,
            flags: ['advanced'],
          }),
          textFieldFactory({
            name: 'prerequisite',
            dictionary: dictionary.tabs.traits.fields.conditions.fields,
            width: 2,
            flags: ['advanced'],
          }),
        ],
      },
    ],
  },
  {
    name: 'reasons',
    type: 'array',
    label: dictionary.tabs.traits.fields.reasons.label,
    admin: {
      description: dictionary.tabs.traits.fields.reasons.description,
      condition: (data: any) => data?.toggle === 'advanced', // Advanced array
    },
    fields: [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'reason',
            dictionary: dictionary.tabs.traits.fields.reasons.fields,
            width: 2,
            flags: ['advanced'],
          }),
          selectFieldFactory({
            name: 'importance',
            options: PREFERENCE_IMPORTANCE,
            dictionary: dictionary.tabs.traits.fields.reasons.fields,
            width: 2,
            flags: ['advanced'],
          }),
        ],
      },
    ],
  },
]
