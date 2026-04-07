import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { pointFieldFactory } from '@/fields/factories/fields/pointField'

export const detailsFields: Field[] = [
  richtextFieldFactory({
    name: 'story',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
  }),
  dateFieldFactory({
    name: 'awarded_date',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: ['index'],
  }),
  pointFieldFactory({
    name: 'awarded_location',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
]
