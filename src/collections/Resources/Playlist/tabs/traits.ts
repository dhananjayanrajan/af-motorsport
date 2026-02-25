// FILE: src/collections/Resources/Playlists/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { PLAYLIST_QUALITY, PLAYLIST_FORMAT } from '../sources/constants'
import { advanced } from '@/fields/factories/toggles/advanced'

export const traitsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        selectFieldFactory({
          name: 'quality',
          options: PLAYLIST_QUALITY,
          dictionary: dictionary.tabs.traits.fields,
          width: 2,
          flags: ['advanced'],
        }),
        selectFieldFactory({
          name: 'format',
          options: PLAYLIST_FORMAT,
          dictionary: dictionary.tabs.traits.fields,
          width: 2,
          flags: ['advanced'],
        }),
      ],
    }
  )
]
