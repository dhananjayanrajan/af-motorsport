// FILE: src/collections/Resources/Cars/tabs/basics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { groupFactory } from '@/fields/factories/blueprint'

export const basicsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.basics.fields.identifiers,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'chassis',
              dictionary: dictionary.tabs.basics.fields.identifiers.fields,
              width: 2,
              flags: ['index', 'unique', 'advanced'],
            }),
            textFieldFactory({
              name: 'model',
              dictionary: dictionary.tabs.basics.fields.identifiers.fields,
              width: 2,
              flags: ['localized', 'advanced'],
            }),
            textFieldFactory({
              name: 'version',
              dictionary: dictionary.tabs.basics.fields.identifiers.fields,
              width: 2,
              flags: ['index', 'advanced'],
            }),
            textFieldFactory({
              name: 'code',
              dictionary: dictionary.tabs.basics.fields.identifiers.fields,
              width: 2,
              flags: ['index', 'advanced'],
            }),
          ],
        },
      ],
      false
    ),
  ),
  advanced(
    textareaFieldFactory({
      name: 'description',
      dictionary: dictionary.tabs.basics.fields,
      width: 1,
      flags: ['localized', 'advanced'],
    }),
  )
]
