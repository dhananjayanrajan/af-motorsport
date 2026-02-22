// FILE: src/collections/Entities/Drivers/tabs/assets.ts
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
          width: 2,
          flags: ['advanced'],
        }),
        relationshipFieldFactory({
          name: 'cover',
          relationTo: 'media',
          dictionary: dictionary.tabs.assets.fields,
          width: 2,
          flags: ['advanced'],
        }),
      ],
    }
  ),
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'helmet',
          relationTo: 'media',
          dictionary: dictionary.tabs.assets.fields,
          width: 2,
          flags: ['advanced'],
        }),
        relationshipFieldFactory({
          name: 'suit',
          relationTo: 'media',
          dictionary: dictionary.tabs.assets.fields,
          width: 2,
          flags: ['advanced'],
        }),
      ],
    }
  ),
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'gallery',
        relationTo: 'galleries',
        dictionary: dictionary.tabs.assets.fields,
        width: 1,
        flags: ['hasMany', 'advanced'],
      }),
    ],
  },
]
