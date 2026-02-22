// FILE: src/collections/Competition/Sessions/tabs/metrics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const metricsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.metrics.fields.quantifiers,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            numberFieldFactory({
              name: 'laps',
              dictionary: dictionary.tabs.metrics.fields.quantifiers.fields,
              width: 3,
              flags: [],
            }),
            textFieldFactory({
              name: 'distance',
              dictionary: dictionary.tabs.metrics.fields.quantifiers.fields,
              width: 3,
              flags: [],
            }),
            textFieldFactory({
              name: 'duration',
              dictionary: dictionary.tabs.metrics.fields.quantifiers.fields,
              width: 3,
              flags: [],
            }),
          ],
        },
      ],
      false
    )
  ),
]
