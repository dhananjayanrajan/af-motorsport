// FILE: src/collections/Attributes/Preferences/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { PREFERENCE_IMPORTANCE } from '../sources/constants'

export const traitsFields: Field[] = [
  advanced(
    {
      name: 'conditions',
      type: 'array',
      label: dictionary.tabs.traits.fields.conditions.label,
      admin: {
        description: dictionary.tabs.traits.fields.conditions.description,
      },
      fields: [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'trigger',
              dictionary: dictionary.tabs.traits.fields.conditions.fields,
              width: 2,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'prerequisite',
              dictionary: dictionary.tabs.traits.fields.conditions.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        },
      ],
    }
  ),
  advanced(
    {
      name: 'reasons',
      type: 'array',
      label: dictionary.tabs.traits.fields.reasons.label,
      admin: {
        description: dictionary.tabs.traits.fields.reasons.description,
      },
      fields: [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'reason',
              dictionary: dictionary.tabs.traits.fields.reasons.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'importance',
              options: PREFERENCE_IMPORTANCE,
              dictionary: dictionary.tabs.traits.fields.reasons.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        },
      ],
    }
  ),
]
