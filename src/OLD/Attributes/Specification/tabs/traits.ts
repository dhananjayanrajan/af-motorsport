// FILE: src/collections/Attributes/Features/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { SPEC_COMPLIANCE } from '../sources/constants'

export const traitsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.conditions,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'environment',
              dictionary: dictionary.tabs.traits.fields.conditions.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'constraints',
              dictionary: dictionary.tabs.traits.fields.conditions.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'compliance',
              options: SPEC_COMPLIANCE,
              dictionary: dictionary.tabs.traits.fields.conditions.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      true
    )
  ),
]
