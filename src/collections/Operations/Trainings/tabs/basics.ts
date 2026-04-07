import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'
import { radioFieldFactory } from '@/fields/factories/fields/radioField'
import { TRAINING_INTENSITY, TRAINING_FORMAT } from '../sources/constants'

export const basicsFields: Field[] = [
  richtextFieldFactory({
    name: 'description',
    dictionary: dictionary.tabs.basics,
    width: 1,
    flags: [],
  }),
  radioFieldFactory({
    name: 'intensity',
    options: TRAINING_INTENSITY,
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: [],
    layout: 'horizontal',
  }),
  radioFieldFactory({
    name: 'format',
    options: TRAINING_FORMAT,
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: [],
    layout: 'horizontal',
  }),
]
