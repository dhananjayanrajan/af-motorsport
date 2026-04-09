// FILE: src/collections/Competition/Results/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { RESULT_STATUS } from '../sources/constants'
import { advanced } from '@/fields/factories/toggles/advanced'
import { groupFactory } from '@/fields/factories/blueprint'

export const detailsFields: Field[] = [
  advanced(
    selectFieldFactory({
      name: 'status',
      options: RESULT_STATUS,
      dictionary: dictionary.tabs.basics.fields,
      width: 1,
      flags: ['advanced'],
    }),
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
              name: 'notes',
              relationTo: 'notes',
              dictionary: dictionary.tabs.details.fields.content.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
          ],
        },
      ],
      false
    )
  )
]
