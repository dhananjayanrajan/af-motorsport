// FILE: src/collections/Content/Notes/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { NOTE_INTENTION_TYPE, NOTE_INTENTION_IMPACT } from '../sources/constants'
import { groupFactory } from '@/fields/factories/blueprint'

export const traitsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.intentions,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'type',
              options: NOTE_INTENTION_TYPE,
              dictionary: dictionary.tabs.traits.fields.intentions.fields,
              width: 3,
              flags: ['localized', 'index', 'advanced'],
            }),
            selectFieldFactory({
              name: 'impact',
              options: NOTE_INTENTION_IMPACT,
              dictionary: dictionary.tabs.traits.fields.intentions.fields,
              width: 3,
              flags: ['localized', 'index', 'advanced'],
            }),
            textFieldFactory({
              name: 'remark',
              dictionary: dictionary.tabs.traits.fields.intentions.fields,
              width: 3,
              flags: ['localized', 'index', 'advanced'],
            }),
          ],
        },
      ],
      true
    )
  ),
]
