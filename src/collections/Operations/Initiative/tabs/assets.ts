// FILE: src/collections/Operations/Initiatives/tabs/assets.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { uploadFieldFactory } from '@/fields/factories/fields/uploadField'

export const assetsFields: Field[] = [
  uploadFieldFactory({
    name: 'primary',
    relationTo: 'media',
    dictionary: dictionary.tabs.assets.fields,
    width: 1,
    flags: ['required'],
  }),
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'gallery',
          relationTo: 'galleries',
          dictionary: dictionary.tabs.assets.fields,
          width: 1,
          flags: ['advanced'],
        }),
        relationshipFieldFactory({
          name: 'documents',
          relationTo: 'archives',
          dictionary: dictionary.tabs.assets.fields,
          width: 1,
          flags: ['advanced'],
        })
      ]
    }
  )
]
