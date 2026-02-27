// FILE: src/collections/Competition/Seasons/tabs/basics.ts
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
              name: 'code',
              dictionary: dictionary.tabs.basics.fields.identifiers.fields,
              width: 2,
              flags: ['localized', 'index', 'unique', 'advanced'],
            }),
            textFieldFactory({
              name: 'abbreviation',
              dictionary: dictionary.tabs.basics.fields.identifiers.fields,
              width: 2,
              flags: ['localized', 'index', 'advanced'],
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
