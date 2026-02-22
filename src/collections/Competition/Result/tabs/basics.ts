// FILE: src/collections/Competition/Results/tabs/basics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { RESULT_STATUS } from '../sources/constants'

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
  {
    type: 'row',
    fields: [
      selectFieldFactory({
        name: 'status',
        options: RESULT_STATUS,
        dictionary: dictionary.tabs.basics.fields,
        width: 1,
        flags: ['required'],
      }),
    ],
  },
]
