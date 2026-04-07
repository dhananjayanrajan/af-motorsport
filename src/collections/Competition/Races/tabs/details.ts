import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { RACE_TYPE, RACE_STATUS } from '../sources/constants'

export const detailsFields: Field[] = [
  richtextFieldFactory({
    name: 'history',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
  }),
  selectFieldFactory({
    name: 'type',
    options: RACE_TYPE,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
  }),
  selectFieldFactory({
    name: 'status',
    options: RACE_STATUS,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
  }),
  dateFieldFactory({
    name: 'start_date',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayAndTime',
    flags: ['index'],
  }),
  dateFieldFactory({
    name: 'end_date',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayAndTime',
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'event',
    relationTo: 'events',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['required', 'index'],
  }),
  relationshipFieldFactory({
    name: 'season',
    relationTo: 'seasons',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
  }),
  relationshipFieldFactory({
    name: 'series',
    relationTo: 'series',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
  }),
  relationshipFieldFactory({
    name: 'circuit',
    relationTo: 'circuits',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
  }),
  numberFieldFactory({
    name: 'laps',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    min: 1,
    max: 200,
    step: 1,
  }),
  numberFieldFactory({
    name: 'distance_km',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    min: 1,
    max: 1000,
    step: 0.1,
  }),
  relationshipFieldFactory({
    name: 'winner',
    relationTo: 'drivers',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'pole_position',
    relationTo: 'entries',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'fastest_lap',
    relationTo: 'entries',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  {
    name: 'fastest_lap_time',
    type: 'text',
    label: dictionary.tabs.details.fastest_lap_time.label,
    admin: {
      width: '33.334%',
      description: dictionary.tabs.details.fastest_lap_time.description,
      placeholder: 'MM:SS.mmm',
    },
  },
  textareaFieldFactory({
    name: 'weather',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 500,
    rows: 2,
  }),
  numberFieldFactory({
    name: 'safety_car_periods',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    min: 0,
    max: 20,
    step: 1,
  }),
  numberFieldFactory({
    name: 'red_flags',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    min: 0,
    max: 10,
    step: 1,
  }),
  textareaFieldFactory({
    name: 'notes',
    dictionary: dictionary.tabs.details,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
]
