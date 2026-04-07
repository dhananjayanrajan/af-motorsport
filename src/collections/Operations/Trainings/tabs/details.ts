import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'

export const detailsFields: Field[] = [
  dateFieldFactory({
    name: 'start_date',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
  dateFieldFactory({
    name: 'end_date',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
  groupFactory(
    {
      name: 'specifications',
      label: { en: 'Specifications', es: 'Especificaciones', pt: 'Especificações' },
      entity: { en: 'Specification', es: 'Especificación', pt: 'Especificação' },
      description: { en: 'Training specs', es: 'Especificaciones de entrenamiento', pt: 'Especificações de treinamento' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'parameter', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textFieldFactory({ name: 'value', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textareaFieldFactory({ name: 'description', dictionary: undefined, width: 4, minLength: 1, maxLength: 500, rows: 2 }),
    ],
    true
  ),
  groupFactory(
    {
      name: 'expectations',
      label: { en: 'Expectations', es: 'Expectativas', pt: 'Expectativas' },
      entity: { en: 'Expectation', es: 'Expectativa', pt: 'Expectativa' },
      description: { en: 'Learning outcomes', es: 'Resultados de aprendizaje', pt: 'Resultados de aprendizagem' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      selectFieldFactory({ name: 'type', options: [], dictionary: undefined, width: 2 }),
      textareaFieldFactory({ name: 'criteria', dictionary: undefined, width: 3, minLength: 1, maxLength: 500, rows: 2 }),
      textareaFieldFactory({ name: 'statement', dictionary: undefined, width: 3, minLength: 1, maxLength: 500, rows: 2 }),
    ],
    true
  ),
]
