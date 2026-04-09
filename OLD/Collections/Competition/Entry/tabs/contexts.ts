// FILE: src/collections/Competition/Entries/tabs/contexts.ts
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
              name: 'drivers',
              relationTo: 'drivers',
              dictionary: dictionary.tabs.contexts.fields.associations.fields,
              width: 3,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'crew',
              relationTo: 'members',
              dictionary: dictionary.tabs.contexts.fields.associations.fields,
              width: 3,
              flags: ['advanced'],
            }),
            relationshipFieldFactory({
              name: 'car',
              relationTo: 'cars',
              dictionary: dictionary.tabs.contexts.fields.associations.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  )
]
