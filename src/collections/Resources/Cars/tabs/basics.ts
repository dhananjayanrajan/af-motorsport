import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { groupFactory } from '@/fields/factories/blueprint'

export const basicsFields: Field[] = [
  groupFactory(
    {
      name: 'identifiers',
      label: { en: 'Identifiers', es: 'Identificadores', pt: 'Identificadores' },
      entity: { en: 'Identifier', es: 'Identificador', pt: 'Identificador' },
      description: { en: 'Car identification codes', es: 'Códigos de identificación', pt: 'Códigos de identificação' },
    },
    dictionary.host,
    [
      textFieldFactory({
        name: 'chassis',
        dictionary: undefined,
        width: 2,
        flags: ['index'],
        minLength: 1,
        maxLength: 50,
      }),
      textFieldFactory({
        name: 'model',
        dictionary: undefined,
        width: 2,
        flags: [],
        minLength: 1,
        maxLength: 50,
      }),
      textFieldFactory({
        name: 'version',
        dictionary: undefined,
        width: 2,
        flags: [],
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
]
