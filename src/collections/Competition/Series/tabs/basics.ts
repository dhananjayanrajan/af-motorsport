// FILE: src/collections/Competition/Series/tabs/basics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { SERIES_STATUS } from '../sources/constants'

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
            name: 'abbreviation',
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
      textFieldFactory({
        name: 'tagline',
        dictionary: dictionary.tabs.basics.fields,
        width: 2,
        flags: ['localized', 'advanced'],
      }),
      selectFieldFactory({
        name: 'status',
        options: SERIES_STATUS,
        dictionary: dictionary.tabs.basics.fields,
        width: 2,
        flags: ['required'],
      }),
    ],
  },
]
