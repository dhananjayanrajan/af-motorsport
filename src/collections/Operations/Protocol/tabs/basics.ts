// FILE: src/collections/Operations/Protocols/tabs/basics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { groupFactory } from '@/fields/factories/blueprint'
import { advanced } from '@/fields/factories/toggles/advanced'
import { textFieldFactory } from '@/fields/factories/fields/textField'

export const basicsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.basics.fields.identifier,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'code',
              dictionary: dictionary.tabs.basics.fields.identifier.fields,
              width: 3,
              flags: ['index', 'unique'],
            }),
            textFieldFactory({
              name: 'version',
              dictionary: dictionary.tabs.basics.fields.identifier.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'revision',
              dictionary: dictionary.tabs.basics.fields.identifier.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
  advanced(
    {
      type: 'row',
      fields: [
        textareaFieldFactory({
          name: 'objective',
          dictionary: dictionary.tabs.basics.fields,
          width: 1,
          flags: ['localized', 'index', 'advanced'],
        }),
        textareaFieldFactory({
          name: 'description',
          dictionary: dictionary.tabs.basics.fields,
          width: 1,
          flags: ['localized', 'index', 'advanced'],
        }),
      ]
    }
  )
]
