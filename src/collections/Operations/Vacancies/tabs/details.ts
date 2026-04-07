import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { pointFieldFactory } from '@/fields/factories/fields/pointField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { CONTRACT_TYPE } from '../sources/constants'

export const detailsFields: Field[] = [
  textFieldFactory({
    name: 'department',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
    minLength: 1,
    maxLength: 100,
  }),
  selectFieldFactory({
    name: 'contract',
    options: CONTRACT_TYPE,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  pointFieldFactory({
    name: 'locations',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
  }),
  groupFactory(
    {
      name: 'specifications',
      label: { en: 'Specifications', es: 'Especificaciones', pt: 'Especificações' },
      entity: { en: 'Specification', es: 'Especificación', pt: 'Especificação' },
      description: { en: 'Role requirements', es: 'Requisitos del rol', pt: 'Requisitos da função' },
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
      description: { en: 'Performance expectations', es: 'Expectativas de rendimiento', pt: 'Expectativas de desempenho' },
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
  groupFactory(
    {
      name: 'positions',
      label: { en: 'Positions', es: 'Posiciones', pt: 'Posições' },
      entity: { en: 'Position', es: 'Posición', pt: 'Posição' },
      description: { en: 'Available slots', es: 'Plazas disponibles', pt: 'Vagas disponíveis' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'title', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      dateFieldFactory({ name: 'start', dictionary: undefined, width: 2, pickerAppearance: 'dayOnly' }),
      dateFieldFactory({ name: 'end', dictionary: undefined, width: 2, pickerAppearance: 'dayOnly' }),
    ],
    true
  ),
]
