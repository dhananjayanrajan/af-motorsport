// FILE: src/collections/Attributes/Specifications/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { groupFactory } from '@/fields/factories/blueprint'
import { advanced } from '@/fields/factories/toggles/advanced'
import { SPEC_COMPLIANCE } from '../sources/constants'

export const detailsFields: Field[] = [
  advanced(
    textareaFieldFactory({
      name: 'definition',
      dictionary: dictionary.tabs.details.fields,
      width: 1,
      flags: ['localized', 'advanced'],
    }),
  ),
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.conditions,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'environment',
              dictionary: dictionary.tabs.details.fields.conditions.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'constraints',
              dictionary: dictionary.tabs.details.fields.conditions.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'compliance',
              options: SPEC_COMPLIANCE,
              dictionary: dictionary.tabs.details.fields.conditions.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
]
