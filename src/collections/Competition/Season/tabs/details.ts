// FILE: src/collections/Competition/Seasons/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { groupFactory } from '@/fields/factories/blueprint'

export const detailsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.attributes,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'classification',
              relationTo: 'classifications',
              dictionary: dictionary.tabs.details.fields.attributes.fields,
              width: 3,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'regulations',
              relationTo: 'protocols',
              dictionary: dictionary.tabs.details.fields.attributes.fields,
              width: 3,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'schedules',
              relationTo: 'schedules',
              dictionary: dictionary.tabs.details.fields.attributes.fields,
              width: 3,
              flags: ['hasMany', 'advanced'],
            }),
          ],
        }
      ]
    )
  ),
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.content,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'narrative',
              relationTo: 'narratives',
              dictionary: dictionary.tabs.details.fields.content.fields,
              width: 2,
              flags: ['advanced'],
            }),
            relationshipFieldFactory({
              name: 'history',
              relationTo: 'histories',
              dictionary: dictionary.tabs.details.fields.content.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        }
      ],
      false
    )
  )
]
