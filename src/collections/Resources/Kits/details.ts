import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { groupFactory } from '@/fields/factories/blueprint'
import {
  KIT_FUNCTION_PERFORMANCE,
  KIT_FUNCTION_DURABILITY,
  KIT_FUNCTION_COMFORT,
} from './constants'

export const detailsFields: Field[] = [
  groupFactory(
    dictionary.tabs.details.fields.design,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'concept',
            dictionary: dictionary.tabs.details.fields.design.fields,
            width: 2,
            flags: ['localized'],
          }),
          textFieldFactory({
            name: 'inspiration',
            dictionary: dictionary.tabs.details.fields.design.fields,
            width: 2,
            flags: ['localized'],
          }),
        ],
      },
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'designer',
            dictionary: dictionary.tabs.details.fields.design.fields,
            width: 2,
            flags: [],
          }),
          dateFieldFactory({
            name: 'year',
            dictionary: dictionary.tabs.details.fields.design.fields,
            width: 2,
            flags: [],
          }),
        ],
      },
    ],
    false
  ),
  groupFactory(
    dictionary.tabs.details.fields.functionality,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          selectFieldFactory({
            name: 'performance',
            options: KIT_FUNCTION_PERFORMANCE,
            dictionary: dictionary.tabs.details.fields.functionality.fields,
            width: 3,
            flags: [],
          }),
          selectFieldFactory({
            name: 'durability',
            options: KIT_FUNCTION_DURABILITY,
            dictionary: dictionary.tabs.details.fields.functionality.fields,
            width: 3,
            flags: [],
          }),
          selectFieldFactory({
            name: 'comfort',
            options: KIT_FUNCTION_COMFORT,
            dictionary: dictionary.tabs.details.fields.functionality.fields,
            width: 3,
            flags: [],
          }),
        ],
      },
    ],
    false
  ),
]
