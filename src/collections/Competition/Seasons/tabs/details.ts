import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const detailsFields: Field[] = [
  relationshipFieldFactory({
    name: 'series',
    relationTo: 'series',
    dictionary: dictionary.tabs.details.fields,
    width: 1,
    flags: ['required', 'index'],
  }),
  richtextFieldFactory({
    name: 'history',
    dictionary: dictionary.tabs.details.fields,
    width: 1,
    flags: [],
  }),
  numberFieldFactory({
    name: 'entries',
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    flags: [],
    min: 0,
    max: 1000,
    step: 1,
  }),
  numberFieldFactory({
    name: 'races',
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    flags: [],
    min: 0,
    max: 500,
    step: 1,
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
