// FILE: src/collections/Competition/Sessions/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const detailsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'narrative',
        relationTo: 'narratives',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: ['advanced'],
      }),
      relationshipFieldFactory({
        name: 'event',
        relationTo: 'events',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: [],
      }),
    ],
  },
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.format,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'segment',
              dictionary: dictionary.tabs.details.fields.format.fields,
              width: 2,
              flags: [],
            }),
            numberFieldFactory({
              name: 'duration',
              dictionary: dictionary.tabs.details.fields.format.fields,
              width: 2,
              flags: [],
            }),
          ],
        },
        {
          type: 'row',
          fields: [
            numberFieldFactory({
              name: 'interval',
              dictionary: dictionary.tabs.details.fields.format.fields,
              width: 2,
              flags: [],
            }),
            textFieldFactory({
              name: 'specification',
              dictionary: dictionary.tabs.details.fields.format.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'classifications',
        relationTo: 'classifications',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: ['hasMany', 'advanced'],
      }),
      relationshipFieldFactory({
        name: 'features',
        relationTo: 'features',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: ['hasMany', 'advanced'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'protocols',
        relationTo: 'protocols',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: ['hasMany', 'advanced'],
      }),
      relationshipFieldFactory({
        name: 'strategies',
        relationTo: 'strategies',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: ['hasMany', 'advanced'],
      }),
    ],
  },
]
