// FILE: src/collections/Operations/Celebrations/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { CELEBRATION_PRESTIGE, CELEBRATION_EXCLUSIVITY } from '../sources/constants'

export const traitsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        selectFieldFactory({
          name: 'prestige',
          options: CELEBRATION_PRESTIGE,
          dictionary: dictionary.tabs.traits.fields,
          width: 2,
          flags: ['advanced'],
        }),
        selectFieldFactory({
          name: 'exclusivity',
          options: CELEBRATION_EXCLUSIVITY,
          dictionary: dictionary.tabs.traits.fields,
          width: 2,
          flags: ['advanced'],
        }),
      ],
    }
  ),
]
