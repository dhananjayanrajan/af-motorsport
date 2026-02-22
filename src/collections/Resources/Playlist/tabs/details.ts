// FILE: src/collections/Resources/Playlists/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const detailsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'clips',
          relationTo: 'media',
          dictionary: dictionary.tabs.details.fields,
          width: 2,
          flags: ['hasMany', 'advanced'],
        }),
        relationshipFieldFactory({
          name: 'videos',
          relationTo: 'media',
          dictionary: dictionary.tabs.details.fields,
          width: 2,
          flags: ['hasMany', 'advanced'],
        }),
      ],
    }
  ),
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'narrative',
        relationTo: 'narratives',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['advanced'],
      }),
    ],
  },
]
