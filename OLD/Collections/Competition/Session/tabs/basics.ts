// FILE: src/collections/Competition/Sessions/tabs/basics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'
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
              name: 'code',
              dictionary: dictionary.tabs.basics.fields.identifiers.fields,
              width: 1,
              flags: ['localized', 'index', 'unique', 'advanced'],
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
