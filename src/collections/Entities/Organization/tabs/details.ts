// FILE: src/collections/Entities/Organizations/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { groupFactory } from '@/fields/factories/blueprint'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const detailsFields: Field[] = [
  advanced(
    relationshipFieldFactory({
      name: 'headquarters',
      relationTo: 'locations',
      dictionary: dictionary.tabs.details.fields,
      width: 1,
      flags: ['hasMany', 'advanced'],
    })
  ),
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.evolution,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            dateFieldFactory({
              name: 'founded',
              dictionary: dictionary.tabs.details.fields.evolution.fields,
              width: 2,
              flags: ['advanced'],
              pickerAppearance: 'dayOnly',
            }),
            dateFieldFactory({
              name: 'merged',
              dictionary: dictionary.tabs.details.fields.evolution.fields,
              width: 2,
              flags: ['advanced'],
              pickerAppearance: 'dayOnly',
            }),
            dateFieldFactory({
              name: 'rebranded',
              dictionary: dictionary.tabs.details.fields.evolution.fields,
              width: 2,
              flags: ['advanced'],
              pickerAppearance: 'dayOnly',
            }),
            dateFieldFactory({
              name: 'defunct',
              dictionary: dictionary.tabs.details.fields.evolution.fields,
              width: 2,
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
