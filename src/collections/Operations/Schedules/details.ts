import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { groupFactory } from '@/fields/factories/blueprint'
import { SCHEDULE_CHRONOLOGY_TYPE } from './constants'

export const detailsFields: Field[] = [
  groupFactory(
    dictionary.tabs.details.fields.chronology,
    dictionary.host,
    [
      {
        type: 'row',
        fields: [
          dateFieldFactory({
            name: 'date',
            dictionary: dictionary.tabs.details.fields.chronology.fields,
            width: 2,
            flags: ['required'],
          }),
          selectFieldFactory({
            name: 'type',
            options: SCHEDULE_CHRONOLOGY_TYPE,
            dictionary: dictionary.tabs.details.fields.chronology.fields,
            width: 2,
            flags: [],
          }),
        ],
      },
    ],
    false
  ),
  {
    name: 'slots',
    type: 'array',
    label: dictionary.tabs.details.fields.slots.label,
    admin: {
      description: dictionary.tabs.details.fields.slots.description,
    },
    fields: [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'activity',
            dictionary: dictionary.tabs.details.fields.slots.fields,
            width: 2,
            flags: ['required'],
          }),
          dateFieldFactory({
            name: 'start',
            dictionary: dictionary.tabs.details.fields.slots.fields,
            width: 2,
            flags: ['required'],
          }),
          dateFieldFactory({
            name: 'end',
            dictionary: dictionary.tabs.details.fields.slots.fields,
            width: 2,
            flags: ['required'],
          }),
        ],
      },
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'duration',
            dictionary: dictionary.tabs.details.fields.slots.fields,
            width: 2,
            flags: [],
          }),
          textFieldFactory({
            name: 'location',
            dictionary: dictionary.tabs.details.fields.slots.fields,
            width: 2,
            flags: [],
          }),
        ],
      },
    ],
  },
]
