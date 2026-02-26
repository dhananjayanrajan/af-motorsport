// FILE: src/collections/Entities/Drivers/tabs/contexts.ts
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
              name: 'teammates',
              relationTo: 'drivers',
              dictionary: dictionary.tabs.contexts.fields.connections.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'crew',
              relationTo: ['members', 'leaders'],
              dictionary: dictionary.tabs.contexts.fields.connections.fields,
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
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'kits',
              relationTo: 'kits',
              dictionary: dictionary.tabs.contexts.fields.associations.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            })
          ],
        },
      ],
      false
    )
  )
]
