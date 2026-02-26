// FILE: src/collections/Entities/Leaders/tabs/contexts.ts
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
              name: 'peers',
              relationTo: ['leaders', 'individuals'],
              dictionary: dictionary.tabs.contexts.fields.connections.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'crew',
              relationTo: ['drivers', 'members'],
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
    relationshipFieldFactory({
      name: 'anecdotes',
      relationTo: 'notes',
      dictionary: dictionary.tabs.contexts.fields,
      width: 1,
      flags: ['hasMany', 'advanced'],
    }),
  )
]
