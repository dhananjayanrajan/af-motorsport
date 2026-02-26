// FILE: src/collections/Entities/Leaders/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { groupFactory } from '@/fields/factories/blueprint'

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
              flags: ['advanced'],
              pickerAppearance: 'dayOnly',
            }),
            dateFieldFactory({
              name: 'debut',
              dictionary: dictionary.tabs.details.fields.chronology.fields,
              width: 3,
              flags: ['advanced'],
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
      dictionary.tabs.details.fields.vision,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'principles',
              relationTo: 'principles',
              dictionary: dictionary.tabs.details.fields.vision.fields,
              width: 1,
              flags: ['hasMany', 'advanced'],
            }),
          ],
        },
      ],
      false
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
            relationshipFieldFactory({
              name: 'narrative',
              relationTo: 'narratives',
              dictionary: dictionary.tabs.details.fields.about.fields,
              width: 2,
              flags: ['advanced'],
            }),
            relationshipFieldFactory({
              name: 'biography',
              relationTo: 'histories',
              dictionary: dictionary.tabs.details.fields.about.fields,
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
