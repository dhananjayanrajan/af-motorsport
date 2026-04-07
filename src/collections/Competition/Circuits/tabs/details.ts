import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { pointFieldFactory } from '@/fields/factories/fields/pointField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { CIRCUIT_TYPE, CIRCUIT_DIRECTION, FIA_GRADE } from '../sources/constants'

export const detailsFields: Field[] = [
  selectFieldFactory({
    name: 'type',
    options: CIRCUIT_TYPE,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
  }),
  numberFieldFactory({
    name: 'length_km',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    min: 0,
    max: 100,
    step: 0.001,
  }),
  numberFieldFactory({
    name: 'length_miles',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    min: 0,
    max: 100,
    step: 0.001,
  }),
  numberFieldFactory({
    name: 'turns',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    min: 1,
    max: 100,
    step: 1,
  }),
  numberFieldFactory({
    name: 'drs_zones',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    min: 0,
    max: 10,
    step: 1,
  }),
  selectFieldFactory({
    name: 'direction',
    options: CIRCUIT_DIRECTION,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  selectFieldFactory({
    name: 'fia_grade',
    options: FIA_GRADE,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
  }),
  numberFieldFactory({
    name: 'elevation_change',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    min: 0,
    max: 500,
    step: 1,
  }),
  numberFieldFactory({
    name: 'capacity',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    min: 0,
    max: 500000,
    step: 1,
  }),
  pointFieldFactory({
    name: 'location',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  textareaFieldFactory({
    name: 'address',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    minLength: 1,
    maxLength: 500,
    rows: 3,
  }),
  relationshipFieldFactory({
    name: 'country',
    relationTo: 'countries',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
  }),
  dateFieldFactory({
    name: 'opened',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
  dateFieldFactory({
    name: 'closed',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
  groupFactory(
    {
      name: 'renovated',
      label: { en: 'Renovations', es: 'Renovaciones', pt: 'Renovações' },
      entity: { en: 'Renovation', es: 'Renovación', pt: 'Renovação' },
      description: { en: 'Renovation history', es: 'Historial de renovaciones', pt: 'Histórico de renovações' },
    },
    dictionary.host,
    [
      dateFieldFactory({ name: 'year', dictionary: undefined, width: 2, pickerAppearance: 'monthOnly' }),
      textareaFieldFactory({ name: 'description', dictionary: undefined, width: 4, minLength: 1, maxLength: 500, rows: 2 }),
    ],
    true
  ),
  relationshipFieldFactory({
    name: 'owner',
    relationTo: 'organizations',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'operator',
    relationTo: 'organizations',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  textFieldFactory({
    name: 'website',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    minLength: 1,
    maxLength: 255,
  }),
  richtextFieldFactory({
    name: 'history',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
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
