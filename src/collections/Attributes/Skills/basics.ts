import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import {
  SKILL_SCALE,
  SKILL_DEPTH,
  SKILL_RARITY,
} from './constants'

export const basicsFields: Field[] = [
  {
    type: 'row',
    fields: [
      textareaFieldFactory({
        name: 'description',
        dictionary: dictionary.tabs.basics.fields,
        width: 1,
        flags: ['localized'],
      }),
    ],
  },
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
            width: 4,
            flags: ['advanced'],
          }),
          selectFieldFactory({
            name: 'scale',
            options: SKILL_SCALE,
            dictionary: dictionary.tabs.basics.fields.scope.fields,
            width: 4,
            flags: ['advanced'],
          }),
          selectFieldFactory({
            name: 'depth',
            options: SKILL_DEPTH,
            dictionary: dictionary.tabs.basics.fields.scope.fields,
            width: 4,
            flags: ['advanced'],
          }),
          selectFieldFactory({
            name: 'rarity',
            options: SKILL_RARITY,
            dictionary: dictionary.tabs.basics.fields.scope.fields,
            width: 4,
            flags: ['advanced'],
          }),
        ],
      },
    ],
    true
  ),
]
