// FILE: src/collections/Competition/Sessions/tabs/contexts.ts
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
              name: 'authorities',
              relationTo: ['organizations', 'leaders'],
              dictionary: dictionary.tabs.contexts.fields.connections.fields,
              width: 3,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'participants',
              relationTo: 'drivers',
              dictionary: dictionary.tabs.contexts.fields.connections.fields,
              width: 3,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'crews',
              relationTo: 'members',
              dictionary: dictionary.tabs.contexts.fields.connections.fields,
              width: 3,
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
              name: 'entities',
              relationTo: ['organizations', 'individuals'],
              dictionary: dictionary.tabs.contexts.fields.associations.fields,
              width: 1,
              flags: ['hasMany', 'advanced'],
            }),
          ],
        },
      ],
      false
    )
  )
]
