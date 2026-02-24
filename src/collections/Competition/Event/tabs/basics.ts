// FILE: src/collections/Competition/Events/tabs/basics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { EVENT_STATUS, EVENT_ACCESS } from '../sources/constants'

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
  advanced(
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
    )
  ),
  {
    type: 'row',
    fields: [
      selectFieldFactory({
        name: 'status',
        options: EVENT_STATUS,
        dictionary: dictionary.tabs.basics.fields,
        width: 2,
        flags: [],
      }),
      selectFieldFactory({
        name: 'access',
        options: EVENT_ACCESS,
        dictionary: dictionary.tabs.basics.fields,
        width: 2,
        flags: [],
      }),
    ],
  },
]
