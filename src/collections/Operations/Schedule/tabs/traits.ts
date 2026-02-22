// FILE: src/collections/Operations/Schedules/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { SCHEDULE_CONSTRAINT_TYPE, SCHEDULE_CONSTRAINT_IMPACT } from '../sources/constants'

export const traitsFields: Field[] = [
  advanced(
    {
      name: 'constraints',
      type: 'array',
      label: dictionary.tabs.traits.fields.constraints.label,
      admin: {
        description: dictionary.tabs.traits.fields.constraints.description,
      },
      fields: [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'constraint',
              dictionary: dictionary.tabs.traits.fields.constraints.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'type',
              options: SCHEDULE_CONSTRAINT_TYPE,
              dictionary: dictionary.tabs.traits.fields.constraints.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'impact',
              options: SCHEDULE_CONSTRAINT_IMPACT,
              dictionary: dictionary.tabs.traits.fields.constraints.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        },
      ],
    }
  ),
]
