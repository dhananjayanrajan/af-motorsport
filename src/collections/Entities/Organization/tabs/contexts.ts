// FILE: src/collections/Entities/Organizations/tabs/contexts.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { groupFactory } from '@/fields/factories/blueprint'
import { advanced } from '@/fields/factories/toggles/advanced'

export const contextsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.contexts.fields.associations,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'branch',
              relationTo: 'locations',
              dictionary: dictionary.tabs.contexts.fields,
              width: 2,
              flags: ['advanced'],
            }),
            relationshipFieldFactory({
              name: 'parent',
              relationTo: 'organizations',
              dictionary: dictionary.tabs.contexts.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      true
    )
  ),
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'history',
          relationTo: 'histories',
          dictionary: dictionary.tabs.contexts.fields,
          width: 2,
          flags: ['advanced'],
        }),
        relationshipFieldFactory({
          name: 'notes',
          relationTo: 'notes',
          dictionary: dictionary.tabs.contexts.fields,
          width: 2,
          flags: ['hasMany', 'advanced'],
        }),
      ],
    }
  )
]
