// FILE: src/collections/Outcomes/Highlights/tabs/assets.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const assetsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'thumbnail',
          relationTo: 'media',
          dictionary: dictionary.tabs.assets.fields,
          width: 3,
          flags: ['advanced'],
        }),
        relationshipFieldFactory({
          name: 'gallery',
          relationTo: 'galleries',
          dictionary: dictionary.tabs.assets.fields,
          width: 3,
          flags: ['advanced'],
        }),
        relationshipFieldFactory({
          name: 'playlist',
          relationTo: 'playlists',
          dictionary: dictionary.tabs.assets.fields,
          width: 3,
          flags: ['advanced'],
        }),
      ],
    }
  ),
]
