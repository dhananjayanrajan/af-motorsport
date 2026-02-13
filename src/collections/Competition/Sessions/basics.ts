import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { SESSION_STATUS, SESSION_ACCESS } from './constants'
import { textFieldFactory } from '@/fields/factories/fields/textField'

export const basicsFields: Field[] = [
  {
    type: 'row',
    fields: [
      textFieldFactory({
        name: 'description',
        dictionary: dictionary.tabs.basics.fields,
        width: 1,
        flags: ['localized'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      selectFieldFactory({
        name: 'status',
        options: SESSION_STATUS,
        dictionary: dictionary.tabs.basics.fields,
        width: 2,
        flags: ['required'],
      }),
      selectFieldFactory({
        name: 'access',
        options: SESSION_ACCESS,
        dictionary: dictionary.tabs.basics.fields,
        width: 2,
        flags: ['required'],
      }),
    ],
  },
]
