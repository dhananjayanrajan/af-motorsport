import type { Field } from 'payload'
import { dictionary } from './dictionary'
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
            width: 3,
            flags: ['required', 'localized', 'index'],
          }),
          relationshipFieldFactory({
            name: 'series',
            relationTo: 'series',
            dictionary: dictionary.essential,
            width: 3,
            flags: ['required'],
          }),
          relationshipFieldFactory({
            name: 'type',
            relationTo: 'categories',
            dictionary: dictionary.essential,
            width: 3,
            flags: ['required'],
          }),
        ],
      },
    ],
  },
]
