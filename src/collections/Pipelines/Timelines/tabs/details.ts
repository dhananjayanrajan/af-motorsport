import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { TIMELINE_SCOPE, TIMELINE_STATUS, COLOR_SCHEME, ORIENTATION } from '../sources/constants'

export const detailsFields: Field[] = [
  selectFieldFactory({
    name: 'scope',
    options: TIMELINE_SCOPE,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  selectFieldFactory({
    name: 'status',
    options: TIMELINE_STATUS,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
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
  selectFieldFactory({
    name: 'color_scheme',
    options: COLOR_SCHEME,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  selectFieldFactory({
    name: 'orientation',
    options: ORIENTATION,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
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
