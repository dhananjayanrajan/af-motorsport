import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { PLAN_SCOPE, PLAN_STATUS, PLAN_PRIORITY, CURRENCY } from '../sources/constants'

export const detailsFields: Field[] = [
  textareaFieldFactory({
    name: 'vision',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
  textareaFieldFactory({
    name: 'mission',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
  selectFieldFactory({
    name: 'scope',
    options: PLAN_SCOPE,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  selectFieldFactory({
    name: 'status',
    options: PLAN_STATUS,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
  }),
  selectFieldFactory({
    name: 'priority',
    options: PLAN_PRIORITY,
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
  selectFieldFactory({
    name: 'currency',
    options: CURRENCY,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'assigned_to',
    relationTo: 'members',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'dependencies',
    relationTo: 'plans',
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
