// FILE: src/collections/Competition/Entries/tabs/metrics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const metricsFields: Field[] = [
  groupFactory(
    dictionary.tabs.metrics.fields.positions,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          numberFieldFactory({
            name: 'grid',
            dictionary: dictionary.tabs.metrics.fields.positions.fields,
            width: 4,
            flags: [],
          }),
          numberFieldFactory({
            name: 'start',
            dictionary: dictionary.tabs.metrics.fields.positions.fields,
            width: 4,
            flags: [],
          }),
          numberFieldFactory({
            name: 'finish',
            dictionary: dictionary.tabs.metrics.fields.positions.fields,
            width: 4,
            flags: [],
          }),
          numberFieldFactory({
            name: 'laps',
            dictionary: dictionary.tabs.metrics.fields.positions.fields,
            width: 4,
            flags: [],
          }),
        ],
      },
    ],
    false
  ),
  advanced(
    {
      name: 'parameters',
      type: 'array',
      label: dictionary.tabs.metrics.fields.parameters.label,
      admin: {
        description: dictionary.tabs.metrics.fields.parameters.description,
      },
      fields: [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'parameter',
              relationTo: 'classifications',
              dictionary: dictionary.tabs.metrics.fields.parameters.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'value',
              dictionary: dictionary.tabs.metrics.fields.parameters.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'unit',
              dictionary: dictionary.tabs.metrics.fields.parameters.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ],
        },
      ],
    }
  ),
]
