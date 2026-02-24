// FILE: src/collections/Competition/Points/tabs/basics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { POINT_SCALE } from '../sources/constants'

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
      numberFieldFactory({
        name: 'value',
        dictionary: dictionary.tabs.basics.fields,
        width: 2,
        flags: [],
      }),
      selectFieldFactory({
        name: 'scale',
        options: POINT_SCALE,
        dictionary: dictionary.tabs.basics.fields,
        width: 2,
        flags: ['advanced'],
      }),
    ],
  },
]
