// FILE: src/collections/Competition/Sessions/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { SESSION_STATUS, SESSION_ACCESS } from '../sources/constants'

export const detailsFields: Field[] = [
  {
    type: 'row',
    fields: [
      selectFieldFactory({
        name: 'status',
        options: SESSION_STATUS,
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: [],
      }),
      selectFieldFactory({
        name: 'access',
        options: SESSION_ACCESS,
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: [],
      }),
    ],
  },
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.attributes,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'classifications',
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
        },
      ],
      false
    )
  ),
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.operations,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'protocols',
              relationTo: 'protocols',
              dictionary: dictionary.tabs.details.fields.operations.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'strategies',
              relationTo: 'strategies',
              dictionary: dictionary.tabs.details.fields.operations.fields,
              width: 2,
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
              width: 3,
              flags: ['advanced'],
            }),
            relationshipFieldFactory({
              name: 'history',
              relationTo: 'histories',
              dictionary: dictionary.tabs.details.fields.content.fields,
              width: 3,
              flags: ['advanced'],
            }),
            relationshipFieldFactory({
              name: 'insights',
              relationTo: 'notes',
              dictionary: dictionary.tabs.details.fields.content.fields,
              width: 3,
              flags: ['hasMany', 'advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
]
