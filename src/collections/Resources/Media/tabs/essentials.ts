// FILE: src/collections/Resources/Media/tabs/essentials.ts
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
            width: 2,
            flags: ['required', 'localized', 'index'],
          }),
          textFieldFactory({
            name: 'alt',
            dictionary: dictionary.essential,
            width: 2,
            flags: ['required', 'localized'],
          }),
        ],
      },
    ],
  },
]
