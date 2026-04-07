import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { uploadFieldFactory } from '@/fields/factories/fields/uploadField'
import { REGULATION_STATUS } from '../sources/constants'

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
