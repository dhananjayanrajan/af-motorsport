// collections/attributes/locations/basics.ts
import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'

export const basicsFields: Field[] = [
  {
    type: 'row',
    fields: [
      textFieldFactory({
        name: 'title',
        dictionary: dictionary.tabs.basics.fields,
        width: 2,
        flags: ['localized'],
      }),
      textFieldFactory({
        name: 'description',
        dictionary: dictionary.tabs.basics.fields,
        width: 2,
        flags: ['localized'],
      }),
    ],
  },
]
