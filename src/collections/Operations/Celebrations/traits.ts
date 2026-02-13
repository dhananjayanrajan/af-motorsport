import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { CELEBRATION_PRESTIGE, CELEBRATION_EXCLUSIVITY } from './constants'

export const traitsFields: Field[] = [
  {
    type: 'row',
    fields: [
      selectFieldFactory({
        name: 'prestige',
        options: CELEBRATION_PRESTIGE,
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: [],
      }),
      selectFieldFactory({
        name: 'exclusivity',
        options: CELEBRATION_EXCLUSIVITY,
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: [],
      }),
    ],
  },
]
