// FILE: src/collections/Competition/Series/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { SERIES_STATUS } from '../sources/constants'
import { groupFactory } from '@/fields/factories/blueprint'

export const detailsFields: Field[] = [
  advanced(
    selectFieldFactory({
      name: 'status',
      options: SERIES_STATUS,
      dictionary: dictionary.tabs.details.fields,
      width: 2,
      flags: ['advanced'],
    })
  ),
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
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'features',
              relationTo: 'features',
              dictionary: dictionary.tabs.details.fields.attributes.fields,
              width: 2,
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
              name: 'history',
              relationTo: 'histories',
              dictionary: dictionary.tabs.details.fields.content.fields,
              width: 2,
              flags: ['advanced'],
            }),
            relationshipFieldFactory({
              name: 'narrative',
              relationTo: 'narratives',
              dictionary: dictionary.tabs.details.fields.content.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ]
        }
      ],
      false
    )
  ),
]
