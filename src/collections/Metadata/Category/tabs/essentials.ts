// FILE: src/collections/Attributes/Categories/tabs/essentials.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'

export const essentialFields: Field[] = [
  {
    type: 'group',
    fields: [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'name',
            dictionary: dictionary.essential,
            width: 1,
            flags: ['required', 'localized', 'index'],
          }),
        ],
      }
    ],
  },
];
