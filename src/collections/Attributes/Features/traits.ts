// collections/attributes/features/traits.ts
import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { NATURE_COMPLEXITY, NATURE_VISIBILITY, NATURE_IMPACT } from './constants'

export const traitsFields: Field[] = [
  groupFactory(
    dictionary.tabs.traits.nature,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          selectFieldFactory({
            name: 'complexity',
            options: NATURE_COMPLEXITY,
            dictionary: dictionary.tabs.traits.nature.fields,
            width: 3,
            flags: ['advanced'],
          }),
          selectFieldFactory({
            name: 'visibility',
            options: NATURE_VISIBILITY,
            dictionary: dictionary.tabs.traits.nature.fields,
            width: 3,
            flags: ['advanced'],
          }),
          selectFieldFactory({
            name: 'impact',
            options: NATURE_IMPACT,
            dictionary: dictionary.tabs.traits.nature.fields,
            width: 3,
            flags: ['advanced'],
          }),
        ],
      },
    ],
    true
  ),
]
