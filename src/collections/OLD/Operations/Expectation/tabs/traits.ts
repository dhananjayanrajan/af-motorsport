// FILE: src/collections/Operations/Expectations/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import {
  EXPECTATION_DIRECTION,
  EXPECTATION_PRIORITY,
  EXPECTATION_FLEXIBILITY,
} from '../sources/constants'

export const traitsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        selectFieldFactory({
          name: 'direction',
          options: EXPECTATION_DIRECTION,
          dictionary: dictionary.tabs.traits.fields,
          width: 3,
          flags: ['advanced'],
        }),
        selectFieldFactory({
          name: 'priority',
          options: EXPECTATION_PRIORITY,
          dictionary: dictionary.tabs.traits.fields,
          width: 3,
          flags: ['advanced'],
        }),
        selectFieldFactory({
          name: 'flexibility',
          options: EXPECTATION_FLEXIBILITY,
          dictionary: dictionary.tabs.traits.fields,
          width: 3,
          flags: ['advanced'],
        }),
      ],
    }
  ),
]
