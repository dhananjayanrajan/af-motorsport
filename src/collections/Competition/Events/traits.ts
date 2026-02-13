import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const traitsFields: Field[] = [
  groupFactory(
    dictionary.tabs.traits.fields.chronology,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          dateFieldFactory({
            name: 'start',
            dictionary: dictionary.tabs.traits.fields.chronology.fields,
            width: 3,
            flags: ['required'],
          }),
          dateFieldFactory({
            name: 'end',
            dictionary: dictionary.tabs.traits.fields.chronology.fields,
            width: 3,
            flags: ['required'],
          }),
          textFieldFactory({
            name: 'timezone',
            dictionary: dictionary.tabs.traits.fields.chronology.fields,
            width: 3,
            flags: ['required'],
          }),
        ],
      },
    ],
    false
  ),
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'format',
        relationTo: 'categories',
        dictionary: dictionary.tabs.traits.fields,
        width: 1,
        flags: ['required'],
      }),
    ],
  },
]
