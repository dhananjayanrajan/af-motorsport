// FILE: src/collections/Competition/Results/tabs/metrics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const metricsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.metrics.fields.performance,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            numberFieldFactory({
              name: 'laps',
              dictionary: dictionary.tabs.metrics.fields.performance.fields,
              width: 2,
              flags: [],
            }),
            textFieldFactory({
              name: 'time',
              dictionary: dictionary.tabs.metrics.fields.performance.fields,
              width: 2,
              flags: [],
            }),
          ],
        },
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'speed',
              dictionary: dictionary.tabs.metrics.fields.performance.fields,
              width: 2,
              flags: [],
            }),
            textFieldFactory({
              name: 'distance',
              dictionary: dictionary.tabs.metrics.fields.performance.fields,
              width: 2,
              flags: [],
            }),
          ],
        },
      ],
      false
    )
  ),
  advanced(
    {
      name: 'stoppages',
      type: 'array',
      label: dictionary.tabs.metrics.fields.stoppages.label,
      admin: {
        description: dictionary.tabs.metrics.fields.stoppages.description,
      },
      fields: [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'reason',
              dictionary: dictionary.tabs.metrics.fields.stoppages.fields,
              width: 4,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'duration',
              dictionary: dictionary.tabs.metrics.fields.stoppages.fields,
              width: 4,
              flags: ['advanced'],
            }),
            numberFieldFactory({
              name: 'lap',
              dictionary: dictionary.tabs.metrics.fields.stoppages.fields,
              width: 4,
              flags: ['advanced'],
            }),
          ],
        },
      ],
    }
  ),
]
