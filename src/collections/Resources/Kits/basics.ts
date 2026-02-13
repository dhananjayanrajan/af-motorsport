import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { groupFactory } from '@/fields/factories/blueprint'
import { KIT_PURPOSE_APPLICATION } from './constants'

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
    dictionary.tabs.basics.fields.purpose,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          selectFieldFactory({
            name: 'application',
            options: KIT_PURPOSE_APPLICATION,
            dictionary: dictionary.tabs.basics.fields.purpose.fields,
            width: 3,
            flags: [],
          }),
          textFieldFactory({
            name: 'context',
            dictionary: dictionary.tabs.basics.fields.purpose.fields,
            width: 3,
            flags: [],
          }),
          textFieldFactory({
            name: 'conditions',
            dictionary: dictionary.tabs.basics.fields.purpose.fields,
            width: 3,
            flags: ['advanced'],
          }),
        ],
      },
    ],
    false
  ),
]
