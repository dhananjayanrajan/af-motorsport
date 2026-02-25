// FILE: src/collections/Attributes/Locations/tabs/basics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const basicsFields: Field[] = [
  {
    type: 'row',
    fields: [
      textFieldFactory({
        name: 'label',
        dictionary: dictionary.essential,
        width: 1,
        flags: ['localized', 'index'],
      }),
      textFieldFactory({
        name: 'title',
        dictionary: dictionary.tabs.basics.fields,
        width: 2,
        flags: ['localized', 'index'],
      }),
    ],
  },
  advanced(
    textareaFieldFactory({
      name: 'description',
      dictionary: dictionary.tabs.basics.fields,
      width: 1,
      flags: ['localized', 'index'],
    }),
  )
]
