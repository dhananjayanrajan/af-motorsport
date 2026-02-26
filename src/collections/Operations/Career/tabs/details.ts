// FILE: src/collections/Operations/Careers/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { groupFactory } from '@/fields/factories/blueprint'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { CAREER_CONTRACT_TYPES } from '../sources/constants'

export const detailsFields: Field[] = [
  advanced(
    selectFieldFactory({
      name: 'contract',
      options: CAREER_CONTRACT_TYPES,
      dictionary: dictionary.tabs.details.fields,
      width: 1,
      flags: ['advanced'],
    }),
  ),
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.positions,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'title',
              dictionary: dictionary.tabs.details.fields.positions.fields,
              width: 1,
              flags: ['advanced'],
            }),
            dateFieldFactory({
              name: 'start',
              dictionary: dictionary.tabs.details.fields.positions.fields,
              width: 2,
              flags: ['advanced'],
              pickerAppearance: 'dayOnly',
            }),
            dateFieldFactory({
              name: 'end',
              dictionary: dictionary.tabs.details.fields.positions.fields,
              width: 2,
              flags: ['advanced'],
              pickerAppearance: 'dayOnly',
            }),
          ],
        },
      ],
      true
    )
  ),
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'narrative',
          relationTo: 'narratives',
          dictionary: dictionary.tabs.details.fields,
          width: 1,
          flags: ['advanced'],
        }),
      ],
    }
  )
]
