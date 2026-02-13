import type { Field } from 'payload'
import { dictionary } from './dictionary'
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
            name: 'alias',
            dictionary: dictionary.essential,
            width: 2,
            flags: ['localized'],
          }),
        ],
      },
    ],
  },
]
