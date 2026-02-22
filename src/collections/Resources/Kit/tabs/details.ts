// FILE: src/collections/Resources/Kits/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { groupFactory } from '@/fields/factories/blueprint'
import { advanced } from '@/fields/factories/toggles/advanced'
import {
  KIT_FUNCTION_PERFORMANCE,
  KIT_FUNCTION_DURABILITY,
  KIT_FUNCTION_COMFORT,
} from '../sources/constants'

export const detailsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.design,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'concept',
              dictionary: dictionary.tabs.details.fields.design.fields,
              width: 2,
              flags: ['localized', 'advanced'],
            }),
            textFieldFactory({
              name: 'inspiration',
              dictionary: dictionary.tabs.details.fields.design.fields,
              width: 2,
              flags: ['localized', 'advanced'],
            }),
          ],
        },
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'designer',
              dictionary: dictionary.tabs.details.fields.design.fields,
              width: 2,
              flags: ['advanced'],
            }),
            dateFieldFactory({
              name: 'year',
              dictionary: dictionary.tabs.details.fields.design.fields,
              width: 2,
              flags: ['advanced'],
              pickerAppearance: 'monthOnly',
            }),
          ],
        },
      ],
      false
    )
  ),
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.functionality,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'performance',
              options: KIT_FUNCTION_PERFORMANCE,
              dictionary: dictionary.tabs.details.fields.functionality.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'durability',
              options: KIT_FUNCTION_DURABILITY,
              dictionary: dictionary.tabs.details.fields.functionality.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'comfort',
              options: KIT_FUNCTION_COMFORT,
              dictionary: dictionary.tabs.details.fields.functionality.fields,
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
