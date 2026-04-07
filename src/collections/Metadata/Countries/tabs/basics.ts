import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { uploadFieldFactory } from '@/fields/factories/fields/uploadField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'

export const basicsFields: Field[] = [
  uploadFieldFactory({
    name: 'flag',
    relationTo: 'media',
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: [],
  }),
  textareaFieldFactory({
    name: 'description',
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: [],
    minLength: 1,
    maxLength: 500,
    rows: 3,
  }),
]
