import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { pointFieldFactory } from '@/fields/factories/fields/pointField'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { EVENT_STATUS, EVENT_ACCESS } from '../sources/constants'

export const detailsFields: Field[] = [
  selectFieldFactory({
    name: 'status',
    options: EVENT_STATUS,
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    flags: ['index'],
  }),
  selectFieldFactory({
    name: 'access',
    options: EVENT_ACCESS,
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'season',
    relationTo: 'seasons',
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    flags: ['required', 'index'],
  }),
  pointFieldFactory({
    name: 'location',
    dictionary: dictionary.tabs.details.fields,
    flags: [],
    minLongitude: -180,
    maxLongitude: 180,
    minLatitude: -90,
    maxLatitude: 90,
  }),
  richtextFieldFactory({
    name: 'history',
    dictionary: dictionary.tabs.details.fields,
    width: 1,
    flags: [],
  }),
  dateFieldFactory({
    name: 'start_date',
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: ['index'],
  }),
  dateFieldFactory({
    name: 'end_date',
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
  textareaFieldFactory({
    name: 'notes',
    dictionary: dictionary.tabs.details.fields,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
]
