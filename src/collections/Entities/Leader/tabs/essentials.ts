// FILE: src/collections/Entities/Leaders/tabs/essentials.ts
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
        flags: ['required', 'index'],
      }),
      textFieldFactory({
        name: 'middle',
        dictionary: dictionary.essential.names.fields,
        width: 3,
        flags: ['index'],
      }),
      textFieldFactory({
        name: 'last',
        dictionary: dictionary.essential.names.fields,
        width: 3,
        flags: ['required', 'index'],
      }),
      textFieldFactory({
        name: 'alias',
        dictionary: dictionary.essential,
        width: 2,
        flags: ['advanced'],
      }),
      relationshipFieldFactory({
        name: 'type',
        relationTo: 'categories',
        dictionary: dictionary.essential,
        width: 2,
        flags: ['hasMany'],
      }),
    ],
  },
]
