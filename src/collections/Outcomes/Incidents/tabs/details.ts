import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'
import { pointFieldFactory } from '@/fields/factories/fields/pointField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const detailsFields: Field[] = [
  dateFieldFactory({
    name: 'date_time',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayAndTime',
    flags: ['index'],
  }),
  richtextFieldFactory({
    name: 'story',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
  }),
  pointFieldFactory({
    name: 'location',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'cars',
    relationTo: 'cars',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 10,
  }),
  relationshipFieldFactory({
    name: 'drivers',
    relationTo: 'drivers',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 10,
  }),
]
