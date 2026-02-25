// FILE: src/collections/Attributes/Preferences/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { PREFERENCE_IMPORTANCE } from '../sources/constants'
import { groupFactory } from '@/fields/factories/blueprint'

export const traitsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.traits.conditions,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'trigger',
              dictionary: dictionary.tabs.traits.conditions.fields,
              width: 2,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'prerequisite',
              dictionary: dictionary.tabs.traits.conditions.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      true
    ),
  ),
  advanced(
    groupFactory(
      dictionary.tabs.traits.reasons,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'reason',
              dictionary: dictionary.tabs.traits.reasons.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'importance',
              options: PREFERENCE_IMPORTANCE,
              dictionary: dictionary.tabs.traits.reasons.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      true
    ),
  ),
]
