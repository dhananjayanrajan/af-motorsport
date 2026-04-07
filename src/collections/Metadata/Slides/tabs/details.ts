import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { SLIDE_TYPE, SLIDE_ORIENTATION, SLIDE_TEMPLATE, SLIDE_TRANSITION } from '../sources/constants'

export const detailsFields: Field[] = [
  selectFieldFactory({
    name: 'type',
    options: SLIDE_TYPE,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
  }),
  selectFieldFactory({
    name: 'orientation',
    options: SLIDE_ORIENTATION,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  selectFieldFactory({
    name: 'template',
    options: SLIDE_TEMPLATE,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  selectFieldFactory({
    name: 'transition',
    options: SLIDE_TRANSITION,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  numberFieldFactory({
    name: 'duration',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    min: 1,
    max: 60,
    step: 1,
  }),
  numberFieldFactory({
    name: 'order',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
    min: 1,
    max: 1000,
    step: 1,
  }),
  textareaFieldFactory({
    name: 'notes',
    dictionary: dictionary.tabs.details,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
]
