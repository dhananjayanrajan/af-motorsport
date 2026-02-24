// FILE: src/collections/Entities/Leaders/tabs/basics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { LEADER_GENDER } from '../sources/constants'

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
              name: 'designation',
              dictionary: dictionary.tabs.basics.fields.identifier.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'title',
              dictionary: dictionary.tabs.basics.fields.identifier.fields,
              width: 3,
              flags: ['localized'],
            }),
            textFieldFactory({
              name: 'code',
              dictionary: dictionary.tabs.basics.fields.identifier.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
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
      dictionary.tabs.basics.fields.identity,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'gender',
              options: LEADER_GENDER,
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
