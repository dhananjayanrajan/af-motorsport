// FILE: src/collections/Content/Histories/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { HISTORY_IMPACT, HISTORY_MEMORY } from '../sources/constants'

export const traitsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.legacy,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'impact',
              options: HISTORY_IMPACT,
              dictionary: dictionary.tabs.traits.fields.legacy.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'memory',
              options: HISTORY_MEMORY,
              dictionary: dictionary.tabs.traits.fields.legacy.fields,
              width: 2,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'legacy',
              dictionary: dictionary.tabs.traits.fields.legacy.fields,
              width: 1,
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
      dictionary.tabs.traits.fields.evolution,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'origin',
              dictionary: dictionary.tabs.traits.fields.evolution.fields,
              width: 2,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'development',
              dictionary: dictionary.tabs.traits.fields.evolution.fields,
              width: 2,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'lineage',
              dictionary: dictionary.tabs.traits.fields.evolution.fields,
              width: 1,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
]
