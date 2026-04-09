// FILE: src/collections/Resources/Playlists/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { advanced } from '@/fields/factories/toggles/advanced'
import { uploadFieldFactory } from '@/fields/factories/fields/uploadField'

export const detailsFields: Field[] = [
  advanced(
    uploadFieldFactory({
      name: 'clips',
      relationTo: 'media',
      dictionary: dictionary.tabs.details.fields,
      width: 1,
      flags: ['hasMany', 'advanced'],
    }),
  ),
  uploadFieldFactory({
    name: 'videos',
    relationTo: 'media',
    dictionary: dictionary.tabs.details.fields,
    width: 1,
    flags: ['required', 'hasMany'],
  })
]
