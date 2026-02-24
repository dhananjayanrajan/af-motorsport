// FILE: src/collections/Entities/Organizations/tabs/essentials.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const essentialFields: Field[] = [
  {
    type: 'row',
    fields: [
      textFieldFactory({
        name: 'name',
        dictionary: dictionary.essential,
        width: 2,
        flags: ['localized', 'index'],
      }),
      textFieldFactory({
        name: 'alias',
        dictionary: dictionary.essential,
        width: 2,
        flags: ['localized'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'type',
        relationTo: 'categories',
        dictionary: dictionary.essential,
        width: 1,
        flags: [],
      }),
    ],
  },
]
