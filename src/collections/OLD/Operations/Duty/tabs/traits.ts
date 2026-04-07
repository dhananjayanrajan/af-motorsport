// FILE: src/collections/Entities/Individuals/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'

export const traitsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.obligation,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textareaFieldFactory({
              name: 'tasks',
              dictionary: dictionary.tabs.traits.fields.obligation.fields,
              width: 1,
              flags: ['localized', 'advanced'],
            }),
            textFieldFactory({
              name: 'reporting',
              dictionary: dictionary.tabs.traits.fields.obligation.fields,
              width: 2,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'authority',
              dictionary: dictionary.tabs.traits.fields.obligation.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      true
    )
  ),
]
