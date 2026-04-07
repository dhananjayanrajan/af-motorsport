import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'

export const traitsFields: Field[] = [
  groupFactory(
    {
      name: 'eligibility',
      label: { en: 'Eligibility', es: 'Elegibilidad', pt: 'Elegibilidade' },
      entity: { en: 'Criterion', es: 'Criterio', pt: 'Critério' },
      description: { en: 'Eligibility criteria', es: 'Criterios de elegibilidad', pt: 'Critérios de elegibilidade' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'criteria', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textFieldFactory({ name: 'value', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textareaFieldFactory({ name: 'description', dictionary: undefined, width: 4, minLength: 1, maxLength: 500, rows: 2 }),
    ],
    true
  ),
  groupFactory(
    {
      name: 'curriculum',
      label: { en: 'Curriculum', es: 'Plan de Estudios', pt: 'Currículo' },
      entity: { en: 'Module', es: 'Módulo', pt: 'Módulo' },
      description: { en: 'Program curriculum', es: 'Plan de estudios del programa', pt: 'Currículo do programa' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'module_name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textFieldFactory({ name: 'duration', dictionary: undefined, width: 2, minLength: 1, maxLength: 50 }),
      textareaFieldFactory({ name: 'deliverable', dictionary: undefined, width: 4, minLength: 1, maxLength: 500, rows: 2 }),
    ],
    true
  ),
]
