import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const contextsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'entities',
        relationTo: ['leaders', 'organizations', 'individuals'],
        dictionary: dictionary.tabs.contexts.fields,
        width: 2,
        flags: ['required'],
      }),
      relationshipFieldFactory({
        name: 'story',
        relationTo: 'stories',
        dictionary: dictionary.tabs.contexts.fields,
        width: 2,
        flags: [],
      }),
    ],
  },
]
