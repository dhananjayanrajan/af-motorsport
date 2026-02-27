// FILE: src/collections/Operations/Careers/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { advanced } from '@/fields/factories/toggles/advanced'
import { groupFactory } from '@/fields/factories/blueprint'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

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
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'highlights',
              relationTo: 'highlights',
              dictionary: dictionary.tabs.traits.fields.outcomes.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'awards',
              relationTo: 'awards',
              dictionary: dictionary.tabs.traits.fields.outcomes.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
]
