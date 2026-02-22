// FILE: src/collections/Attributes/Locations/tabs/essentials.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

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
          relationshipFieldFactory({
            name: 'type',
            relationTo: 'categories',
            dictionary: dictionary.essential,
            width: 2,
            flags: ['required'],
          }),
        ],
      },
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'label',
            dictionary: dictionary.essential,
            width: 1,
            flags: ['localized'],
          }),
        ],
      },
    ],
  },
]
