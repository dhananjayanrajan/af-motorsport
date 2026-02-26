// FILE: src/collections/Entities/Drivers/tabs/metrics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { groupFactory } from '@/fields/factories/blueprint'

export const metricsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.metrics.fields.qualifications,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'skills',
              relationTo: 'skills',
              dictionary: dictionary.tabs.metrics.fields,
              width: 1,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'experiences',
              relationTo: 'experiences',
              dictionary: dictionary.tabs.metrics.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'trainings',
              relationTo: 'trainings',
              dictionary: dictionary.tabs.metrics.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
          ],
        },
      ],
      false
    ),
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
              name: 'points',
              relationTo: 'points',
              dictionary: dictionary.tabs.metrics.fields.outcomes.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'results',
              relationTo: 'results',
              dictionary: dictionary.tabs.metrics.fields.outcomes.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'awards',
              relationTo: 'awards',
              dictionary: dictionary.tabs.metrics.fields.outcomes.fields,
              width: 1,
              flags: ['hasMany', 'advanced'],
            }),
          ],
        }
      ],
      false
    ),
  )
]
