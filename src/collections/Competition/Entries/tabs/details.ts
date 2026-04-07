import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { ENTRY_STATUS } from '../sources/constants'

export const detailsFields: Field[] = [
  relationshipFieldFactory({
    name: 'session',
    relationTo: 'sessions',
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    flags: ['required', 'index'],
  }),
  selectFieldFactory({
    name: 'status',
    options: ENTRY_STATUS,
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    flags: ['index'],
  }),
  numberFieldFactory({
    name: 'grid_position',
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    flags: [],
    min: 1,
    max: 100,
    step: 1,
  }),
  numberFieldFactory({
    name: 'start_position',
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    flags: [],
    min: 1,
    max: 100,
    step: 1,
  }),
  numberFieldFactory({
    name: 'finish_position',
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    flags: [],
    min: 1,
    max: 100,
    step: 1,
  }),
  numberFieldFactory({
    name: 'laps_position',
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    flags: [],
    min: 0,
    max: 500,
    step: 1,
  }),
]
