// FILE: src/collections/Content/Notes/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { NOTE_INTENTION_TYPE, NOTE_INTENTION_IMPACT } from '../sources/constants'

export const traitsFields: Field[] = [
  advanced(
    {
      name: 'intentions',
      type: 'array',
      label: dictionary.tabs.traits.fields.intentions.label,
      admin: {
        description: dictionary.tabs.traits.fields.intentions.description,
      },
      fields: [
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'type',
              options: NOTE_INTENTION_TYPE,
              dictionary: dictionary.tabs.traits.fields.intentions.fields,
              width: 3,
              flags: [],
            }),
            selectFieldFactory({
              name: 'impact',
              options: NOTE_INTENTION_IMPACT,
              dictionary: dictionary.tabs.traits.fields.intentions.fields,
              width: 3,
              flags: [],
            }),
            textFieldFactory({
              name: 'remark',
              dictionary: dictionary.tabs.traits.fields.intentions.fields,
              width: 3,
              flags: [],
            }),
          ],
        },
      ],
    }
  ),
]
