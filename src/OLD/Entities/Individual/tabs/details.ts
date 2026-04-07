// FILE: src/collections/Entities/Individuals/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { INTEREST_LEVEL } from '../sources/constants'
import { groupFactory } from '@/fields/factories/blueprint'

export const detailsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.interests,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'interest',
              dictionary: dictionary.tabs.details.fields.interests.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'level',
              options: INTEREST_LEVEL,
              dictionary: dictionary.tabs.details.fields.interests.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'duration',
              dictionary: dictionary.tabs.details.fields.interests.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ]
        }
      ],
      true
    )
  ),
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.about,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textareaFieldFactory({
              name: 'background',
              dictionary: dictionary.tabs.details.fields.about.fields,
              width: 1,
              flags: ['localized', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'narrative',
              relationTo: 'narratives',
              dictionary: dictionary.tabs.details.fields.about.fields,
              width: 1,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
]
