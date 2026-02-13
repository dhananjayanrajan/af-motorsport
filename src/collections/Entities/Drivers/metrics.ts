import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const metricsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'results',
        relationTo: 'results',
        dictionary: dictionary.tabs.metrics.fields,
        width: 3,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'points',
        relationTo: 'points',
        dictionary: dictionary.tabs.metrics.fields,
        width: 3,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'awards',
        relationTo: 'awards',
        dictionary: dictionary.tabs.metrics.fields,
        width: 3,
        flags: ['hasMany'],
      }),
    ],
  },
]
