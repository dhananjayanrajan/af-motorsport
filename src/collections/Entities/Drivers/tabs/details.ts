import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { pointFieldFactory } from '@/fields/factories/fields/pointField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { SOCIAL_PLATFORMS } from '../sources/constants'

export const detailsFields: Field[] = [
  richtextFieldFactory({
    name: 'story',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
  }),
  richtextFieldFactory({
    name: 'biography',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
  }),
  groupFactory(
    {
      name: 'addresses',
      label: { en: 'Addresses', es: 'Direcciones', pt: 'Endereços' },
      entity: { en: 'Address', es: 'Dirección', pt: 'Endereço' },
      description: { en: 'Address information', es: 'Información de direcciones', pt: 'Informações de endereços' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textFieldFactory({ name: 'label', dictionary: undefined, width: 2, minLength: 1, maxLength: 50 }),
      textareaFieldFactory({ name: 'description', dictionary: undefined, width: 4, minLength: 1, maxLength: 500, rows: 2 }),
      pointFieldFactory({ name: 'location', dictionary: undefined, width: 4 }),
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
  relationshipFieldFactory({
    name: 'skills',
    relationTo: 'skills',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 50,
  }),
  relationshipFieldFactory({
    name: 'points',
    relationTo: 'points',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 1000,
  }),
  relationshipFieldFactory({
    name: 'results',
    relationTo: 'results',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 1000,
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
  relationshipFieldFactory({
    name: 'cars',
    relationTo: 'cars',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 50,
  }),
]
