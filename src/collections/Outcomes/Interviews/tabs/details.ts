import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { radioFieldFactory } from '@/fields/factories/fields/radioField'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { pointFieldFactory } from '@/fields/factories/fields/pointField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { INTERVIEW_FORMAT, INTERVIEW_STATUS, INTERVIEW_ACCESS } from '../sources/constants'

export const detailsFields: Field[] = [
  selectFieldFactory({
    name: 'format',
    options: INTERVIEW_FORMAT,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
  }),
  textFieldFactory({
    name: 'language',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    minLength: 1,
    maxLength: 50,
  }),
  numberFieldFactory({
    name: 'duration',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    min: 1,
    max: 720,
    step: 1,
  }),
  dateFieldFactory({
    name: 'recorded_date',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayAndTime',
    flags: [],
  }),
  dateFieldFactory({
    name: 'published_date',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayAndTime',
    flags: ['index'],
  }),
  selectFieldFactory({
    name: 'status',
    options: INTERVIEW_STATUS,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
  }),
  radioFieldFactory({
    name: 'access',
    options: INTERVIEW_ACCESS,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    layout: 'horizontal',
  }),
  relationshipFieldFactory({
    name: 'interviewer',
    relationTo: 'individuals',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'interviewee',
    relationTo: 'individuals',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['required'],
  }),
  relationshipFieldFactory({
    name: 'session',
    relationTo: 'sessions',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  pointFieldFactory({
    name: 'location',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
  }),
  groupFactory(
    {
      name: 'tags',
      label: { en: 'Tags', es: 'Etiquetas', pt: 'Tags' },
      entity: { en: 'Tag', es: 'Etiqueta', pt: 'Tag' },
      description: { en: 'Topic tags', es: 'Etiquetas de tema', pt: 'Tags de tópico' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 1, minLength: 1, maxLength: 50 }),
    ],
    true
  ),
  textareaFieldFactory({
    name: 'notes',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
]
