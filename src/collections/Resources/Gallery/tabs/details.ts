// FILE: src/collections/Resources/Galleries/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { advanced } from '@/fields/factories/toggles/advanced'
import { uploadFieldFactory } from '@/fields/factories/fields/uploadField'

export const detailsFields: Field[] = [
  advanced(
    uploadFieldFactory({
      name: 'images',
      relationTo: 'media',
      dictionary: dictionary.tabs.details.fields,
      width: 1,
      flags: ['required', 'hasMany', 'advanced'],
    }),
  ),
]
