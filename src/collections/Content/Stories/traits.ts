import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { STORY_INTERACTION_DYNAMICS } from './constants'

export const traitsFields: Field[] = [
  {
    name: 'concerns',
    type: 'array',
    label: dictionary.tabs.traits.fields.concerns.label,
    admin: {
      description: dictionary.tabs.traits.fields.concerns.description,
    },
    fields: [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'conflict',
            dictionary: dictionary.tabs.traits.fields.concerns.fields,
            width: 3,
            flags: [],
          }),
          textFieldFactory({
            name: 'stakes',
            dictionary: dictionary.tabs.traits.fields.concerns.fields,
            width: 3,
            flags: [],
          }),
          textFieldFactory({
            name: 'resolution',
            dictionary: dictionary.tabs.traits.fields.concerns.fields,
            width: 3,
            flags: [],
          }),
        ],
      },
    ],
  },
  {
    name: 'interactions',
    type: 'array',
    label: dictionary.tabs.traits.fields.interactions.label,
    admin: {
      description: dictionary.tabs.traits.fields.interactions.description,
    },
    fields: [
      {
        type: 'row',
        fields: [
          selectFieldFactory({
            name: 'dynamics',
            options: STORY_INTERACTION_DYNAMICS,
            dictionary: dictionary.tabs.traits.fields.interactions.fields,
            width: 2,
            flags: [],
          }),
          textFieldFactory({
            name: 'outcome',
            dictionary: dictionary.tabs.traits.fields.interactions.fields,
            width: 2,
            flags: [],
          }),
        ],
      },
    ],
  },
]
