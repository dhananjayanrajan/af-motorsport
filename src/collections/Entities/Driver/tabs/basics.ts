// FILE: src/collections/Entities/Drivers/tabs/basics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { DRIVER_GENDER } from '../sources/constants'

export const basicsFields: Field[] = [
  {
    type: 'row',
    fields: [
      textareaFieldFactory({
        name: 'description',
        dictionary: dictionary.tabs.basics.fields,
        width: 1,
        flags: ['localized'],
      }),
    ],
  },
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
              flags: ['index'],
            }),
            textFieldFactory({
              name: 'nickname',
              dictionary: dictionary.tabs.basics.fields.identifier.fields,
              width: 2,
              flags: ['localized', 'advanced'],
            }),
          ],
        },
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'competition',
              dictionary: dictionary.tabs.basics.fields.identifier.fields,
              width: 2,
              flags: ['advanced'],
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
    groupFactory(
      dictionary.tabs.basics.fields.identity,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'gender',
              options: DRIVER_GENDER,
              dictionary: dictionary.tabs.basics.fields.identity.fields,
              width: 2,
              flags: [],
            }),
            textFieldFactory({
              name: 'pronouns',
              dictionary: dictionary.tabs.basics.fields.identity.fields,
              width: 2,
              flags: [],
            }),
          ],
        },
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'age',
              dictionary: dictionary.tabs.basics.fields.identity.fields,
              width: 2,
              flags: [],
            }),
            textFieldFactory({
              name: 'nationality',
              dictionary: dictionary.tabs.basics.fields.identity.fields,
              width: 2,
              flags: ['index'],
            }),
          ],
        },
      ],
      false
    )
  ),
  advanced(
    groupFactory(
      dictionary.tabs.basics.fields.chronology,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            dateFieldFactory({
              name: 'birth',
              dictionary: dictionary.tabs.basics.fields.chronology.fields,
              width: 3,
              flags: [],
              pickerAppearance: 'dayOnly',
            }),
            dateFieldFactory({
              name: 'debut',
              dictionary: dictionary.tabs.basics.fields.chronology.fields,
              width: 3,
              flags: [],
              pickerAppearance: 'dayOnly',
            }),
            dateFieldFactory({
              name: 'retirement',
              dictionary: dictionary.tabs.basics.fields.chronology.fields,
              width: 3,
              flags: ['advanced'],
              pickerAppearance: 'dayOnly',
            }),
          ],
        },
      ],
      false
    )
  ),
]
