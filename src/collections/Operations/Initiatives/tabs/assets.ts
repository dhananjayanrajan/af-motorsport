import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { uploadFieldFactory } from '@/fields/factories/fields/uploadField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const assetsFields: Field[] = [
  uploadFieldFactory({
    name: 'thumbnail',
    relationTo: 'media',
    dictionary: dictionary.tabs.assets,
    width: 2,
    flags: [],
  }),
  uploadFieldFactory({
    name: 'candid',
    relationTo: 'media',
    dictionary: dictionary.tabs.assets,
    width: 2,
    flags: [],
  }),
  uploadFieldFactory({
    name: 'cover',
    relationTo: 'media',
    dictionary: dictionary.tabs.assets,
    width: 2,
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'documents',
    relationTo: 'media',
    dictionary: dictionary.tabs.assets,
    width: 1,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 50,
  }),
]
