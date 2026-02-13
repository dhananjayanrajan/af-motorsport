// collections/team/drivers/essentials.ts
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
            name: 'firstName',
            dictionary,
            width: 2,
            flags: ['required', 'index'],
          }),
          textFieldFactory({
            name: 'lastName',
            dictionary,
            width: 2,
            flags: ['required', 'index'],
          }),
        ],
      }
    ]
  }
]
