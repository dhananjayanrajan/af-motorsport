// FILE: src/collections/Outcomes/Impacts/tabs/basics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { groupFactory } from '@/fields/factories/blueprint'
import { advanced } from '@/fields/factories/toggles/advanced'
import { IMPACT_SCALE, IMPACT_DEPTH, IMPACT_RARITY } from '../sources/constants'

export const basicsFields: Field[] = [
  advanced(
    textareaFieldFactory({
      name: 'description',
      dictionary: dictionary.tabs.basics.fields,
      width: 1,
      flags: ['localized', 'index'],
    }),
  ),
  advanced(
    groupFactory(
      dictionary.tabs.basics.fields.scope,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'significance',
              dictionary: dictionary.tabs.basics.fields.scope.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'scale',
              options: IMPACT_SCALE,
              dictionary: dictionary.tabs.basics.fields.scope.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'depth',
              options: IMPACT_DEPTH,
              dictionary: dictionary.tabs.basics.fields.scope.fields,
              width: 2,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'rarity',
              options: IMPACT_RARITY,
              dictionary: dictionary.tabs.basics.fields.scope.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
]
