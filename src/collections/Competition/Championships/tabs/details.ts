import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { CHAMPIONSHIP_SCOPE } from '../sources/constants'

export const detailsFields: Field[] = [
  richtextFieldFactory({
    name: 'history',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'regulations',
    relationTo: 'regulations',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  textareaFieldFactory({
    name: 'format',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
  relationshipFieldFactory({
    name: 'points_system',
    relationTo: 'points',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  selectFieldFactory({
    name: 'standings_scope',
    options: CHAMPIONSHIP_SCOPE,
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
    name: 'winner',
    relationTo: 'drivers',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'runner_up',
    relationTo: 'drivers',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'third_place',
    relationTo: 'drivers',
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
