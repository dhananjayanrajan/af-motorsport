import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { MEMBER_GENDER } from './constants'

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
    dictionary.tabs.basics.fields.identifier,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'number',
            dictionary: dictionary.tabs.basics.fields.identifier.fields,
            width: 2,
            flags: ['index'],
          }),
          textFieldFactory({
            name: 'nickname',
            dictionary: dictionary.tabs.basics.fields.identifier.fields,
            width: 2,
            flags: ['localized'],
          }),
        ],
      },
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'callsign',
            dictionary: dictionary.tabs.basics.fields.identifier.fields,
            width: 2,
            flags: [],
          }),
          textFieldFactory({
            name: 'badge',
            dictionary: dictionary.tabs.basics.fields.identifier.fields,
            width: 2,
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
            options: MEMBER_GENDER,
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
  groupFactory(
    dictionary.tabs.basics.fields.chronology,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          dateFieldFactory({
            name: 'birth',
            dictionary: dictionary.tabs.basics.fields.chronology.fields,
            width: 3,
            flags: [],
          }),
          dateFieldFactory({
            name: 'debut',
            dictionary: dictionary.tabs.basics.fields.chronology.fields,
            width: 3,
            flags: [],
          }),
          dateFieldFactory({
            name: 'retirement',
            dictionary: dictionary.tabs.basics.fields.chronology.fields,
            width: 3,
            flags: ['advanced'],
          }),
        ],
      },
    ],
    false
  ),
]
