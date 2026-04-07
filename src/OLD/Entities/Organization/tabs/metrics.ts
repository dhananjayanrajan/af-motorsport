// FILE: src/collections/Entities/Members/tabs/metrics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { groupFactory } from '@/fields/factories/blueprint'
import {
  ORG_BENEFIT_TYPE,
  ORG_BENEFIT_IMPACT,
} from '../sources/constants'

export const metricsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.metrics.fields.benefits,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'benefit',
              dictionary: dictionary.tabs.metrics.fields.benefits.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'type',
              options: ORG_BENEFIT_TYPE,
              dictionary: dictionary.tabs.metrics.fields.benefits.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'impact',
              options: ORG_BENEFIT_IMPACT,
              dictionary: dictionary.tabs.metrics.fields.benefits.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      true
    )
  ),
]
