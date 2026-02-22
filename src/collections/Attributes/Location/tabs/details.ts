// FILE: src/collections/Attributes/Locations/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { pointFieldFactory } from '@/fields/factories/fields/pointField'
import { groupFactory } from '@/fields/factories/blueprint'
import { advanced } from '@/fields/factories/toggles/advanced'

export const detailsFields: Field[] = [
  {
    type: 'row',
    fields: [
      textareaFieldFactory({
        name: 'address',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['localized'],
      }),
    ],
  },
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.geometry,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            pointFieldFactory({
              name: 'coordinates',
              dictionary: dictionary.tabs.details.fields.geometry.fields,
              width: 3,
              flags: [],
            }),
            textFieldFactory({
              name: 'bounds',
              dictionary: dictionary.tabs.details.fields.geometry.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'area',
              dictionary: dictionary.tabs.details.fields.geometry.fields,
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
