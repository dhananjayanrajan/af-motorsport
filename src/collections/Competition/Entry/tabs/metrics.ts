// FILE: src/collections/Competition/Entries/tabs/metrics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const metricsFields: Field[] = [
  advanced(
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
              width: 2,
              flags: ['index', 'advanced'],
            }),
            numberFieldFactory({
              name: 'laps',
              dictionary: dictionary.tabs.metrics.fields.positions.fields,
              width: 2,
              flags: ['index', 'advanced'],
            }),
            numberFieldFactory({
              name: 'start',
              dictionary: dictionary.tabs.metrics.fields.positions.fields,
              width: 2,
              flags: ['index', 'advanced'],
            }),
            numberFieldFactory({
              name: 'finish',
              dictionary: dictionary.tabs.metrics.fields.positions.fields,
              width: 2,
              flags: ['index', 'advanced'],
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
      false
    )
  ),
]
