import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { pointFieldFactory } from '@/fields/factories/fields/pointField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { HOSPITALITY_TYPE, HOSPITALITY_STATUS, HOSPITALITY_ACCESS } from '../sources/constants'

export const detailsFields: Field[] = [
  selectFieldFactory({
    name: 'type',
    options: HOSPITALITY_TYPE,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
  }),
  selectFieldFactory({
    name: 'status',
    options: HOSPITALITY_STATUS,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
  }),
  selectFieldFactory({
    name: 'access',
    options: HOSPITALITY_ACCESS,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  numberFieldFactory({
    name: 'capacity',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    min: 1,
    max: 5000,
    step: 1,
  }),
  numberFieldFactory({
    name: 'price_per_guest',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    min: 0,
    max: 100000,
    step: 0.01,
  }),
  pointFieldFactory({
    name: 'location',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  dateFieldFactory({
    name: 'start_date',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayAndTime',
    flags: [],
  }),
  dateFieldFactory({
    name: 'end_date',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayAndTime',
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'event',
    relationTo: 'events',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
  }),
  richtextFieldFactory({
    name: 'history',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
  }),
  groupFactory(
    {
      name: 'inclusions',
      label: { en: 'Inclusions', es: 'Inclusiones', pt: 'Inclusões' },
      entity: { en: 'Inclusion', es: 'Inclusión', pt: 'Inclusão' },
      description: { en: 'What is included', es: 'Qué está incluido', pt: 'O que está incluído' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textareaFieldFactory({ name: 'description', dictionary: undefined, width: 4, minLength: 1, maxLength: 500, rows: 2 }),
    ],
    true
  ),
  groupFactory(
    {
      name: 'exclusions',
      label: { en: 'Exclusions', es: 'Exclusiones', pt: 'Exclusões' },
      entity: { en: 'Exclusion', es: 'Exclusión', pt: 'Exclusão' },
      description: { en: 'What is not included', es: 'Qué no está incluido', pt: 'O que não está incluído' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textareaFieldFactory({ name: 'description', dictionary: undefined, width: 4, minLength: 1, maxLength: 500, rows: 2 }),
    ],
    true
  ),
  groupFactory(
    {
      name: 'requirements',
      label: { en: 'Requirements', es: 'Requisitos', pt: 'Requisitos' },
      entity: { en: 'Requirement', es: 'Requisito', pt: 'Requisito' },
      description: { en: 'Guest requirements', es: 'Requisitos de invitados', pt: 'Requisitos de convidados' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textareaFieldFactory({ name: 'description', dictionary: undefined, width: 4, minLength: 1, maxLength: 500, rows: 2 }),
    ],
    true
  ),
  textareaFieldFactory({
    name: 'notes',
    dictionary: dictionary.tabs.details,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
]
