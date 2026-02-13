import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const detailsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'narrative',
        relationTo: 'narratives',
        dictionary: dictionary.tabs.details.fields,
        width: 3,
        flags: ['advanced'],
      }),
      relationshipFieldFactory({
        name: 'history',
        relationTo: 'histories',
        dictionary: dictionary.tabs.details.fields,
        width: 3,
        flags: ['advanced'],
      }),
      relationshipFieldFactory({
        name: 'schedule',
        relationTo: 'schedules',
        dictionary: dictionary.tabs.details.fields,
        width: 3,
        flags: ['required'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'classifications',
        relationTo: 'classifications',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: ['hasMany', 'advanced'],
      }),
      relationshipFieldFactory({
        name: 'regulations',
        relationTo: 'protocols',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: ['hasMany', 'advanced'],
      }),
    ],
  },
]
