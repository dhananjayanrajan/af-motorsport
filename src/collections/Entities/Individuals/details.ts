import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { INTEREST_LEVEL } from './constants'

export const detailsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'narrative',
        relationTo: 'narratives',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: [],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      textareaFieldFactory({
        name: 'background',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['localized'],
      }),
    ],
  },
  {
    name: 'interests',
    type: 'array',
    label: dictionary.tabs.details.fields.interests.label,
    admin: {
      description: dictionary.tabs.details.fields.interests.description,
    },
    fields: [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'interest',
            dictionary: dictionary.tabs.details.fields.interests.fields,
            width: 3,
            flags: ['required'],
          }),
          selectFieldFactory({
            name: 'level',
            options: INTEREST_LEVEL,
            dictionary: dictionary.tabs.details.fields.interests.fields,
            width: 3,
            flags: [],
          }),
          textFieldFactory({
            name: 'duration',
            dictionary: dictionary.tabs.details.fields.interests.fields,
            width: 3,
            flags: [],
          }),
        ],
      },
    ],
  },
]
