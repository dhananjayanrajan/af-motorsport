// FILE: src/collections/Competition/Series/tabs/assets.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { uploadFieldFactory } from '@/fields/factories/fields/uploadField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const assetsFields: Field[] = [
  uploadFieldFactory({
    name: 'logo',
    relationTo: 'media',
    dictionary: dictionary.tabs.assets.fields,
    width: 1,
    flags: ['required'],
  }),
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
          name: 'archive',
          relationTo: 'archives',
          dictionary: dictionary.tabs.assets.fields,
          width: 1,
          flags: ['hasMany', 'advanced'],
        }),
      ],
    }
  )
]
