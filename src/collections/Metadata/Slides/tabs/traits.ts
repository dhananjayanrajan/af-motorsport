import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'

export const traitsFields: Field[] = [
  groupFactory(
    {
      name: 'tags',
      label: { en: 'Tags', es: 'Etiquetas', pt: 'Tags' },
      entity: { en: 'Tag', es: 'Etiqueta', pt: 'Tag' },
      description: { en: 'Slide tags', es: 'Etiquetas de diapositiva', pt: 'Tags de slide' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 1, minLength: 1, maxLength: 50 }),
    ],
    true
  ),
  textareaFieldFactory({
    name: 'notes',
    dictionary: dictionary.tabs.traits,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
]
