// FILE: src/collections/Entities/Drivers/tabs/essentials.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
export const essentialFields: Field[] = [
  {
    type: 'row',
    fields: [
      textFieldFactory({
        name: 'first',
        dictionary: dictionary.essential.names.fields,
        width: 3,
        flags: ['localized', 'index'],
      }),
      textFieldFactory({
        name: 'middle',
        dictionary: dictionary.essential.names.fields,
        width: 3,
        flags: ['localized'],
      }),
      textFieldFactory({
        name: 'last',
        dictionary: dictionary.essential.names.fields,
        width: 3,
        flags: ['localized', 'index'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      textFieldFactory({
        name: 'alias',
        dictionary: dictionary.essential,
        width: 2,
        flags: ['localized'],
      }),
      relationshipFieldFactory({
        name: 'type',
        relationTo: 'categories',
        dictionary: dictionary.essential,
        width: 2,
        flags: [],
      }),
    ],
  },
]
