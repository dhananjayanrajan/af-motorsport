import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const traitsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'features',
        relationTo: 'features',
        dictionary: dictionary.tabs.traits.fields,
        width: 3,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'specifications',
        relationTo: 'specifications',
        dictionary: dictionary.tabs.traits.fields,
        width: 3,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'expectations',
        relationTo: 'expectations',
        dictionary: dictionary.tabs.traits.fields,
        width: 3,
        flags: ['hasMany'],
      }),
    ],
  },
]
