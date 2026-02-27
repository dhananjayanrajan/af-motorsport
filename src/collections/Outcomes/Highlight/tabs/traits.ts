// FILE: src/collections/Outcomes/Highlights/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { groupFactory } from '@/fields/factories/blueprint'

export const traitsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.attributes,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'specifications',
              relationTo: 'specifications',
              dictionary: dictionary.tabs.traits.fields.attributes.fields,
              width: 1,
              flags: ['hasMany', 'advanced'],
            })
          ],
        },
      ],
      false
    )
  )
]
