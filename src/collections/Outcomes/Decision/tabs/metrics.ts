// FILE: src/collections/Entities/Drivers/tabs/metrics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { advanced } from '@/fields/factories/toggles/advanced'
import { groupFactory } from '@/fields/factories/blueprint'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const metricsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.metrics.fields.outcomes,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'expectations',
              relationTo: 'expectations',
              dictionary: dictionary.tabs.metrics.fields.outcomes.fields,
              width: 1,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'impacts',
              relationTo: 'impacts',
              dictionary: dictionary.tabs.metrics.fields.outcomes.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
]
