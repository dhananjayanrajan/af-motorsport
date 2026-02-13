import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { textFieldFactory } from '@/fields/factories/fields/textField'

export const traitsFields: Field[] = [
  groupFactory(
    dictionary.tabs.traits.fields.position,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          numberFieldFactory({
            name: 'overall',
            dictionary: dictionary.tabs.traits.fields.position.fields,
            width: 3,
            flags: ['required'],
          }),
          numberFieldFactory({
            name: 'class',
            dictionary: dictionary.tabs.traits.fields.position.fields,
            width: 3,
            flags: ['advanced'],
          }),
          numberFieldFactory({
            name: 'order',
            dictionary: dictionary.tabs.traits.fields.position.fields,
            width: 3,
            flags: ['advanced'],
          }),
        ],
      },
    ],
    false
  ),
  groupFactory(
    dictionary.tabs.traits.fields.achievement,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'gap',
            dictionary: dictionary.tabs.traits.fields.achievement.fields,
            width: 3,
            flags: [],
          }),
          textFieldFactory({
            name: 'interval',
            dictionary: dictionary.tabs.traits.fields.achievement.fields,
            width: 3,
            flags: [],
          }),
          textFieldFactory({
            name: 'status',
            dictionary: dictionary.tabs.traits.fields.achievement.fields,
            width: 3,
            flags: [],
          }),
        ],
      },
    ],
    true
  ),
]
