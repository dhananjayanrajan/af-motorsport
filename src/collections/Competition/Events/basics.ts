import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { EVENT_STATUS, EVENT_ACCESS } from './constants'

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
    dictionary.tabs.basics.fields.identifiers,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'code',
            dictionary: dictionary.tabs.basics.fields.identifiers.fields,
            width: 2,
            flags: ['index', 'unique'],
          }),
          textFieldFactory({
            name: 'round',
            dictionary: dictionary.tabs.basics.fields.identifiers.fields,
            width: 2,
            flags: ['advanced'],
          }),
        ],
      },
    ],
    false
  ),
  {
    type: 'row',
    fields: [
      selectFieldFactory({
        name: 'status',
        options: EVENT_STATUS,
        dictionary: dictionary.tabs.basics.fields,
        width: 2,
        flags: ['required'],
      }),
      selectFieldFactory({
        name: 'access',
        options: EVENT_ACCESS,
        dictionary: dictionary.tabs.basics.fields,
        width: 2,
        flags: ['required'],
      }),
    ],
  },
]
