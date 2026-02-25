// FILE: src/collections/Resources/Kits/tabs/assets.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { uploadFieldFactory } from '@/fields/factories/fields/uploadField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const assetsFields: Field[] = [
  {
    type: 'row',
    fields: [
      uploadFieldFactory({
        name: 'thumbnail',
        relationTo: 'media',
        dictionary: dictionary.tabs.assets.fields,
        width: 1,
        flags: ['required'],
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
          name: 'visualizations',
          relationTo: 'visualizations',
          dictionary: dictionary.tabs.assets.fields,
          width: 2,
          flags: ['advanced'],
        }),
      ],
    },
  )
]
