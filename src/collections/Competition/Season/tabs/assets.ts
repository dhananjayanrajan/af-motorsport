// FILE: src/collections/Competition/Seasons/tabs/assets.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const assetsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'cover',
        relationTo: 'media',
        dictionary: dictionary.tabs.assets.fields,
        width: 2,
        flags: ['advanced'],
      }),
      relationshipFieldFactory({
        name: 'gallery',
        relationTo: 'galleries',
        dictionary: dictionary.tabs.assets.fields,
        width: 2,
        flags: ['advanced'],
      }),
    ],
  },
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'playlist',
        relationTo: 'playlists',
        dictionary: dictionary.tabs.assets.fields,
        width: 2,
        flags: ['advanced'],
      }),
      relationshipFieldFactory({
        name: 'archive',
        relationTo: 'archives',
        dictionary: dictionary.tabs.assets.fields,
        width: 2,
        flags: ['hasMany', 'advanced'],
      }),
    ],
  },
]
