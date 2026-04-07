import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { PROGRAM_TYPE, PROGRAM_STATUS, DURATION_UNIT } from '../sources/constants'

export const detailsFields: Field[] = [
  textareaFieldFactory({
    name: 'objective',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
  selectFieldFactory({
    name: 'type',
    options: PROGRAM_TYPE,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  selectFieldFactory({
    name: 'status',
    options: PROGRAM_STATUS,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
  }),
  selectFieldFactory({
    name: 'duration',
    options: DURATION_UNIT,
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
  numberFieldFactory({
    name: 'budget',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    min: 0,
    max: 100000000,
    step: 1,
  }),
  textareaFieldFactory({
    name: 'outcomes',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
  relationshipFieldFactory({
    name: 'mentors',
    relationTo: 'leaders',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 20,
  }),
  relationshipFieldFactory({
    name: 'participants',
    relationTo: 'drivers',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 100,
  }),
  relationshipFieldFactory({
    name: 'partners',
    relationTo: 'organizations',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 20,
  }),
  relationshipFieldFactory({
    name: 'sponsors',
    relationTo: 'organizations',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 20,
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
