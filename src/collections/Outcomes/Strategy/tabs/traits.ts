// FILE: src/collections/Outcomes/Strategies/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { STRATEGY_CONTINGENCY_PROBABILITY, STRATEGY_CONTINGENCY_IMPACT } from '../sources/constants'
import { groupFactory } from '@/fields/factories/blueprint'

export const traitsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.directives,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'phase',
              dictionary: dictionary.tabs.traits.fields.directives.fields,
              width: 2,
              flags: ['localized', 'index', 'advanced'],
            }),
            textFieldFactory({
              name: 'action',
              dictionary: dictionary.tabs.traits.fields.directives.fields,
              width: 2,
              flags: ['localized', 'index', 'advanced'],
            }),
            textFieldFactory({
              name: 'owner',
              dictionary: dictionary.tabs.traits.fields.directives.fields,
              width: 2,
              flags: ['localized', 'index', 'advanced'],
            }),
            dateFieldFactory({
              name: 'deadline',
              dictionary: dictionary.tabs.traits.fields.directives.fields,
              width: 2,
              flags: ['localized', 'index', 'advanced'],
              pickerAppearance: 'dayOnly',
            }),
          ],
        },
      ],
      true
    )
  ),
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.contingencies,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'trigger',
              dictionary: dictionary.tabs.traits.fields.contingencies.fields,
              width: 1,
              flags: ['localized', 'index', 'advanced'],
            }),
            textFieldFactory({
              name: 'response',
              dictionary: dictionary.tabs.traits.fields.contingencies.fields,
              width: 1,
              flags: ['localized', 'index', 'advanced'],
            }),
            selectFieldFactory({
              name: 'probability',
              options: STRATEGY_CONTINGENCY_PROBABILITY,
              dictionary: dictionary.tabs.traits.fields.contingencies.fields,
              width: 2,
              flags: ['localized', 'index', 'advanced'],
            }),
            selectFieldFactory({
              name: 'impact',
              options: STRATEGY_CONTINGENCY_IMPACT,
              dictionary: dictionary.tabs.traits.fields.contingencies.fields,
              width: 2,
              flags: ['localized', 'index', 'advanced'],
            }),
          ],
        },
      ],
      true
    )
  ),
]
