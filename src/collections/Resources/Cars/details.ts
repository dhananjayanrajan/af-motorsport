import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const detailsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'classifications',
        relationTo: 'classifications',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['hasMany'],
      }),
    ],
  },
]
