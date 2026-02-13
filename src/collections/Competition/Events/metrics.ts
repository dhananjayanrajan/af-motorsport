import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const metricsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'specifications',
        relationTo: 'specifications',
        dictionary: dictionary.tabs.metrics.fields,
        width: 1,
        flags: ['hasMany', 'advanced'],
      }),
    ],
  },
]
