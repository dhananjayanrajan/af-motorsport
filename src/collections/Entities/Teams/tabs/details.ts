import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { textFieldFactory } from '@/fields/factories/fields/textField'

export const detailsFields: Field[] = [
  richtextFieldFactory({
    name: 'history',
    dictionary: dictionary.tabs.details.fields,
    width: 1,
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'country',
    relationTo: 'countries',
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    flags: ['index'],
  }),
  dateFieldFactory({
    name: 'start_date',
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
  dateFieldFactory({
    name: 'end_date',
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
  textFieldFactory({
    name: 'website',
    dictionary: dictionary.tabs.details.fields,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 255,
  }),
]
