import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { textFieldFactory } from '@/fields/factories/fields/textField'

export const metricsFields: Field[] = [
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
    true
  ),
  {
    name: 'stoppages',
    type: 'array',
    label: dictionary.tabs.metrics.fields.stoppages.label,
    admin: {
      description: dictionary.tabs.metrics.fields.stoppages.description,
      condition: (data: any) => data?.toggle === 'advanced',
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
  },
]
