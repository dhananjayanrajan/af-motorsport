// FILE: src/collections/Entities/Drivers/tabs/assets.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { uploadFieldFactory } from '@/fields/factories/fields/uploadField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const assetsFields: Field[] = [
  uploadFieldFactory({
    name: 'avatar',
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
        uploadFieldFactory({
          name: 'autograph',
          relationTo: 'media',
          dictionary: dictionary.tabs.assets.fields,
          width: 3,
          flags: ['advanced'],
        }),
        uploadFieldFactory({
          name: 'helmet',
          relationTo: 'media',
          dictionary: dictionary.tabs.assets.fields,
          width: 3,
          flags: ['advanced'],
        }),
        uploadFieldFactory({
          name: 'suit',
          relationTo: 'media',
          dictionary: dictionary.tabs.assets.fields,
          width: 3,
          flags: ['advanced'],
        }),
      ]
    }
  ),
  advanced(
    relationshipFieldFactory({
      name: 'gallery',
      relationTo: 'galleries',
      dictionary: dictionary.tabs.assets.fields,
      width: 1,
      flags: ['hasMany', 'advanced'],
    }),
  ),
]
