import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { ORGANIZATION_PRESTIGE, ORGANIZATION_IMPACT, SOCIAL_PLATFORMS } from '../sources/constants'

export const detailsFields: Field[] = [
  richtextFieldFactory({
    name: 'history',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
  }),
  dateFieldFactory({
    name: 'founded',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
  dateFieldFactory({
    name: 'merged',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
  dateFieldFactory({
    name: 'rebranded',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
  dateFieldFactory({
    name: 'defunct',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
  selectFieldFactory({
    name: 'prestige',
    options: ORGANIZATION_PRESTIGE,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  selectFieldFactory({
    name: 'impact',
    options: ORGANIZATION_IMPACT,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  groupFactory(
    {
      name: 'benefits',
      label: { en: 'Benefits', es: 'Beneficios', pt: 'Benefícios' },
      entity: { en: 'Benefit', es: 'Beneficio', pt: 'Benefício' },
      description: { en: 'Partnership benefits', es: 'Beneficios de asociación', pt: 'Benefícios de parceria' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textareaFieldFactory({ name: 'description', dictionary: undefined, width: 3, minLength: 1, maxLength: 500, rows: 2 }),
      textFieldFactory({ name: 'type', dictionary: undefined, width: 1, minLength: 1, maxLength: 50 }),
    ],
    true
  ),
  groupFactory(
    {
      name: 'websites',
      label: { en: 'Websites', es: 'Sitios Web', pt: 'Sites' },
      entity: { en: 'Website', es: 'Sitio Web', pt: 'Site' },
      description: { en: 'Official links', es: 'Enlaces oficiales', pt: 'Links oficiais' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textFieldFactory({ name: 'path', dictionary: undefined, width: 3, flags: ['index'], minLength: 1, maxLength: 255 }),
      textareaFieldFactory({ name: 'description', dictionary: undefined, width: 4, minLength: 1, maxLength: 500, rows: 2 }),
    ],
    true
  ),
  groupFactory(
    {
      name: 'socials',
      label: { en: 'Social Media', es: 'Redes Sociales', pt: 'Redes Sociais' },
      entity: { en: 'Social Profile', es: 'Perfil Social', pt: 'Perfil Social' },
      description: { en: 'Social profiles', es: 'Perfiles sociales', pt: 'Perfis sociais' },
    },
    dictionary.host,
    [
      selectFieldFactory({ name: 'platform', options: SOCIAL_PLATFORMS, dictionary: undefined, width: 2 }),
      textFieldFactory({ name: 'username', dictionary: undefined, width: 3, flags: ['index'], minLength: 1, maxLength: 100 }),
      textareaFieldFactory({ name: 'description', dictionary: undefined, width: 4, minLength: 1, maxLength: 500, rows: 2 }),
    ],
    true
  ),
]
