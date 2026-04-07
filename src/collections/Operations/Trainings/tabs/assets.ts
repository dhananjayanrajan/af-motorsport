import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const assetsFields: Field[] = [
  relationshipFieldFactory({
    name: 'gallery',
    relationTo: 'media',
    dictionary: dictionary.tabs.assets,
    width: 1,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 100,
  }),
]
