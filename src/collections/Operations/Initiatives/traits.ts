import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { INITIATIVE_STATUS } from './constants'

export const traitsFields: Field[] = [
  {
    type: 'row',
    fields: [
      selectFieldFactory({
        name: 'status',
        options: INITIATIVE_STATUS,
        dictionary: dictionary.tabs.traits.fields,
        width: 1,
        flags: ['required'],
      }),
    ],
  },
]
