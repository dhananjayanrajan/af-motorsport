import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { ENTRY_STATUS } from './constants'

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
            name: 'number',
            dictionary: dictionary.tabs.basics.fields.identifiers.fields,
            width: 2,
            flags: ['required', 'index'],
          }),
          textFieldFactory({
            name: 'plate',
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
        options: ENTRY_STATUS,
        dictionary: dictionary.tabs.basics.fields,
        width: 1,
        flags: ['required'],
      }),
    ],
  },
]
