import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { pointFieldFactory } from '@/fields/factories/fields/pointField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import type { Field } from 'payload'
import { SERIES_ACCESS, SERIES_STATUS } from '../sources/constants'
import { dictionary } from '../sources/dictionary'

export const detailsFields: Field[] = [
  selectFieldFactory({
    name: 'status',
    options: SERIES_STATUS,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
  }),
  selectFieldFactory({
    name: 'access',
    options: SERIES_ACCESS,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  textareaFieldFactory({
    name: 'agenda',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 6,
  }),
  richtextFieldFactory({
    name: 'history',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'predecessor',
    relationTo: 'series',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'successor',
    relationTo: 'series',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  dateFieldFactory({
    name: 'start_date',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
  dateFieldFactory({
    name: 'end_date',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
  pointFieldFactory({
    name: 'location',
    dictionary: dictionary.tabs.details,
    flags: [],
    minLongitude: -180,
    maxLongitude: 180,
    minLatitude: -90,
    maxLatitude: 90,
  }),
]
