// FILE: src/collections/Operations/Duties/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { groupFactory } from '@/fields/factories/blueprint'
import { advanced } from '@/fields/factories/toggles/advanced'

export const detailsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.obligation,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textareaFieldFactory({
              name: 'tasks',
              dictionary: dictionary.tabs.details.fields.obligation.fields,
              width: 1,
              flags: ['required', 'localized'],
            }),
          ],
        },
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'reporting',
              dictionary: dictionary.tabs.details.fields.obligation.fields,
              width: 2,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'authority',
              dictionary: dictionary.tabs.details.fields.obligation.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
]
