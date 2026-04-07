import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { uploadFieldFactory } from '@/fields/factories/fields/uploadField'

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
  richtextFieldFactory({
    name: 'privacy',
    dictionary: dictionary.tabs.basics,
    width: 1,
    flags: [],
  }),
  richtextFieldFactory({
    name: 'cookies',
    dictionary: dictionary.tabs.basics,
    width: 1,
    flags: [],
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
  dateFieldFactory({
    name: 'last_reviewed',
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
