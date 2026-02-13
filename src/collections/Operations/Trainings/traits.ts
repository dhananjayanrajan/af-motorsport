import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { TRAINING_INTENSITY, TRAINING_FORMAT } from './constants'

export const traitsFields: Field[] = [
  {
    type: 'row',
    fields: [
      selectFieldFactory({
        name: 'intensity',
        options: TRAINING_INTENSITY,
        dictionary: dictionary.tabs.traits.fields,
        width: 3,
        flags: [],
      }),
      selectFieldFactory({
        name: 'format',
        options: TRAINING_FORMAT,
        dictionary: dictionary.tabs.traits.fields,
        width: 3,
        flags: [],
      }),
      relationshipFieldFactory({
        name: 'specifications',
        relationTo: 'specifications',
        dictionary: dictionary.tabs.traits.fields,
        width: 3,
        flags: ['hasMany'],
      }),
    ],
  },
]
