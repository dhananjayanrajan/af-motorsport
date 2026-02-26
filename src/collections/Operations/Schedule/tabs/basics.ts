// FILE: src/collections/Operations/Schedules/tabs/basics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { groupFactory } from '@/fields/factories/blueprint'
import { SCHEDULE_SIGNIFICANCE, SCHEDULE_SCALE, SCHEDULE_DEPTH } from '../sources/constants'
import { advanced } from '@/fields/factories/toggles/advanced'

export const basicsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.basics.fields.scope,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            selectFieldFactory({
              name: 'significance',
              options: SCHEDULE_SIGNIFICANCE,
              dictionary: dictionary.tabs.basics.fields.scope.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'scale',
              options: SCHEDULE_SCALE,
              dictionary: dictionary.tabs.basics.fields.scope.fields,
              width: 3,
              flags: ['advanced'],
            }),
            selectFieldFactory({
              name: 'depth',
              options: SCHEDULE_DEPTH,
              dictionary: dictionary.tabs.basics.fields.scope.fields,
              width: 3,
              flags: ['advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
  advanced(
    textareaFieldFactory({
      name: 'agenda',
      dictionary: dictionary.tabs.basics.fields,
      width: 1,
      flags: ['localized'],
    }),
  )
]
