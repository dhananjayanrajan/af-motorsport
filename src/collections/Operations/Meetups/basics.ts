import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

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
  {
    type: 'row',
    fields: [
      dateFieldFactory({
        name: 'date',
        dictionary: dictionary.tabs.basics.fields,
        width: 2,
        flags: ['required'],
      }),
      relationshipFieldFactory({
        name: 'location',
        relationTo: 'locations',
        dictionary: dictionary.tabs.basics.fields,
        width: 2,
        flags: ['required'],
      }),
    ],
  },
]
