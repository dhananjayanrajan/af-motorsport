import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'

export const basicsFields: Field[] = [
  groupFactory(
    dictionary.tabs.basics.fields.identifier,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'code',
            dictionary: dictionary.tabs.basics.fields.identifier.fields,
            width: 3,
            flags: ['index', 'unique'],
          }),
          textFieldFactory({
            name: 'abbreviation',
            dictionary: dictionary.tabs.basics.fields.identifier.fields,
            width: 3,
            flags: [],
          }),
          textFieldFactory({
            name: 'registration',
            dictionary: dictionary.tabs.basics.fields.identifier.fields,
            width: 3,
            flags: [],
          }),
        ],
      },
    ],
    false
  ),
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
      textFieldFactory({
        name: 'tagline',
        dictionary: dictionary.tabs.basics.fields,
        width: 1,
        flags: ['localized'],
      }),
    ],
  },
]
