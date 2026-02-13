import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { HISTORY_IMPACT, HISTORY_MEMORY } from './constants'

export const traitsFields: Field[] = [
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
            width: 3,
            flags: ['advanced'],
          }),
          selectFieldFactory({
            name: 'memory',
            options: HISTORY_MEMORY,
            dictionary: dictionary.tabs.traits.fields.legacy.fields,
            width: 3,
            flags: ['advanced'],
          }),
          textFieldFactory({
            name: 'legacy',
            dictionary: dictionary.tabs.traits.fields.legacy.fields,
            width: 3,
            flags: ['advanced'],
          }),
        ],
      },
    ],
    false
  ),
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
            width: 3,
            flags: ['advanced'],
          }),
          textFieldFactory({
            name: 'development',
            dictionary: dictionary.tabs.traits.fields.evolution.fields,
            width: 3,
            flags: ['advanced'],
          }),
          textFieldFactory({
            name: 'lineage',
            dictionary: dictionary.tabs.traits.fields.evolution.fields,
            width: 3,
            flags: ['advanced'],
          }),
        ],
      },
    ],
    false
  ),
]
