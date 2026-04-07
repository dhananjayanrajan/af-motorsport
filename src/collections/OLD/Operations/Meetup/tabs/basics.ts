// FILE: src/collections/Operations/Meetups/tabs/basics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const basicsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        dateFieldFactory({
          name: 'date',
          dictionary: dictionary.tabs.basics.fields,
          width: 2,
          flags: ['advanced'],
          pickerAppearance: 'dayAndTime',
        }),
        relationshipFieldFactory({
          name: 'location',
          relationTo: 'locations',
          dictionary: dictionary.tabs.basics.fields,
          width: 2,
          flags: ['advanced'],
        }),
      ],
    }
  ),
  advanced(
    textareaFieldFactory({
      name: 'description',
      dictionary: dictionary.tabs.basics.fields,
      width: 1,
      flags: ['localized', 'index', 'advanced'],
    }),
  )
]
