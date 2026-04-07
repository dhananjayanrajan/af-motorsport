import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { LEADER_GENDER } from '../sources/constants'

export const basicsFields: Field[] = [
  textFieldFactory({
    name: 'nickname',
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: [],
    minLength: 1,
    maxLength: 50,
  }),
  textFieldFactory({
    name: 'title',
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: ['index'],
    minLength: 1,
    maxLength: 100,
  }),
  selectFieldFactory({
    name: 'gender',
    options: LEADER_GENDER,
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'nationality',
    relationTo: 'countries',
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: ['index'],
  }),
  dateFieldFactory({
    name: 'birth_date',
    dictionary: dictionary.tabs.basics,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
  dateFieldFactory({
    name: 'debut_date',
    dictionary: dictionary.tabs.basics,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
  dateFieldFactory({
    name: 'retirement_date',
    dictionary: dictionary.tabs.basics,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
]
