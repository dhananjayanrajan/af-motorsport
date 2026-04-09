// FILE: src/collections/Content/Stories/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { STORY_INTERACTION_DYNAMICS } from '../sources/constants'
import { groupFactory } from '@/fields/factories/blueprint'

export const traitsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.concerns,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'conflict',
              dictionary: dictionary.tabs.traits.fields.concerns.fields,
              width: 3,
              flags: ['localized', 'index', 'advanced'],
            }),
            textFieldFactory({
              name: 'stakes',
              dictionary: dictionary.tabs.traits.fields.concerns.fields,
              width: 3,
              flags: ['localized', 'index', 'advanced'],
            }),
            textFieldFactory({
              name: 'resolution',
              dictionary: dictionary.tabs.traits.fields.concerns.fields,
              width: 3,
              flags: ['localized', 'index', 'advanced'],
            }),
          ],
        },
      ],
      true
    )
  ),
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.interactions,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'dynamics',
              options: STORY_INTERACTION_DYNAMICS,
              dictionary: dictionary.tabs.traits.fields.interactions.fields,
              width: 2,
              flags: ['localized', 'index', 'advanced'],
            }),
            textFieldFactory({
              name: 'outcome',
              dictionary: dictionary.tabs.traits.fields.interactions.fields,
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
