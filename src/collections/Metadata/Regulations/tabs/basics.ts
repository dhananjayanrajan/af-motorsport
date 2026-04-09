import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { uploadFieldFactory } from '@/fields/factories/fields/uploadField'
import type { Field } from 'payload'
import { REGULATION_ENFORCEMENT, REGULATION_STATUS, REGULATION_TYPES } from '../sources/constants'
import { dictionary } from '../sources/dictionary'

export const basicsFields: Field[] = [
  textareaFieldFactory({
    name: 'description',
    dictionary: dictionary.tabs.basics,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
  selectFieldFactory({
    name: 'status',
    options: REGULATION_STATUS,
    dictionary: dictionary.tabs.basics,
    width: 1,
    flags: ['index'],
  }),
  selectFieldFactory({
    name: 'type',
    options: REGULATION_TYPES,
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: ['index'],
  }),
  selectFieldFactory({
    name: 'enforcement',
    options: REGULATION_ENFORCEMENT,
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: ['index'],
  }),
  textFieldFactory({
    name: 'code',
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: ['index'],
    minLength: 1,
    maxLength: 50,
  }),
  textFieldFactory({
    name: 'version',
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: [],
    minLength: 1,
    maxLength: 20,
  }),
  dateFieldFactory({
    name: 'effective_date',
    dictionary: dictionary.tabs.basics,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
  uploadFieldFactory({
    name: 'document',
    relationTo: 'media',
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: [],
  }),
]
