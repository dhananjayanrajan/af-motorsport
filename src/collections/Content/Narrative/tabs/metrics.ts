// FILE: src/collections/Competition/Events/tabs/metrics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { groupFactory } from '@/fields/factories/blueprint'
import { advanced } from '@/fields/factories/toggles/advanced'
import {
  NARRATIVE_TIMELINE_TYPE,
} from '../sources/constants'

export const metricsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.metrics.fields.timeline,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            dateFieldFactory({
              name: 'date',
              dictionary: dictionary.tabs.metrics.fields.timeline.fields,
              width: 2,
              flags: ['advanced'],
              pickerAppearance: 'dayOnly',
            }),
            selectFieldFactory({
              name: 'type',
              options: NARRATIVE_TIMELINE_TYPE,
              dictionary: dictionary.tabs.metrics.fields.timeline.fields,
              width: 2,
              flags: ['advanced'],
            })
          ]
        }
      ],
      true
    ),
  )
]
