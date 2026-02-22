// FILE: src/collections/Outcomes/Strategies/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { STRATEGY_CONTINGENCY_PROBABILITY, STRATEGY_CONTINGENCY_IMPACT } from '../sources/constants'

export const traitsFields: Field[] = [
  advanced(
    {
      name: 'directives',
      type: 'array',
      label: dictionary.tabs.traits.fields.directives.label,
      admin: {
        description: dictionary.tabs.traits.fields.directives.description,
      },
      fields: [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'phase',
              dictionary: dictionary.tabs.traits.fields.directives.fields,
              width: 4,
              flags: [],
            }),
            textFieldFactory({
              name: 'action',
              dictionary: dictionary.tabs.traits.fields.directives.fields,
              width: 4,
              flags: [],
            }),
            textFieldFactory({
              name: 'owner',
              dictionary: dictionary.tabs.traits.fields.directives.fields,
              width: 4,
              flags: [],
            }),
            dateFieldFactory({
              name: 'deadline',
              dictionary: dictionary.tabs.traits.fields.directives.fields,
              width: 4,
              flags: [],
              pickerAppearance: 'dayOnly',
            }),
          ],
        },
      ],
    }
  ),
  advanced(
    {
      name: 'contingencies',
      type: 'array',
      label: dictionary.tabs.traits.fields.contingencies.label,
      admin: {
        description: dictionary.tabs.traits.fields.contingencies.description,
      },
      fields: [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'trigger',
              dictionary: dictionary.tabs.traits.fields.contingencies.fields,
              width: 2,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'response',
              dictionary: dictionary.tabs.traits.fields.contingencies.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        },
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'probability',
              options: STRATEGY_CONTINGENCY_PROBABILITY,
              dictionary: dictionary.tabs.traits.fields.contingencies.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'impact',
              options: STRATEGY_CONTINGENCY_IMPACT,
              dictionary: dictionary.tabs.traits.fields.contingencies.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        },
      ],
    }
  ),
]
