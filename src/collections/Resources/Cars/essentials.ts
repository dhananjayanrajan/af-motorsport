import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { groupFactory } from '@/fields/factories/blueprint'

export const essentialFields: Field[] = [
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
  groupFactory(
    dictionary.essential.identifiers,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'chassis',
            dictionary: dictionary.essential.identifiers.fields,
            width: 2,
            flags: ['index', 'unique'],
          }),
          textFieldFactory({
            name: 'model',
            dictionary: dictionary.essential.identifiers.fields,
            width: 2,
            flags: ['required', 'localized'],
          }),
        ],
      },
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'version',
            dictionary: dictionary.essential.identifiers.fields,
            width: 2,
            flags: [],
          }),
          textFieldFactory({
            name: 'code',
            dictionary: dictionary.essential.identifiers.fields,
            width: 2,
            flags: ['index'],
          }),
        ],
      },
    ],
    false
  ),
]
