// FILE: src/collections/Competition/Entries/tabs/basics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'

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
              name: 'number',
              dictionary: dictionary.tabs.basics.fields.identifiers.fields,
              width: 2,
              flags: ['index', 'advanced'],
            }),
            textFieldFactory({
              name: 'plate',
              dictionary: dictionary.tabs.basics.fields.identifiers.fields,
              width: 2,
              flags: ['index', 'advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
  advanced(
    textareaFieldFactory({
      name: 'description',
      dictionary: dictionary.tabs.basics.fields,
      width: 1,
      flags: ['localized', 'index', 'advanced'],
    }),
  )
]
