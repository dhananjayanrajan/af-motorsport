import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { SOCIAL_PLATFORMS } from '../sources/constants'

export const detailsFields: Field[] = [
  textareaFieldFactory({
    name: 'vision',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
  textareaFieldFactory({
    name: 'mission',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
  textareaFieldFactory({
    name: 'quote',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 500,
    rows: 2,
  }),
  relationshipFieldFactory({
    name: 'designations',
    relationTo: 'designations',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 10,
  }),
  richtextFieldFactory({
    name: 'biography',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
  }),
  textareaFieldFactory({
    name: 'history',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
  relationshipFieldFactory({
    name: 'awards',
    relationTo: 'awards',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 100,
  }),
  groupFactory(
    {
      name: 'principles',
      label: { en: 'Principles', es: 'Principios', pt: 'Princípios' },
      entity: { en: 'Principle', es: 'Principio', pt: 'Princípio' },
      description: { en: 'Leadership principles', es: 'Principios de liderazgo', pt: 'Princípios de liderança' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textareaFieldFactory({ name: 'description', dictionary: undefined, width: 3, minLength: 1, maxLength: 500, rows: 2 }),
      textareaFieldFactory({ name: 'statement', dictionary: undefined, width: 3, minLength: 1, maxLength: 500, rows: 2 }),
      textareaFieldFactory({ name: 'application', dictionary: undefined, width: 3, minLength: 1, maxLength: 500, rows: 2 }),
      textareaFieldFactory({ name: 'rationale', dictionary: undefined, width: 3, minLength: 1, maxLength: 500, rows: 2 }),
    ],
    true
  ),
  groupFactory(
    {
      name: 'websites',
      label: { en: 'Websites', es: 'Sitios Web', pt: 'Sites' },
      entity: { en: 'Website', es: 'Sitio Web', pt: 'Site' },
      description: { en: 'Website links', es: 'Enlaces de sitios web', pt: 'Links de sites' },
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
      description: { en: 'Social media profiles', es: 'Perfiles de redes sociales', pt: 'Perfis de redes sociais' },
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
