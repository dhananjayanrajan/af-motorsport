// FILE: src/collections/Entities/Leaders/tabs/basics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'

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
              name: 'designation',
              dictionary: dictionary.tabs.basics.fields.identifier.fields,
              width: 3,
              flags: ['index', 'advanced'],
            }),
            textFieldFactory({
              name: 'title',
              dictionary: dictionary.tabs.basics.fields.identifier.fields,
              width: 3,
              flags: ['index', 'advanced'],
            }),
            textFieldFactory({
              name: 'code',
              dictionary: dictionary.tabs.basics.fields.identifier.fields,
              width: 3,
              flags: ['unique', 'index', 'advanced'],
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
        textFieldFactory({
          name: 'tagline',
          dictionary: dictionary.tabs.basics.fields,
          width: 1,
          flags: ['localized', 'index'],
        }),
        textareaFieldFactory({
          name: 'description',
          dictionary: dictionary.tabs.basics.fields,
          width: 1,
          flags: ['localized', 'index', 'advanced'],
        }),
      ],
    }
  ),
]
