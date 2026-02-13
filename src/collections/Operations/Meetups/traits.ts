import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { MEETUP_FORMAT, MEETUP_ACCESS } from './constants'

export const traitsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'specifications',
        relationTo: 'specifications',
        dictionary: dictionary.tabs.traits.fields,
        width: 1,
        flags: ['hasMany'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      selectFieldFactory({
        name: 'format',
        options: MEETUP_FORMAT,
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: ['required'],
      }),
      selectFieldFactory({
        name: 'access',
        options: MEETUP_ACCESS,
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: ['required'],
      }),
    ],
  },
]
