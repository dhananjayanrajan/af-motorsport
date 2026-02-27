// FILE: src/collections/Competition/Points/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { POINT_SCALE } from '../sources/constants'

export const traitsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        numberFieldFactory({
          name: 'value',
          dictionary: dictionary.tabs.basics.fields,
          width: 2,
          flags: ['index', 'advanced'],
        }),
        selectFieldFactory({
          name: 'scale',
          options: POINT_SCALE,
          dictionary: dictionary.tabs.basics.fields,
          width: 2,
          flags: ['advanced'],
        }),
      ]
    }
  ),
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.ranking,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            numberFieldFactory({
              name: 'before',
              dictionary: dictionary.tabs.traits.fields.ranking.fields,
              width: 3,
              flags: ['index', 'advanced'],
            }),
            numberFieldFactory({
              name: 'after',
              dictionary: dictionary.tabs.traits.fields.ranking.fields,
              width: 3,
              flags: ['index', 'advanced'],
            }),
            numberFieldFactory({
              name: 'delta',
              dictionary: dictionary.tabs.traits.fields.ranking.fields,
              width: 3,
              flags: ['index', 'advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.modifiers,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'condition',
              dictionary: dictionary.tabs.traits.fields.modifiers.fields,
              width: 3,
              flags: ['index', 'advanced'],
            }),
            numberFieldFactory({
              name: 'adjustment',
              dictionary: dictionary.tabs.traits.fields.modifiers.fields,
              width: 3,
              flags: ['index', 'advanced'],
            }),
            textFieldFactory({
              name: 'impact',
              dictionary: dictionary.tabs.traits.fields.modifiers.fields,
              width: 3,
              flags: ['index', 'advanced'],
            }),
          ],
        },
      ],
      true
    )
  ),
]
