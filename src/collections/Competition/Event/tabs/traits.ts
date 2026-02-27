// FILE: src/collections/Competition/Events/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'

export const traitsFields: Field[] = [
  advanced(
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
              flags: ['index', 'advanced'],
              pickerAppearance: 'dayAndTime',
            }),
            dateFieldFactory({
              name: 'end',
              dictionary: dictionary.tabs.traits.fields.chronology.fields,
              width: 3,
              flags: ['index', 'advanced'],
              pickerAppearance: 'dayAndTime',
            }),
            textFieldFactory({
              name: 'timezone',
              dictionary: dictionary.tabs.traits.fields.chronology.fields,
              width: 3,
              flags: ['index', 'advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
  advanced(
    groupFactory(
      dictionary.tabs.traits.fields.format,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            textFieldFactory({
              name: 'segment',
              dictionary: dictionary.tabs.traits.fields.format.fields,
              width: 2,
              flags: ['advanced'],
            }),
            numberFieldFactory({
              name: 'duration',
              dictionary: dictionary.tabs.traits.fields.format.fields,
              width: 2,
              flags: ['advanced'],
            }),
            numberFieldFactory({
              name: 'interval',
              dictionary: dictionary.tabs.traits.fields.format.fields,
              width: 2,
              flags: ['advanced'],
            }),
            textFieldFactory({
              name: 'specification',
              dictionary: dictionary.tabs.traits.fields.format.fields,
              width: 2,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
]
