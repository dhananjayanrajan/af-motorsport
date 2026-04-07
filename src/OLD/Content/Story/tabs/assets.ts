// FILE: src/collections/Content/Stories/tabs/assets.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { uploadFieldFactory } from '@/fields/factories/fields/uploadField'

export const assetsFields: Field[] = [
  {
    type: 'row',
    fields: [
      uploadFieldFactory({
        name: 'thumbnail',
        relationTo: 'media',
        dictionary: dictionary.tabs.assets.fields,
        width: 1,
        flags: ['advanced'],
      }),
      advanced(
        uploadFieldFactory({
          name: 'cover',
          relationTo: 'media',
          dictionary: dictionary.tabs.assets.fields,
          width: 1,
          flags: ['advanced'],
        }),
      )
    ],
  },
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'gallery',
          relationTo: 'galleries',
          dictionary: dictionary.tabs.assets.fields,
          width: 2,
          flags: ['advanced'],
        }),
        relationshipFieldFactory({
          name: 'playlist',
          relationTo: 'playlists',
          dictionary: dictionary.tabs.assets.fields,
          width: 2,
          flags: ['advanced'],
        }),
        relationshipFieldFactory({
          name: 'visualization',
          relationTo: 'visualizations',
          dictionary: dictionary.tabs.assets.fields,
          width: 2,
          flags: ['advanced'],
        }),
        relationshipFieldFactory({
          name: 'documents',
          relationTo: 'archives',
          dictionary: dictionary.tabs.assets.fields,
          width: 2,
          flags: ['advanced'],
        }),
      ],
    }
  )
]
