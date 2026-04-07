import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { radioFieldFactory } from '@/fields/factories/fields/radioField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { checkboxFieldFactory } from '@/fields/factories/fields/checkboxField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { INDIVIDUAL_TYPE, INDIVIDUAL_GENDER } from '../sources/constants'

export const basicsFields: Field[] = [
  radioFieldFactory({
    name: 'type',
    options: INDIVIDUAL_TYPE,
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: ['index'],
    layout: 'horizontal',
  }),
  textareaFieldFactory({
    name: 'description',
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: [],
    minLength: 1,
    maxLength: 1000,
    rows: 3,
  }),
  checkboxFieldFactory({
    name: 'is_contact',
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: ['index'],
  }),
  selectFieldFactory({
    name: 'gender',
    options: INDIVIDUAL_GENDER,
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
