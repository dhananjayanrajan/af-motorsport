// FILE: src/collections/Competition/Points/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const traitsFields: Field[] = [
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
              flags: [],
            }),
            numberFieldFactory({
              name: 'after',
              dictionary: dictionary.tabs.traits.fields.ranking.fields,
              width: 3,
              flags: [],
            }),
            numberFieldFactory({
              name: 'delta',
              dictionary: dictionary.tabs.traits.fields.ranking.fields,
              width: 3,
              flags: [],
            }),
          ],
        },
      ],
      false
    )
  ),
  advanced(
    {
      name: 'modifiers',
      type: 'array',
      label: dictionary.tabs.traits.fields.modifiers.label,
      admin: {
        description: dictionary.tabs.traits.fields.modifiers.description,
      },
      fields: [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'condition',
              dictionary: dictionary.tabs.traits.fields.modifiers.fields,
              width: 3,
              flags: ['advanced'],
            }),
            numberFieldFactory({
              name: 'adjustment',
              dictionary: dictionary.tabs.traits.fields.modifiers.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'impact',
              dictionary: dictionary.tabs.traits.fields.modifiers.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ],
        },
      ],
    }
  ),
]
