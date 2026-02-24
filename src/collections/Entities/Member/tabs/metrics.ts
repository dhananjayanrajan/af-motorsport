// FILE: src/collections/Entities/Members/tabs/metrics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const metricsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'impacts',
          relationTo: 'impacts',
          dictionary: dictionary.tabs.metrics.fields,
          width: 2,
          flags: ['hasMany', 'advanced'],
        }),
        relationshipFieldFactory({
          name: 'awards',
          relationTo: 'awards',
          dictionary: dictionary.tabs.metrics.fields,
          width: 2,
          flags: ['hasMany', 'advanced'],
        }),
      ],
    },
  )
]
