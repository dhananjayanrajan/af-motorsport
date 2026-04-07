// FILE: src/collections/Competition/Results/tabs/metrics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const metricsFields: Field[] = [
  groupFactory(
    dictionary.tabs.metrics.fields.position,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          numberFieldFactory({
            name: 'overall',
            dictionary: dictionary.tabs.metrics.fields.position.fields,
            width: 3,
            flags: ['advanced'],
          }),
          numberFieldFactory({
            name: 'class',
            dictionary: dictionary.tabs.metrics.fields.position.fields,
            width: 3,
            flags: ['advanced'],
          }),
          numberFieldFactory({
            name: 'order',
            dictionary: dictionary.tabs.metrics.fields.position.fields,
            width: 3,
            flags: ['advanced'],
          }),
        ],
      },
    ],
    false
  ),
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
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'time',
              dictionary: dictionary.tabs.metrics.fields.performance.fields,
              width: 2,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'speed',
              dictionary: dictionary.tabs.metrics.fields.performance.fields,
              width: 2,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'distance',
              dictionary: dictionary.tabs.metrics.fields.performance.fields,
              width: 2,
              flags: ['advanced'],
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
              width: 1,
              flags: ['advanced'],
            }),
            numberFieldFactory({
              name: 'duration',
              dictionary: dictionary.tabs.metrics.fields.stoppages.fields,
              width: 2,
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
