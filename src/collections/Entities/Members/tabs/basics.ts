import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { MEMBER_GENDER } from '../sources/constants'

export const basicsFields: Field[] = [
  textFieldFactory({
    name: 'nickname',
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: [],
    minLength: 1,
    maxLength: 50,
  }),
  textareaFieldFactory({
    name: 'description',
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
  selectFieldFactory({
    name: 'gender',
    options: MEMBER_GENDER,
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: [],
  }),
  textFieldFactory({
    name: 'pronouns',
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: [],
    minLength: 1,
    maxLength: 20,
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
    name: 'joining_date',
    dictionary: dictionary.tabs.basics,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: ['index'],
  }),
  dateFieldFactory({
    name: 'retirement_date',
    dictionary: dictionary.tabs.basics,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
]
