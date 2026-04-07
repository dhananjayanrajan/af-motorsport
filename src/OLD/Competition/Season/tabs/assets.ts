// FILE: src/collections/Competition/Seasons/tabs/assets.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { uploadFieldFactory } from '@/fields/factories/fields/uploadField'

export const assetsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        uploadFieldFactory({
          name: 'cover',
          relationTo: 'media',
          dictionary: dictionary.tabs.assets.fields,
          width: 1,
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
        relationshipFieldFactory({
          name: 'archive',
          relationTo: 'archives',
          dictionary: dictionary.tabs.assets.fields,
          width: 3,
          flags: ['hasMany', 'advanced'],
        }),
      ],
    }
  )
]
