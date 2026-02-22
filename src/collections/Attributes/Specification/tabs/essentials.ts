// FILE: src/collections/Attributes/Specifications/tabs/essentials.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { groupFactory } from '@/fields/factories/blueprint'
import { advanced } from '@/fields/factories/toggles/advanced'

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
    ],
  },
  advanced(
    groupFactory(
      dictionary.essential.identifier,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'code',
              dictionary: dictionary.essential.identifier.fields,
              width: 3,
              flags: ['index', 'unique'],
            }),
            textFieldFactory({
              name: 'version',
              dictionary: dictionary.essential.identifier.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'revision',
              dictionary: dictionary.essential.identifier.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
]
