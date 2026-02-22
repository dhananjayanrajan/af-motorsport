// FILE: src/collections/Operations/Careers/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { CAREER_CONTRACT_TYPES } from '../sources/constants'

export const traitsFields: Field[] = [
  advanced(
    {
      name: 'positions',
      type: 'array',
      label: dictionary.tabs.traits.fields.positions.label,
      admin: {
        description: dictionary.tabs.traits.fields.positions.description,
      },
      fields: [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'title',
              dictionary: dictionary.tabs.traits.fields.positions.fields,
              width: 2,
              flags: ['required'],
            }),
            dateFieldFactory({
              name: 'start',
              dictionary: dictionary.tabs.traits.fields.positions.fields,
              width: 2,
              flags: ['required'],
              pickerAppearance: 'dayOnly',
            }),
            dateFieldFactory({
              name: 'end',
              dictionary: dictionary.tabs.traits.fields.positions.fields,
              width: 1,
              flags: [],
              pickerAppearance: 'dayOnly',
            }),
          ],
        },
      ],
    }
  ),
  {
    type: 'row',
    fields: [
      selectFieldFactory({
        name: 'contract',
        options: CAREER_CONTRACT_TYPES,
        dictionary: dictionary.tabs.traits.fields,
        width: 1,
        flags: ['advanced'],
      }),
    ],
  },
]
