// FILE: src/collections/Competition/Results/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'
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
              name: 'highlights',
              relationTo: 'highlights',
              dictionary: dictionary.tabs.traits.fields.outcomes.fields,
              width: 1,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'incidents',
              relationTo: 'incidents',
              dictionary: dictionary.tabs.traits.fields.outcomes.fields,
              width: 1,
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
      dictionary.tabs.traits.fields.achievements,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'gap',
              dictionary: dictionary.tabs.traits.fields.achievements.fields,
              width: 3,
              flags: ['localized', 'index', 'advanced'],
            }),
            textFieldFactory({
              name: 'interval',
              dictionary: dictionary.tabs.traits.fields.achievements.fields,
              width: 3,
              flags: ['localized', 'index', 'advanced'],
            }),
            textFieldFactory({
              name: 'status',
              dictionary: dictionary.tabs.traits.fields.achievements.fields,
              width: 3,
              flags: ['localized', 'index', 'advanced'],
            }),
          ],
        },
      ],
      false
    )
  )
]
