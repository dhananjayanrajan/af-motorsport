// FILE: src/collections/Competition/Sessions/tabs/metrics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

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
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'distance',
              dictionary: dictionary.tabs.metrics.fields.quantifiers.fields,
              width: 3,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'duration',
              dictionary: dictionary.tabs.metrics.fields.quantifiers.fields,
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
      dictionary.tabs.metrics.fields.outcomes,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'highlights',
              relationTo: 'highlights',
              dictionary: dictionary.tabs.metrics.fields.outcomes.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'incidents',
              relationTo: 'incidents',
              dictionary: dictionary.tabs.metrics.fields.outcomes.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
]
