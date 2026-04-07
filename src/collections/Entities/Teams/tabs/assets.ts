import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { uploadFieldFactory } from '@/fields/factories/fields/uploadField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const assetsFields: Field[] = [
  uploadFieldFactory({
    name: 'logo',
    relationTo: 'media',
    dictionary: dictionary.tabs.assets.fields,
    width: 2,
    flags: [],
  }),
  uploadFieldFactory({
    name: 'cover',
    relationTo: 'media',
    dictionary: dictionary.tabs.assets.fields,
    width: 2,
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'gallery',
    relationTo: 'media',
    dictionary: dictionary.tabs.assets.fields,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 100,
  }),
]
