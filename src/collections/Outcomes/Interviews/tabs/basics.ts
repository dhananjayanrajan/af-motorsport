import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'

export const basicsFields: Field[] = [
  groupFactory(
    {
      name: 'identifiers',
      label: { en: 'Identifiers', es: 'Identificadores', pt: 'Identificadores' },
      entity: { en: 'Identifier', es: 'Identificador', pt: 'Identificador' },
      description: { en: 'Interview codes', es: 'Códigos de entrevista', pt: 'Códigos de entrevista' },
    },
    dictionary.host,
    [
      textFieldFactory({
        name: 'code',
        dictionary: undefined,
        width: 2,
        flags: ['index'],
        minLength: 1,
        maxLength: 50,
      }),
    ],
    false
  ),
  textFieldFactory({
    name: 'tagline',
    dictionary: dictionary.tabs.basics,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 200,
  }),
  textareaFieldFactory({
    name: 'description',
    dictionary: dictionary.tabs.basics,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
  textareaFieldFactory({
    name: 'summary',
    dictionary: dictionary.tabs.basics,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 1000,
    rows: 3,
  }),
]
