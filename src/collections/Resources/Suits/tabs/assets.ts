import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { uploadFieldFactory } from '@/fields/factories/fields/uploadField'

export const assetsFields: Field[] = [
  uploadFieldFactory({
    name: 'thumbnail',
    relationTo: 'media',
    dictionary: dictionary.tabs.assets.fields,
    width: 2,
    flags: [],
  }),
  uploadFieldFactory({
    name: 'video',
    relationTo: 'media',
    dictionary: dictionary.tabs.assets.fields,
    width: 2,
    flags: [],
  }),
  uploadFieldFactory({
    name: 'images',
    relationTo: 'media',
    dictionary: dictionary.tabs.assets.fields,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 50,
  }),
]
