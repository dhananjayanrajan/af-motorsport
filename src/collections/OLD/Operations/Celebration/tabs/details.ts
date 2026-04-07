// FILE: src/collections/Operations/Celebrations/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'

import { CELEBRATION_PRESTIGE, CELEBRATION_EXCLUSIVITY } from '../sources/constants'

export const detailsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        selectFieldFactory({
          name: 'prestige',
          options: CELEBRATION_PRESTIGE,
          dictionary: dictionary.tabs.details.fields,
          width: 2,
          flags: ['advanced'],
        }),
        selectFieldFactory({
          name: 'exclusivity',
          options: CELEBRATION_EXCLUSIVITY,
          dictionary: dictionary.tabs.details.fields,
          width: 2,
          flags: ['advanced'],
        }),
        relationshipFieldFactory({
          name: 'narrative',
          relationTo: 'narratives',
          dictionary: dictionary.tabs.details.fields,
          width: 1,
          flags: ['advanced'],
        })
      ],
    }
  ),
]
