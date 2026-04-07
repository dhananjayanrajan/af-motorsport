import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { SKILL_SCALE, SKILL_DEPTH, SKILL_RARITY, SKILL_COMPLEXITY } from '../sources/constants'

export const detailsFields: Field[] = [
  selectFieldFactory({
    name: 'scale',
    options: SKILL_SCALE,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  selectFieldFactory({
    name: 'depth',
    options: SKILL_DEPTH,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  selectFieldFactory({
    name: 'rarity',
    options: SKILL_RARITY,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  selectFieldFactory({
    name: 'complexity',
    options: SKILL_COMPLEXITY,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  groupFactory(
    {
      name: 'specifications',
      label: { en: 'Specifications', es: 'Especificaciones', pt: 'Especificações' },
      entity: { en: 'Specification', es: 'Especificación', pt: 'Especificação' },
      description: { en: 'Skill specifications', es: 'Especificaciones de habilidad', pt: 'Especificações de habilidade' },
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
      name: 'features',
      label: { en: 'Features', es: 'Características', pt: 'Características' },
      entity: { en: 'Feature', es: 'Característica', pt: 'Característica' },
      description: { en: 'Skill features', es: 'Características de habilidad', pt: 'Características de habilidade' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textareaFieldFactory({ name: 'description', dictionary: undefined, width: 4, minLength: 1, maxLength: 500, rows: 2 }),
    ],
    true
  ),
]
