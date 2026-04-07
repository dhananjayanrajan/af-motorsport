import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { DRIVER_GENDER } from '../sources/constants'

export const basicsFields: Field[] = [
  numberFieldFactory({
    name: 'racing_number',
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: ['index'],
    min: 1,
    max: 999,
    step: 1,
  }),
  textFieldFactory({
    name: 'nickname',
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: [],
    minLength: 1,
    maxLength: 50,
  }),
  textFieldFactory({
    name: 'competition_name',
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: [],
    minLength: 1,
    maxLength: 100,
  }),
  textFieldFactory({
    name: 'callsign',
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: [],
    minLength: 1,
    maxLength: 20,
  }),
  textareaFieldFactory({
    name: 'catchphrase',
    dictionary: dictionary.tabs.basics,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 500,
    rows: 2,
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
  relationshipFieldFactory({
    name: 'nationality',
    relationTo: 'countries',
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: ['index'],
  }),
  selectFieldFactory({
    name: 'gender',
    options: DRIVER_GENDER,
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
]
