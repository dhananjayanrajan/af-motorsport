import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { EXPECTATION_DIRECTION, EXPECTATION_PRIORITY, EXPECTATION_FLEXIBILITY } from './constants'

export const traitsFields: Field[] = [
  {
    type: 'row',
    fields: [
      selectFieldFactory({
        name: 'direction',
        options: EXPECTATION_DIRECTION,
        dictionary: dictionary.tabs.traits.fields,
        width: 3,
        flags: [],
      }),
      selectFieldFactory({
        name: 'priority',
        options: EXPECTATION_PRIORITY,
        dictionary: dictionary.tabs.traits.fields,
        width: 3,
        flags: [],
      }),
      selectFieldFactory({
        name: 'flexibility',
        options: EXPECTATION_FLEXIBILITY,
        dictionary: dictionary.tabs.traits.fields,
        width: 3,
        flags: [],
      }),
    ],
  },
]
