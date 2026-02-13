import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { groupFactory } from '@/fields/factories/blueprint'
import { SPEC_FREQUENCY, SPEC_ACCURACY } from './constants'

export const metricsFields: Field[] = [
  {
    name: 'parameters',
    type: 'array',
    label: dictionary.tabs.metrics.fields.parameters.label,
    fields: [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'parameter',
            dictionary: dictionary.tabs.metrics.fields.parameters.fields,
            width: 4,
            flags: ['required'],
          }),
          textFieldFactory({
            name: 'value',
            dictionary: dictionary.tabs.metrics.fields.parameters.fields,
            width: 4,
            flags: ['required'],
          }),
          textFieldFactory({
            name: 'unit',
            dictionary: dictionary.tabs.metrics.fields.parameters.fields,
            width: 4,
            flags: ['required'],
          }),
          textFieldFactory({
            name: 'tolerance',
            dictionary: dictionary.tabs.metrics.fields.parameters.fields,
            width: 4,
            flags: ['advanced'],
          }),
        ],
      },
    ],
  },
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
    true
  ),
]
