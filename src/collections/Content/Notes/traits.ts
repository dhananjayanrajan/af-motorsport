import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { NOTE_INTENTION_TYPE, NOTE_INTENTION_IMPACT } from './constants'

export const traitsFields: Field[] = [
  {
    name: 'intentions',
    type: 'array',
    label: dictionary.tabs.traits.fields.intentions.label,
    admin: {
      description: dictionary.tabs.traits.fields.intentions.description,
    },
    fields: [
      {
        type: 'row',
        fields: [
          selectFieldFactory({
            name: 'type',
            options: NOTE_INTENTION_TYPE,
            dictionary: dictionary.tabs.traits.fields.intentions.fields,
            width: 3,
            flags: [],
          }),
          selectFieldFactory({
            name: 'impact',
            options: NOTE_INTENTION_IMPACT,
            dictionary: dictionary.tabs.traits.fields.intentions.fields,
            width: 3,
            flags: [],
          }),
          textFieldFactory({
            name: 'remark',
            dictionary: dictionary.tabs.traits.fields.intentions.fields,
            width: 3,
            flags: [],
          }),
        ],
      },
    ],
  },
]
