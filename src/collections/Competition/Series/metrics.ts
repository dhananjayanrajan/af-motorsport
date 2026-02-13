import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'

export const metricsFields: Field[] = [
  groupFactory(
    dictionary.tabs.metrics.fields.counts,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          numberFieldFactory({
            name: 'seasons',
            dictionary: dictionary.tabs.metrics.fields.counts.fields,
            width: 3,
            flags: [],
          }),
          numberFieldFactory({
            name: 'events',
            dictionary: dictionary.tabs.metrics.fields.counts.fields,
            width: 3,
            flags: [],
          }),
          numberFieldFactory({
            name: 'participants',
            dictionary: dictionary.tabs.metrics.fields.counts.fields,
            width: 3,
            flags: [],
          }),
        ],
      },
    ],
    false
  ),
]
