// FILE: src/collections/Operations/Protocols/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const detailsFields: Field[] = [
  {
    type: 'row',
    fields: [
      textareaFieldFactory({
        name: 'procedure',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['localized'],
      }),
    ],
  },
  advanced(
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
              flags: [],
            }),
            textFieldFactory({
              name: 'instruction',
              dictionary: dictionary.tabs.details.fields.steps.fields,
              width: 2,
              flags: [],
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
    }
  ),
]
