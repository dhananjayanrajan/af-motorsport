import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { REPORT_TYPE, REPORT_FORMAT, REPORT_STATUS } from '../sources/constants'

export const detailsFields: Field[] = [
  selectFieldFactory({
    name: 'type',
    options: REPORT_TYPE,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  selectFieldFactory({
    name: 'format',
    options: REPORT_FORMAT,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  selectFieldFactory({
    name: 'status',
    options: REPORT_STATUS,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
  }),
  relationshipFieldFactory({
    name: 'generated_by',
    relationTo: 'members',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  dateFieldFactory({
    name: 'generated_on',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayAndTime',
    flags: [],
  }),
  dateFieldFactory({
    name: 'period_start',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
  dateFieldFactory({
    name: 'period_end',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'scope',
    relationTo: 'series',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'approved_by',
    relationTo: 'leaders',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  dateFieldFactory({
    name: 'approved_on',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayAndTime',
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
