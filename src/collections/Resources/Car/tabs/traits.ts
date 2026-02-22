// FILE: src/collections/Resources/Cars/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { CAR_STATUS } from '../sources/constants'

export const traitsFields: Field[] = [
  {
    type: 'row',
    fields: [
      selectFieldFactory({
        name: 'status',
        options: CAR_STATUS,
        dictionary: dictionary.tabs.traits.fields,
        width: 1,
        flags: ['required'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'features',
        relationTo: 'features',
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'specifications',
        relationTo: 'specifications',
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: ['hasMany'],
      }),
    ],
  },
]
