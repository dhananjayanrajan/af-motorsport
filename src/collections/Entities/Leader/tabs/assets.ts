// FILE: src/collections/Entities/Leaders/tabs/assets.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const assetsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'avatar',
        relationTo: 'media',
        dictionary: dictionary.tabs.assets.fields,
        width: 3,
        flags: [],
      }),
      relationshipFieldFactory({
        name: 'cover',
        relationTo: 'media',
        dictionary: dictionary.tabs.assets.fields,
        width: 3,
        flags: [],
      }),
      relationshipFieldFactory({
        name: 'gallery',
        relationTo: 'galleries',
        dictionary: dictionary.tabs.assets.fields,
        width: 3,
        flags: [],
      }),
    ],
  },
]
