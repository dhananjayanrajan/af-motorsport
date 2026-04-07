import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { radioFieldFactory } from '@/fields/factories/fields/radioField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { pointFieldFactory } from '@/fields/factories/fields/pointField'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { CELEBRATION_EXCLUSIVITY } from '../sources/constants'

export const detailsFields: Field[] = [
  radioFieldFactory({
    name: 'exclusivity',
    options: CELEBRATION_EXCLUSIVITY,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
    layout: 'horizontal',
  }),
  dateFieldFactory({
    name: 'date_time',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayAndTime',
    flags: ['index'],
  }),
  pointFieldFactory({
    name: 'location',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  richtextFieldFactory({
    name: 'story',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'leaders',
    relationTo: 'leaders',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 20,
  }),
  relationshipFieldFactory({
    name: 'drivers',
    relationTo: 'drivers',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 50,
  }),
]
