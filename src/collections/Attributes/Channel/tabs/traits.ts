// FILE: src/collections/Attributes/Channels/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import {
  USAGE_ROLE,
  USAGE_FUNCTION,
  VALIDITY_STATUS,
  VALIDITY_CONDITION,
  VALIDITY_STATE,
} from '../sources/constants'

export const traitsFields: Field[] = [
  groupFactory(
    dictionary.tabs.traits.usage,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'purpose',
            dictionary: dictionary.tabs.traits.usage.fields,
            width: 3,
            flags: ['localized'],
          }),
          selectFieldFactory({
            name: 'role',
            options: USAGE_ROLE,
            dictionary: dictionary.tabs.traits.usage.fields,
            width: 3,
          }),
          selectFieldFactory({
            name: 'function',
            options: USAGE_FUNCTION,
            dictionary: dictionary.tabs.traits.usage.fields,
            width: 3,
          }),
        ],
      },
    ],
    true
  ),
  groupFactory(
    dictionary.tabs.traits.validity,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          selectFieldFactory({
            name: 'status',
            options: VALIDITY_STATUS,
            dictionary: dictionary.tabs.traits.validity.fields,
            width: 3,
          }),
          selectFieldFactory({
            name: 'condition',
            options: VALIDITY_CONDITION,
            dictionary: dictionary.tabs.traits.validity.fields,
            width: 3,
          }),
          selectFieldFactory({
            name: 'state',
            options: VALIDITY_STATE,
            dictionary: dictionary.tabs.traits.validity.fields,
            width: 3,
          }),
        ],
      },
    ],
    true
  ),
]
