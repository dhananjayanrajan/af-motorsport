import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { uploadFieldFactory } from '@/fields/factories/fields/uploadField'
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'

export const assetsFields: Field[] = [
  uploadFieldFactory({
    name: 'thumbnail',
    relationTo: 'media',
    dictionary: dictionary.tabs.assets,
    width: 2,
    flags: [],
  }),
  uploadFieldFactory({
    name: 'poster',
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
    name: 'gallery',
    relationTo: 'media',
    dictionary: dictionary.tabs.assets,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 100,
  }),
  uploadFieldFactory({
    name: 'video',
    relationTo: 'media',
    dictionary: dictionary.tabs.assets,
    width: 2,
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'highlights',
    relationTo: 'media',
    dictionary: dictionary.tabs.assets,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 50,
  }),
  relationshipFieldFactory({
    name: 'documents',
    relationTo: 'media',
    dictionary: dictionary.tabs.assets,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 50,
  }),
]
