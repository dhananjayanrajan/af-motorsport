import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { ROADMAP_SCOPE, ROADMAP_STATUS, RISK_IMPACT } from '../sources/constants'

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
    name: 'strategy',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
  selectFieldFactory({
    name: 'scope',
    options: ROADMAP_SCOPE,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  selectFieldFactory({
    name: 'status',
    options: ROADMAP_STATUS,
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
  relationshipFieldFactory({
    name: 'dependencies',
    relationTo: 'roadmaps',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 20,
  }),
  relationshipFieldFactory({
    name: 'stakeholders',
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
