import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { ONBOARDING_TYPE, ONBOARDING_FORMAT, ONBOARDING_STATUS } from '../sources/constants'

export const detailsFields: Field[] = [
  selectFieldFactory({
    name: 'type',
    options: ONBOARDING_TYPE,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
  }),
  selectFieldFactory({
    name: 'format',
    options: ONBOARDING_FORMAT,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  selectFieldFactory({
    name: 'status',
    options: ONBOARDING_STATUS,
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
    name: 'assigned_to',
    relationTo: 'individuals',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['required'],
  }),
  relationshipFieldFactory({
    name: 'assigned_by',
    relationTo: 'members',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  textareaFieldFactory({
    name: 'feedback',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
  textareaFieldFactory({
    name: 'notes',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
]
