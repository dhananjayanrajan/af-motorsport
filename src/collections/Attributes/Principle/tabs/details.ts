// FILE: src/collections/Attributes/Principles/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'

export const detailsFields: Field[] = [
  {
    type: 'row',
    fields: [
      textareaFieldFactory({
        name: 'application',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['localized', 'advanced'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      textareaFieldFactory({
        name: 'rationale',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['localized', 'advanced'],
      }),
    ],
  },
]
