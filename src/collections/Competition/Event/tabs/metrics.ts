// FILE: src/collections/Competition/Events/tabs/metrics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
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
