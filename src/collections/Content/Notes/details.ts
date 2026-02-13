import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'

export const detailsFields: Field[] = [
  {
    type: 'row',
    fields: [
      textFieldFactory({
        name: 'description',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['localized'],
      }),
    ],
  },
]
