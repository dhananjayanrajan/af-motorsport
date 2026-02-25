// FILE: src/collections/Attributes/Specifications/tabs/metrics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { groupFactory } from '@/fields/factories/blueprint'
import { advanced } from '@/fields/factories/toggles/advanced'
import { SPEC_FREQUENCY, SPEC_ACCURACY } from '../sources/constants'

export const metricsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.metrics.fields.measurement,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'method',
              dictionary: dictionary.tabs.metrics.fields.measurement.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'frequency',
              options: SPEC_FREQUENCY,
              dictionary: dictionary.tabs.metrics.fields.measurement.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'accuracy',
              options: SPEC_ACCURACY,
              dictionary: dictionary.tabs.metrics.fields.measurement.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
  advanced(
    groupFactory(
      dictionary.tabs.metrics.fields.parameters,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'parameter',
              dictionary: dictionary.tabs.metrics.fields.parameters.fields,
              width: 4,
              flags: [],
            }),
            textFieldFactory({
              name: 'value',
              dictionary: dictionary.tabs.metrics.fields.parameters.fields,
              width: 4,
              flags: [],
            }),
            textFieldFactory({
              name: 'unit',
              dictionary: dictionary.tabs.metrics.fields.parameters.fields,
              width: 4,
              flags: [],
            }),
            textFieldFactory({
              name: 'tolerance',
              dictionary: dictionary.tabs.metrics.fields.parameters.fields,
              width: 4,
              flags: ['advanced'],
            }),
          ]
        }
      ],
      true
    )
  ),
]
