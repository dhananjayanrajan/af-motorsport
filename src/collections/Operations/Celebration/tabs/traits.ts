// FILE: src/collections/Operations/Celebrations/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { advanced } from '@/fields/factories/toggles/advanced'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { groupFactory } from '@/fields/factories/blueprint'

export const traitsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.outcomes,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'expectations',
              relationTo: 'expectations',
              dictionary: dictionary.tabs.traits.fields.outcomes.fields,
              width: 2,
              flags: ['hasMany'],
            }),
            relationshipFieldFactory({
              name: 'stories',
              relationTo: 'stories',
              dictionary: dictionary.tabs.traits.fields.outcomes.fields,
              width: 2,
              flags: ['hasMany'],
            }),
          ],
        }
      ],
      false
    )
  ),
]
