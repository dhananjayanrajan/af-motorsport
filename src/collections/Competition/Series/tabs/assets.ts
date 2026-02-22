// FILE: src/collections/Competition/Series/tabs/assets.ts
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
        width: 3,
        flags: ['advanced'],
      }),
      relationshipFieldFactory({
        name: 'cover',
        relationTo: 'media',
        dictionary: dictionary.tabs.assets.fields,
        width: 3,
        flags: ['advanced'],
      }),
      relationshipFieldFactory({
        name: 'archive',
        relationTo: 'archives',
        dictionary: dictionary.tabs.assets.fields,
        width: 3,
        flags: ['hasMany', 'advanced'],
      }),
    ],
  },
]
