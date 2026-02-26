// FILE: src/collections/Entities/Members/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { groupFactory } from '@/fields/factories/blueprint'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'

export const detailsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.chronology,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            dateFieldFactory({
              name: 'birth',
              dictionary: dictionary.tabs.details.fields.chronology.fields,
              width: 3,
              flags: [],
              pickerAppearance: 'dayOnly',
            }),
            dateFieldFactory({
              name: 'debut',
              dictionary: dictionary.tabs.details.fields.chronology.fields,
              width: 3,
              flags: [],
              pickerAppearance: 'dayOnly',
            }),
            dateFieldFactory({
              name: 'retirement',
              dictionary: dictionary.tabs.details.fields.chronology.fields,
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
  advanced(
    relationshipFieldFactory({
      name: 'departments',
      relationTo: 'classifications',
      dictionary: dictionary.tabs.details.fields,
      width: 1,
      flags: ['hasMany', 'advanced'],
    }),
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
