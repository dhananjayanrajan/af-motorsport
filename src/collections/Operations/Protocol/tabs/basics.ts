// FILE: src/collections/Operations/Protocols/tabs/basics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'

export const basicsFields: Field[] = [
  {
    type: 'row',
    fields: [
      textareaFieldFactory({
        name: 'description',
        dictionary: dictionary.tabs.basics.fields,
        width: 1,
        flags: ['localized'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      textareaFieldFactory({
        name: 'objective',
        dictionary: dictionary.tabs.basics.fields,
        width: 1,
        flags: ['required', 'localized'],
      }),
    ],
  },
]
