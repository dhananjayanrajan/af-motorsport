// FILE: src/collections/Attributes/Classifications/tabs/contexts.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { groupFactory } from '@/fields/factories/blueprint'

export const contextsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.contexts.fields.content,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'notes',
              relationTo: 'notes',
              dictionary: dictionary.tabs.contexts.fields.content.fields,
              width: 1,
              flags: ['hasMany', 'advanced'],
            }),
          ]
        }
      ]
    )
  )
]
