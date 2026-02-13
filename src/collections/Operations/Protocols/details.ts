import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { textFieldFactory } from '@/fields/factories/fields/textField'

export const detailsFields: Field[] = [
  {
    type: 'row',
    fields: [
      textareaFieldFactory({
        name: 'procedure',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['required', 'localized'],
      }),
    ],
  },
  {
    name: 'steps',
    type: 'array',
    label: dictionary.tabs.details.fields.steps.label,
    admin: {
      description: dictionary.tabs.details.fields.steps.description,
    },
    fields: [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'step',
            dictionary: dictionary.tabs.details.fields.steps.fields,
            width: 2,
            flags: ['required'],
          }),
          textFieldFactory({
            name: 'instruction',
            dictionary: dictionary.tabs.details.fields.steps.fields,
            width: 2,
            flags: ['required'],
          }),
          textFieldFactory({
            name: 'requirement',
            dictionary: dictionary.tabs.details.fields.steps.fields,
            width: 1,
            flags: [],
          }),
        ],
      },
    ],
  },
]
