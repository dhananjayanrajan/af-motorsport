// FILE: src/collections/Resources/Kits/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { groupFactory } from '@/fields/factories/blueprint'
import { advanced } from '@/fields/factories/toggles/advanced'
import {
  KIT_APPEARANCE_BRANDING,
  KIT_APPEARANCE_STYLE,
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
      dictionary.tabs.details.fields.appearance,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'colors',
              dictionary: dictionary.tabs.details.fields.appearance.fields,
              width: 1,
              flags: ['advanced'],
            }),
          ],
        },
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'branding',
              options: KIT_APPEARANCE_BRANDING,
              dictionary: dictionary.tabs.details.fields.appearance.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'style',
              options: KIT_APPEARANCE_STYLE,
              dictionary: dictionary.tabs.details.fields.appearance.fields,
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
