import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { IMPACT_VELOCITY, IMPACT_GRAVITY, IMPACT_PERMANENCE } from './constants'

export const traitsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'tone',
        relationTo: 'tones',
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: [],
      }),
      selectFieldFactory({
        name: 'velocity',
        options: IMPACT_VELOCITY,
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: [],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      selectFieldFactory({
        name: 'gravity',
        options: IMPACT_GRAVITY,
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: [],
      }),
      selectFieldFactory({
        name: 'permanence',
        options: IMPACT_PERMANENCE,
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: [],
      }),
    ],
  },
]
