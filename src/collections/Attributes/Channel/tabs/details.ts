// FILE: src/collections/Attributes/Channels/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const detailsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.details,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'parent',
              relationTo: 'categories',
              dictionary: dictionary.tabs.details.fields,
              width: 3,
              flags: [],
            }),
          ],
        },
      ],
      false
    )
  ),
]