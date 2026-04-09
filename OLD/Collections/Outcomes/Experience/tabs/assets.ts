// FILE: src/collections/Outcomes/Experiences/tabs/assets.ts
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
          name: 'evidence',
          relationTo: 'media',
          dictionary: dictionary.tabs.assets.fields,
          width: 1,
          flags: ['hasMany', 'advanced'],
        }),
        relationshipFieldFactory({
          name: 'gallery',
          relationTo: 'galleries',
          dictionary: dictionary.tabs.assets.fields,
          width: 1,
          flags: ['advanced'],
        }),
      ],
    }
  ),
]
