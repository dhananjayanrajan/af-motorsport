// FILE: src/collections/Operations/Schedules/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { groupFactory } from '@/fields/factories/blueprint'
import { advanced } from '@/fields/factories/toggles/advanced'
import { SCHEDULE_CHRONOLOGY_TYPE } from '../sources/constants'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { relationship } from 'payload/shared'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const detailsFields: Field[] = [
  advanced(
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
              flags: ['advanced'],
              pickerAppearance: 'dayOnly',
            }),
            selectFieldFactory({
              name: 'type',
              options: SCHEDULE_CHRONOLOGY_TYPE,
              dictionary: dictionary.tabs.details.fields.chronology.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.slots,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'activity',
              dictionary: dictionary.tabs.details.fields.slots.fields,
              width: 1,
              flags: ['advanced'],
            }),
            dateFieldFactory({
              name: 'start',
              dictionary: dictionary.tabs.details.fields.slots.fields,
              width: 2,
              flags: ['advanced'],
              pickerAppearance: 'dayAndTime',
            }),
            dateFieldFactory({
              name: 'end',
              dictionary: dictionary.tabs.details.fields.slots.fields,
              width: 2,
              flags: ['advanced'],
              pickerAppearance: 'dayAndTime',
            }),
            numberFieldFactory({
              name: 'duration',
              dictionary: dictionary.tabs.details.fields.slots.fields,
              width: 2,
              step: 0.1,
              min: 0.1,
              flags: ['advanced'],
            }),
            relationshipFieldFactory({
              name: 'location',
              relationTo: 'locations',
              dictionary: dictionary.tabs.details.fields.slots.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        }
      ],
      true
    )
  ),
]
