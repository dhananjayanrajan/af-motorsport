// FILE: src/collections/Entities/Drivers/tabs/basics.ts
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
              name: 'number',
              dictionary: dictionary.tabs.basics.fields.identifier.fields,
              width: 2,
              flags: ['unique', 'index', 'advanced'],
            }),
            textFieldFactory({
              name: 'nickname',
              dictionary: dictionary.tabs.basics.fields.identifier.fields,
              width: 2,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'competition',
              dictionary: dictionary.tabs.basics.fields.identifier.fields,
              width: 2,
              flags: ['unique', 'index', 'advanced'],
            }),
            textFieldFactory({
              name: 'callsign',
              dictionary: dictionary.tabs.basics.fields.identifier.fields,
              width: 2,
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
