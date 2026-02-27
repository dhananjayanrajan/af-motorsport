// FILE: src/collections/Competition/Entries/tabs/essentials.ts
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
            width: 3,
            flags: ['required', 'localized', 'index'],
          }),
          relationshipFieldFactory({
            name: 'session',
            relationTo: 'sessions',
            dictionary: dictionary.essential,
            width: 3,
            flags: ['required'],
          }),
          relationshipFieldFactory({
            name: 'type',
            relationTo: 'categories',
            dictionary: dictionary.essential,
            width: 3,
            flags: ['hasMany'],
          }),
        ],
      },
    ],
  },
]
