// FILE: src/collections/Entities/Organizations/tabs/assets.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const assetsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'logo',
        relationTo: 'media',
        dictionary: dictionary.tabs.assets.fields,
        width: 2,
        flags: [],
      }),
      relationshipFieldFactory({
        name: 'gallery',
        relationTo: 'galleries',
        dictionary: dictionary.tabs.assets.fields,
        width: 2,
        flags: ['hasMany'],
      }),
    ],
  },
]
