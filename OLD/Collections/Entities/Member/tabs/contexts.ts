// FILE: src/collections/Entities/Members/tabs/contexts.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { groupFactory } from '@/fields/factories/blueprint'

export const contextsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.contexts.fields.connections,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'mentors',
              relationTo: ['leaders', 'members'],
              dictionary: dictionary.tabs.contexts.fields.connections.fields,
              width: 2,
              flags: ['hasMany'],
            }),
            relationshipFieldFactory({
              name: 'crew',
              relationTo: 'drivers',
              dictionary: dictionary.tabs.contexts.fields.connections.fields,
              width: 2,
              flags: ['hasMany'],
            }),
          ],
        },
      ],
      false
    )
  ),
  advanced(
    groupFactory(
      dictionary.tabs.contexts.fields.associations,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'cars',
              relationTo: 'cars',
              dictionary: dictionary.tabs.contexts.fields.associations.fields,
              width: 1,
              flags: ['hasMany'],
            }),
          ],
        },
      ],
      false
    )
  )
]
