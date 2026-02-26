// FILE: src/collections/Entities/Leaders/tabs/metrics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { groupFactory } from '@/fields/factories/blueprint'

export const metricsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.metrics.fields.operations,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'strategies',
              relationTo: 'strategies',
              dictionary: dictionary.tabs.metrics.fields.operations.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'achievements',
              relationTo: 'experiences',
              dictionary: dictionary.tabs.metrics.fields.operations.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
  advanced(
    groupFactory(
      dictionary.tabs.metrics.fields.outcomes,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'impacts',
              relationTo: 'impacts',
              dictionary: dictionary.tabs.metrics.fields.outcomes.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'awards',
              relationTo: 'awards',
              dictionary: dictionary.tabs.metrics.fields.outcomes.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
          ]
        }
      ]
    )
  )
]
