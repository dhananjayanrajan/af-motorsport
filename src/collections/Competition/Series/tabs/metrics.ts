// FILE: src/collections/Competition/Series/tabs/metrics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const metricsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'schedule',
          relationTo: 'schedules',
          dictionary: dictionary.tabs.metrics.fields,
          width: 2,
          flags: ['advanced'],
        }),
        relationshipFieldFactory({
          name: 'locations',
          relationTo: 'locations',
          dictionary: dictionary.tabs.metrics.fields,
          width: 2,
          flags: ['hasMany', 'advanced'],
        }),
      ],
    }
  ),
  advanced(
    groupFactory(
      dictionary.tabs.metrics.fields.counts,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            numberFieldFactory({
              name: 'seasons',
              dictionary: dictionary.tabs.metrics.fields.counts.fields,
              width: 3,
              flags: ['advanced'],
            }),
            numberFieldFactory({
              name: 'events',
              dictionary: dictionary.tabs.metrics.fields.counts.fields,
              width: 3,
              flags: ['advanced'],
            }),
            numberFieldFactory({
              name: 'participants',
              dictionary: dictionary.tabs.metrics.fields.counts.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
]
