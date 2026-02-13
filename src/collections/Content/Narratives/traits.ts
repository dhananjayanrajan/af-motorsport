import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const traitsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'tone',
        relationTo: 'tones',
        dictionary: dictionary.tabs.traits.fields,
        width: 1,
        flags: [],
      }),
    ],
  },
]
