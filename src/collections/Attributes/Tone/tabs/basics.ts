// FILE: src/collections/Attributes/Tones/tabs/basics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'

export const basicsFields: Field[] = [
  {
    type: 'row',
    fields: [
      textFieldFactory({
        name: 'description',
        dictionary: dictionary.tabs.basics.fields,
        width: 1,
        flags: ['localized'],
      }),
    ],
  },
]
