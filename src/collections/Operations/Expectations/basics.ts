import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'

export const basicsFields: Field[] = [
  {
    type: 'row',
    fields: [
      textareaFieldFactory({
        name: 'statement',
        dictionary: dictionary.tabs.basics.fields,
        width: 1,
        flags: ['required', 'localized'],
      }),
    ],
  },
]
