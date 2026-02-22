// FILE: src/collections/Operations/Expectations/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'

export const detailsFields: Field[] = [
  {
    type: 'row',
    fields: [
      textareaFieldFactory({
        name: 'criteria',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['localized', 'advanced'],
      }),
    ],
  },
]
