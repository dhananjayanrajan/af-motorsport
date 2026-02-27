// FILE: src/collections/Outcomes/Experiences/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { IMPACT_SCALE, IMPACT_DEPTH, IMPACT_RARITY } from '../sources/constants'

export const detailsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.scope,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'significance',
              dictionary: dictionary.tabs.details.fields.scope.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'scale',
              options: IMPACT_SCALE,
              dictionary: dictionary.tabs.details.fields.scope.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'depth',
              options: IMPACT_DEPTH,
              dictionary: dictionary.tabs.details.fields.scope.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'rarity',
              options: IMPACT_RARITY,
              dictionary: dictionary.tabs.details.fields.scope.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.content,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'notes',
              relationTo: 'notes',
              dictionary: dictionary.tabs.details.fields,
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
