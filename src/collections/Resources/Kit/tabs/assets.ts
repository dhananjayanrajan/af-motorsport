// FILE: src/collections/Resources/Kits/tabs/assets.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const assetsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'thumbnail',
        relationTo: 'media',
        dictionary: dictionary.tabs.assets.fields,
        width: 2,
        flags: [],
      }),
      relationshipFieldFactory({
        name: 'cover',
        relationTo: 'media',
        dictionary: dictionary.tabs.assets.fields,
        width: 2,
        flags: [],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'gallery',
        relationTo: 'galleries',
        dictionary: dictionary.tabs.assets.fields,
        width: 2,
        flags: [],
      }),
      relationshipFieldFactory({
        name: 'visualizations',
        relationTo: 'visualizations',
        dictionary: dictionary.tabs.assets.fields,
        width: 2,
        flags: ['hasMany'],
      }),
    ],
  },
]
