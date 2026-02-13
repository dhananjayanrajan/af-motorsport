import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { INDIVIDUAL_GENDER } from './constants'

export const basicsFields: Field[] = [
  groupFactory(
    dictionary.tabs.basics.fields.identifier,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'nickname',
            dictionary: dictionary.tabs.basics.fields.identifier.fields,
            width: 3,
            flags: ['localized'],
          }),
          textFieldFactory({
            name: 'code',
            dictionary: dictionary.tabs.basics.fields.identifier.fields,
            width: 3,
            flags: [],
          }),
          textFieldFactory({
            name: 'number',
            dictionary: dictionary.tabs.basics.fields.identifier.fields,
            width: 3,
            flags: [],
          }),
        ],
      },
    ],
    false
  ),
  groupFactory(
    dictionary.tabs.basics.fields.identity,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          selectFieldFactory({
            name: 'gender',
            options: INDIVIDUAL_GENDER,
            dictionary: dictionary.tabs.basics.fields.identity.fields,
            width: 2,
            flags: [],
          }),
          textFieldFactory({
            name: 'pronouns',
            dictionary: dictionary.tabs.basics.fields.identity.fields,
            width: 2,
            flags: [],
          }),
        ],
      },
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'age',
            dictionary: dictionary.tabs.basics.fields.identity.fields,
            width: 2,
            flags: [],
          }),
          textFieldFactory({
            name: 'nationality',
            dictionary: dictionary.tabs.basics.fields.identity.fields,
            width: 2,
            flags: ['index'],
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
]
