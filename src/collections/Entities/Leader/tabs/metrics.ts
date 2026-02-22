// FILE: src/collections/Entities/Leaders/tabs/metrics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const metricsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'impacts',
        relationTo: 'impacts',
        dictionary: dictionary.tabs.metrics.fields,
        width: 2,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'awards',
        relationTo: 'awards',
        dictionary: dictionary.tabs.metrics.fields,
        width: 2,
        flags: ['hasMany'],
      }),
    ],
  },
]
