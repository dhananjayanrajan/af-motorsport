// FILE: src/collections/Outcomes/Impacts/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { IMPACT_VELOCITY, IMPACT_GRAVITY, IMPACT_PERMANENCE } from '../sources/constants'

export const traitsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'tone',
          relationTo: 'tones',
          dictionary: dictionary.tabs.traits.fields,
          width: 1,
          flags: ['advanced'],
        }),
        selectFieldFactory({
          name: 'velocity',
          options: IMPACT_VELOCITY,
          dictionary: dictionary.tabs.traits.fields,
          width: 3,
          flags: ['advanced'],
        }),
        selectFieldFactory({
          name: 'gravity',
          options: IMPACT_GRAVITY,
          dictionary: dictionary.tabs.traits.fields,
          width: 3,
          flags: ['advanced'],
        }),
        selectFieldFactory({
          name: 'permanence',
          options: IMPACT_PERMANENCE,
          dictionary: dictionary.tabs.traits.fields,
          width: 3,
          flags: ['advanced'],
        }),
      ],
    }
  ),
]
