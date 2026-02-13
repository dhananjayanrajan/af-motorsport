import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const assetsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'primary',
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
      relationshipFieldFactory({
        name: 'playlist',
        relationTo: 'playlists',
        dictionary: dictionary.tabs.assets.fields,
        width: 3,
        flags: [],
      }),
    ],
  },
]
