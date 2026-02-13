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
        width: 2,
        flags: ['advanced'],
      }),
      relationshipFieldFactory({
        name: 'history',
        relationTo: 'histories',
        dictionary: dictionary.tabs.details.fields,
        width: 2,
        flags: ['advanced'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'organization',
        relationTo: 'organizations',
        dictionary: dictionary.tabs.details.fields,
        width: 3,
        flags: ['hasMany', 'advanced'],
      }),
      relationshipFieldFactory({
        name: 'classification',
        relationTo: 'classifications',
        dictionary: dictionary.tabs.details.fields,
        width: 3,
        flags: ['hasMany', 'advanced'],
      }),
      relationshipFieldFactory({
        name: 'features',
        relationTo: 'features',
        dictionary: dictionary.tabs.details.fields,
        width: 3,
        flags: ['hasMany', 'advanced'],
      }),
    ],
  },
]
