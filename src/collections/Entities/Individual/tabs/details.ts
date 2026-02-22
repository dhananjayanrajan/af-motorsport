// FILE: src/collections/Entities/Individuals/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { INTEREST_LEVEL } from '../sources/constants'

export const detailsFields: Field[] = [
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
  ),
  advanced(
    {
      type: 'row',
      fields: [
        textareaFieldFactory({
          name: 'background',
          dictionary: dictionary.tabs.details.fields,
          width: 1,
          flags: ['localized', 'advanced'],
        }),
      ],
    }
  ),
  advanced(
    {
      name: 'interests',
      type: 'array',
      label: dictionary.tabs.details.fields.interests.label,
      admin: {
        description: dictionary.tabs.details.fields.interests.description,
      },
      fields: [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'interest',
              dictionary: dictionary.tabs.details.fields.interests.fields,
              width: 3,
              flags: ['required'],
            }),
            selectFieldFactory({
              name: 'level',
              options: INTEREST_LEVEL,
              dictionary: dictionary.tabs.details.fields.interests.fields,
              width: 3,
              flags: [],
            }),
            textFieldFactory({
              name: 'duration',
              dictionary: dictionary.tabs.details.fields.interests.fields,
              width: 3,
              flags: [],
            }),
          ],
        },
      ],
    }
  ),
]
