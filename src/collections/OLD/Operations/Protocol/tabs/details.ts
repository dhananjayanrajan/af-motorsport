// FILE: src/collections/Operations/Protocols/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { groupFactory } from '@/fields/factories/blueprint'

export const detailsFields: Field[] = [
  advanced(
    textareaFieldFactory({
      name: 'procedure',
      dictionary: dictionary.tabs.details.fields,
      width: 1,
      flags: ['localized', 'index', 'advanced'],
    }),
  ),
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.steps,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'step',
              dictionary: dictionary.tabs.details.fields.steps.fields,
              width: 2,
              flags: ['index', 'advanced'],
            }),
            textFieldFactory({
              name: 'instruction',
              dictionary: dictionary.tabs.details.fields.steps.fields,
              width: 2,
              flags: ['index', 'advanced'],
            }),
            textFieldFactory({
              name: 'requirement',
              dictionary: dictionary.tabs.details.fields.steps.fields,
              width: 1,
              flags: ['index', 'advanced'],
            }),
          ],
        }
      ],
      true
    )
  ),
]
